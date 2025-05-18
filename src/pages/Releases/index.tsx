// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import {
  BellOutlined,
  DownOutlined,
  FullscreenOutlined,
  HistoryOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { request } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useState } from 'react';

const { Option } = Select;

const releaseData  = await request('/api/releases/search', {
  method: 'POST',
  data: {},
})

const App: React.FC = () => {
  const [expandedMenu, setExpandedMenu] = useState<string[]>([
    '应用',
    '部署',
    '服务',
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [form] = Form.useForm();
  const [selectedRelease, setselectedRelease] = useState<any>(null);

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取项目列表
  const fetchProjects = async (value: string) => {
    setLoading(true);
    try {
      const res = await request('/api/projects/search', {
        method: 'POST',
        data: { keyword: value },
      });

      setProjects(res || []);
    } catch (error) {
      message.error('获取项目列表失败');
    } finally {
      setLoading(false);
    }
  };

  const showCreateModal = () => {
    setModalMode('create');
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = async (record: any) => {
      setModalMode('edit');
  
      const release = await request('/api/releases/' + record.id, {  
        method: 'GET'
      });
  
      setselectedRelease(release);
      
      form.setFieldsValue({
        releaseDesc: release.releaseDesc,
        releaseType: release.releaseType,
        trafficPolicy: release.trafficRule,
        projects: release.releaseProjects,
      });
      setIsModalVisible(true);
    };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form values:', values);

        const data = request('/api/releases', {
          method: modalMode === 'create' ? 'POST' : 'PUT',
          data: {
            ...values,
            id: modalMode === 'edit' ? selectedRelease.id : undefined,
          },
        });

        message.success(
          modalMode === 'create' ? '发布单创建成功！' : '发布单更新成功！',
        );
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const toggleMenu = (menu: string) => {
    if (expandedMenu.includes(menu)) {
      setExpandedMenu(expandedMenu.filter((item) => item !== menu));
    } else {
      setExpandedMenu([...expandedMenu, menu]);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'releaseDesc',
      key: 'releaseDesc',
      width: 200,
    },
    {
      title: '应用',
      dataIndex: 'releaseProjects',
      key: 'releaseProjects',
      width: 200,
      render: (projects: Array<{ projectId: string; branch: string }>) =>
        projects && projects.length > 0 ? (
          <div className="space-y-1">
            {projects.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="font-mono text-xs text-gray-700">{item.projectId}</span>
                <span className="text-gray-400">/</span>
                <span className="font-mono text-xs text-blue-600">{item.branch}</span>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-400">--</span>
        ),
    },
    {
      title: '发布类型',
      dataIndex: 'releaseType',
      key: 'releaseType',
      width: 120,
    },
    {
      title: '双层架构',
      dataIndex: 'architecture',
      key: 'architecture',
      width: 120,
      render: (text: string) => (text ? text : '--'),
    },
    {
      title: '流量策略',
      dataIndex: 'trafficRule',
      key: 'trafficRule',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        let color = 'default';
        let icon = null;

        if (status === '使用中') {
          color = 'blue';
          icon = (
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5 inline-block"></span>
          );
        } else if (status === '发布中') {
          color = 'green';
          icon = (
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 inline-block"></span>
          );
        } else if (status === '已停用') {
          color = 'gray';
          icon = (
            <span className="w-2 h-2 rounded-full bg-gray-500 mr-1.5 inline-block"></span>
          );
        }

        return (
          <Tag color={color} className="px-2 py-1">
            <span className="flex items-center">
              {icon}
              {status}
            </span>
          </Tag>
        );
      },
    },
    {
      title: '带队状态',
      dataIndex: 'teamStatus',
      key: 'teamStatus',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (record: any) => (
        <div className="space-x-2">
          <Button
            type="link"
            className="text-blue-500 p-0 whitespace-nowrap !rounded-button cursor-pointer"
            onClick={() => showEditModal(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            className="text-blue-500 p-0 whitespace-nowrap !rounded-button cursor-pointer"
          >
            更多操作
          </Button>
        </div>
      ),
    },
  ];

  const getProjects = async () => {
    const projects = request('/api/projects', {
      method: 'GET',
    });
  };


  // 生成背景图片的URL
  const heroImageUrl =
    'https://readdy.ai/api/search-image?query=Modern%20digital%20deployment%20system%20dashboard%20with%20blue%20and%20white%20color%20scheme%2C%20showing%20deployment%20status%2C%20monitoring%20graphs%2C%20and%20server%20health%20indicators.%20Professional%20UI%20design%20with%20clean%20layout%20and%20subtle%20grid%20pattern%20in%20background%2C%20high%20quality%203D%20visualization%20of%20cloud%20infrastructure%20and%20deployment%20pipeline&width=600&height=300&seq=12345&orientation=landscape';

  // 生成分类图标
  const categoryImageUrl1 =
    'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20cloud%20deployment%20with%20blue%20gradient%2C%20showing%20a%20rocket%20or%20cloud%20symbol%20with%20upward%20arrow%2C%20perfect%20for%20deployment%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background&width=80&height=80&seq=23456&orientation=squarish';
  const categoryImageUrl2 =
    'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20application%20monitoring%20with%20purple%20gradient%2C%20showing%20a%20dashboard%20or%20graph%20symbol%2C%20perfect%20for%20monitoring%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background&width=80&height=80&seq=34567&orientation=squarish';
  const categoryImageUrl3 =
    'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20cloud%20services%20with%20green%20gradient%2C%20showing%20a%20server%20or%20cloud%20database%20symbol%2C%20perfect%20for%20services%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background&width=80&height=80&seq=45678&orientation=squarish';
  const categoryImageUrl4 =
    'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20system%20configuration%20with%20orange%20gradient%2C%20showing%20a%20gear%20or%20settings%20symbol%2C%20perfect%20for%20configuration%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background&width=80&height=80&seq=56789&orientation=squarish';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 主内容区域 */}
      <div className="flex-1 p-6">
        {/* 顶部标题和搜索区域 */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex items-center">
            <h1 className="text-xl font-medium mr-4">生产发布云配置</h1>
            <Input
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder="搜索应用、服务或发布单"
              className="w-64 rounded-md"
              suffix={
                <Button type="text" size="small" icon={<DownOutlined />} />
              }
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="!rounded-button whitespace-nowrap cursor-pointer"
            >
              新建发布单
            </Button>
            <Button
              icon={<HistoryOutlined />}
              className="!rounded-button whitespace-nowrap cursor-pointer"
            >
              历史记录
            </Button>
            <Button
              icon={<SettingOutlined />}
              className="!rounded-button whitespace-nowrap cursor-pointer"
            >
              系统设置
            </Button>
            <div className="flex items-center ml-4">
              <BellOutlined className="text-gray-500 mr-4 text-xl cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
                A
              </div>
            </div>
          </div>
        </div>

        {/* 筛选表单 */}
        <Card className="mb-6 shadow-sm">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="mb-1 text-sm text-gray-600">发布单 ID</div>
              <Input placeholder="请输入" className="w-full border-gray-300" />
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">名称</div>
              <Input placeholder="请输入" className="w-full border-gray-300" />
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">状态</div>
              <Select
                placeholder="使用中"
                className="w-full"
                defaultValue="使用中"
              >
                <Option value="使用中">使用中</Option>
                <Option value="发布中">发布中</Option>
                <Option value="已停用">已停用</Option>
              </Select>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">应用</div>
              <Select placeholder="请选择" className="w-full">
                <Option value="pay-service">pay-service</Option>
                <Option value="km-matrix">km-matrix</Option>
                <Option value="pay-consumer">pay-consumer</Option>
                <Option value="data-service">data-service</Option>
                <Option value="auth-service">auth-service</Option>
              </Select>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">创建人</div>
              <Select placeholder="请输入创建人" className="w-full">
                <Option value="admin">admin</Option>
                <Option value="developer">developer</Option>
                <Option value="operator">operator</Option>
              </Select>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">带队状态</div>
              <Select placeholder="请选择" className="w-full">
                <Option value="待审批">待审批</Option>
                <Option value="已审批">已审批</Option>
                <Option value="已拒绝">已拒绝</Option>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="!rounded-button whitespace-nowrap cursor-pointer"
              onClick={showCreateModal}
            >
              创建发布单
            </Button>
            <div className="space-x-2">
              <Button className="!rounded-button whitespace-nowrap cursor-pointer">
                收起
              </Button>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                className="!rounded-button whitespace-nowrap cursor-pointer"
              >
                搜索
              </Button>
              <Button
                icon={<ReloadOutlined />}
                className="!rounded-button whitespace-nowrap cursor-pointer"
              >
                重置
              </Button>
            </div>
          </div>
        </Card>

        {/* 数据表格 */}
        <Card styles={{ body: { padding: 0 } }} className="shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="text-lg font-medium">发布单列表</div>
            <div className="flex space-x-2">
              <Tooltip title="刷新">
                <Button
                  icon={<ReloadOutlined />}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                />
              </Tooltip>
              <Tooltip title="全屏">
                <Button
                  icon={<FullscreenOutlined />}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                />
              </Tooltip>
              <Tooltip title="设置">
                <Button
                  icon={<SettingOutlined />}
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                />
              </Tooltip>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={releaseData}
            pagination={{
              position: ['bottomRight'],
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`,
            }}
            className="custom-table"
            rowClassName="hover:bg-gray-50"
            size="middle"
          />
        </Card>

        {/* 底部信息 */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>© 2025 一键部署系统 v2.5.3 | 今日日期: 2025-05-14, Wednesday</p>
        </div>
      </div>

      {/* 创建/编辑项目模态框 */}
      <Modal
        title={modalMode === 'create' ? '创建发布单' : '编辑'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        footer={[
          <Button
            key="back"
            onClick={handleModalCancel}
            className="!rounded-button whitespace-nowrap cursor-pointer"
          >
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleModalOk}
            className="!rounded-button whitespace-nowrap cursor-pointer"
          >
            {modalMode === 'create' ? '创建' : '保存'}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            environment: '开发环境',
            cloudProvider: '阿里云 ACK',
            resourceSpec: '4核8G',
          }}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="基础信息" key="1">
              <Row gutter={16}>
                <Col span={18}>
                  <Form.Item
                    name="releaseDesc"
                    label="发布单名称"
                    rules={[{ required: true, message: '请输入发布单名称' }]}
                  >
                    <Input placeholder="请输入项目名称" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="releaseType"
                    label="发布类型"
                    rules={[{ required: true, message: '请选择发布类型' }]}
                  >
                    <Select placeholder="请选择发布类型">
                      <Option value="normal">常规发布</Option>
                      <Option value="rolling">滚动发布</Option>
                      <Option value="canary">金丝雀发布</Option>
                      <Option value="gray">灰度发布</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="trafficPolicy"
                    label="流量策略"
                    rules={[{ required: true, message: '请选择流量策略' }]}
                  >
                    <Select placeholder="请选择流量策略">
                      <Option value="auto">100%切换新版本</Option>
                      <Option value="manual">手动切流量</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* 灰度发布时显示灰度版本输入项 */}
              <Form.Item
                noStyle
                shouldUpdate={(prev, curr) =>
                  prev.releaseType !== curr.releaseType
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue('releaseType') === '灰度发布' ? (
                    <Row gutter={16}>
                      <Col span={18}>
                        <Form.Item
                          name="grayVersion"
                          label="灰度版本"
                          rules={[
                            { required: true, message: '请输入灰度版本号' },
                          ]}
                        >
                          <Input placeholder="请输入灰度版本号，如 v1.2.3-gray" />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : null
                }
              </Form.Item>

              <Form.List name="projects" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Row gutter={16} key={field.key} align="middle">
                        <Col span={8}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'projectId']}
                            fieldKey={[field.fieldKey, 'projectId']}
                            label={index === 0 ? '项目名称' : ''}
                            rules={[
                              { required: true, message: '请输入项目名称' },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="请输入或选择项目名称"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                (option?.label as string)
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              options={projects.map((item) => ({
                                label: item.name,
                                value: item.id,
                              }))}
                              onSearch={fetchProjects}
                              onFocus={() => fetchProjects('')}
                              loading={loading}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={14}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'branch']}
                            fieldKey={[field.fieldKey, 'branch']}
                            label={index === 0 ? 'Git-Branch' : ''}
                            rules={[
                              { required: true, message: '请输入 Git-Branch' },
                            ]}
                          >
                            <Input placeholder="例如: master/develop/feature-branch" />
                          </Form.Item>
                        </Col>
                        <Col
                          span={2}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                          }}
                        >
                          {fields.length > 1 && (
                            <Button
                              type="link"
                              danger
                              onClick={() => remove(field.name)}
                              style={{
                                padding: 0,
                                verticalAlign: 'middle',
                                textDecoration: 'line-through',
                              }}
                            >
                              删除
                            </Button>
                          )}
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        新增项目
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
