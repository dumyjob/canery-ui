// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import { request } from 'umi';
import { Table, Input, Select, Button, Tag, Tooltip, Card, Divider, Row, Col, Form, Upload, Space, Tabs, Modal, message, Dropdown, Menu } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  SettingOutlined,
  PlusOutlined,
  DownOutlined,
  AppstoreOutlined,
  NodeIndexOutlined,
  TeamOutlined,
  CloudServerOutlined,
  RocketOutlined,
  CodeOutlined,
  PartitionOutlined,
  HistoryOutlined,
  BellOutlined,
  FullscreenOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  ApiOutlined,
  BarChartOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  GithubOutlined,
  GitlabOutlined,
  BranchesOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
  UploadOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const projectData = await request('/api/projects/search', {
  method: 'POST',
  data: {},
});

const App: React.FC = () => {
  const [expandedMenu, setExpandedMenu] = useState<string[]>(['项目管理', '部署', '服务']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [form] = Form.useForm();

 
  
  const toggleMenu = (menu: string) => {
    if (expandedMenu.includes(menu)) {
      setExpandedMenu(expandedMenu.filter(item => item !== menu));
    } else {
      setExpandedMenu([...expandedMenu, menu]);
    }
  };

  const showCreateModal = () => {
    setModalMode('create');
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setModalMode('edit');
    setSelectedProject(record);
    form.setFieldsValue({
      name: record.name,
      repository: record.repository,
      branch: record.branch,
      buildCommand: record.buildCommand,
      dockerfilePath: record.dockerfilePath,
      cloudProvider: record.cloudProvider,
      resourceSpec: record.resourceSpec,
      environment: record.environment,
      description: record.description,
    });
    setIsModalVisible(true);
  };

 // 删除项目函数
  const deleteProject = (projectId: number) => {
    const data =  request('/api/projects/' + projectId, {
        method: 'DELETE'
      })
  };

  const handleModalOk =  () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);

    values.envVars = values.envVarieables.reduce((acc: { [x: string]: any; }, { key, value }: any) => {
        acc[key] = value;
        return acc;
      }, {});

    
      const data =  request('/api/projects', {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        data: {
          ...values,
          id: modalMode === 'edit' ? selectedProject.id : undefined,
        },
      })

      message.success(modalMode === 'create' ? '项目创建成功！' : '项目更新成功！');
      setIsModalVisible(false);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text: string, record: any) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center mr-2">
            <span className="text-blue-600 font-bold">{text.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">{record.description}</div>
          </div>
        </div>
      ),
    },
    {
      title: '仓库',
      dataIndex: 'gitRepos',
      key: 'gitRepos',
      width: 180,
      render: (text: string, record: any) => (
        <div className="flex items-center">
          {record.repoType === 'github' ? (
            <GithubOutlined className="mr-1 text-gray-600" />
          ) : (
            <GitlabOutlined className="mr-1 text-gray-600" />
          )}
          <span className="truncate">{text}</span>
        </div>
      ),
    },
    
     {
      title: '项目类型',
      dataIndex: 'projectType',
      key: 'projectType',
      width: 120,
      render: (projectType: string) => {
        return (
          <div className="flex items-center">
            <span>{projectType}</span>
          </div>
        );
      }
    },

    {
      title: 'pods',
      dataIndex: 'pods',
      key: 'pods',
      width: 120,
      render: (pods: string) => {
        return (
          <div className="flex items-center">

            <span>{pods}</span>
          </div>
        );
      }
    },
    {
      title: '资源Cpu',
      dataIndex: 'cpu',
      key: 'cpu',
      width: 150,
      render: (cpu: string) => {
  
        return (
          <div className="flex items-center">
      
            <span>{cpu}核</span>
          </div>
        );
      }
    },
     {
      title: '资源内存',
      dataIndex: 'memory',
      key: 'memory',
      width: 150,
      render: (memory: string) => {
  
        return (
          <div className="flex items-center">
      
            <span>{memory}G</span>
          </div>
        );
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        let color = 'default';
        let icon = null;
        
        if (status === '运行中') {
          color = 'green';
          icon = <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 inline-block"></span>;
        } else if (status === '构建中') {
          color = 'blue';
          icon = <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5 inline-block"></span>;
        } else if (status === '已停止') {
          color = 'gray';
          icon = <span className="w-2 h-2 rounded-full bg-gray-500 mr-1.5 inline-block"></span>;
        } else if (status === '部署失败') {
          color = 'red';
          icon = <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5 inline-block"></span>;
        } else {
          status = '使用中';
         color = 'green';
          icon = <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 inline-block"></span>;
        }
        
        return (
          <Tag color={color} className="px-2 py-1">
            <span className="flex items-center">
              {icon}
              {status}
            </span>
          </Tag>
        );
      }
    },
     {
      title: '最近更新人',
      dataIndex: 'updateBy',
      key: 'updateBy',
      width: 150,
    },
    {
      title: '最近更新',
      dataIndex: 'updateDt',
      key: 'updateDt',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => (
        <div className="space-x-2">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            className="text-blue-500 !rounded-button cursor-pointer"
            onClick={() => showEditModal(record)}
          />
          <Button 
            type="text" 
            icon={<RocketOutlined />} 
            className="text-green-500 !rounded-button cursor-pointer"
            onClick={() => message.success(`开始部署项目: ${record.name}`)}
          />
          <Dropdown menu={{
            items: [
              {
                key: '1',
                icon: <SettingOutlined />,
                label: '配置',
              },
              {
                key: '2',
                icon: <HistoryOutlined />,
                label: '部署历史',
              },
              {
                key: '3',
                icon: <CloudUploadOutlined />,
                label: '手动部署',
              },
              {
                type: 'divider',
              },
              {
                key: '4',
                icon: <DeleteOutlined />,
                label: '删除项目',
                danger: true,
                onClick: () => deleteProject(record.id)
              },
            ],
          }}>
            <Button 
              type="text" 
              icon={<EllipsisOutlined />} 
              className="!rounded-button cursor-pointer"
            />
          </Dropdown>
        </div>
      ),
    },
  ];


 

  // 生成背景图片的URL
  const heroImageUrl = 'https://readdy.ai/api/search-image?query=Modern%20digital%20project%20management%20dashboard%20with%20blue%20and%20white%20color%20scheme%2C%20showing%20deployment%20status%2C%20git%20repositories%2C%20and%20cloud%20infrastructure.%20Professional%20UI%20design%20with%20clean%20layout%20and%20subtle%20grid%20pattern%20in%20background%2C%20high%20quality%203D%20visualization%20of%20deployment%20pipeline%20and%20project%20management%20workflow&width=600&height=300&seq=12345&orientation=landscape';
  
  // 生成分类图标
  const categoryImageUrl1 = 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20project%20management%20with%20blue%20gradient%2C%20showing%20a%20project%20board%20or%20kanban%20symbol%2C%20perfect%20for%20project%20management%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background%20with%20subtle%20shadows&width=80&height=80&seq=23456&orientation=squarish';
  const categoryImageUrl2 = 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20git%20repository%20with%20purple%20gradient%2C%20showing%20a%20branch%20or%20code%20repository%20symbol%2C%20perfect%20for%20code%20management%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background%20with%20subtle%20shadows&width=80&height=80&seq=34567&orientation=squarish';
  const categoryImageUrl3 = 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20cloud%20deployment%20with%20green%20gradient%2C%20showing%20a%20cloud%20with%20arrow%20or%20deployment%20symbol%2C%20perfect%20for%20deployment%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background%20with%20subtle%20shadows&width=80&height=80&seq=45678&orientation=squarish';
  const categoryImageUrl4 = 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20monitoring%20and%20analytics%20with%20orange%20gradient%2C%20showing%20a%20chart%20or%20dashboard%20symbol%2C%20perfect%20for%20monitoring%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background%20with%20subtle%20shadows&width=80&height=80&seq=56789&orientation=squarish';

  return (
    <div className="flex min-h-screen bg-gray-50">
   

      {/* 主内容区域 */}
      <div className="flex-1 p-6">
        {/* 顶部标题和搜索区域 */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex items-center">
            <h1 className="text-xl font-medium mr-4">项目管理</h1>
            <Input
              prefix={<SearchOutlined className="text-gray-400" />}
              placeholder="搜索项目名称、仓库或环境"
              className="w-64 rounded-md"
              suffix={<Button type="text" size="small" icon={<DownOutlined />} />}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              className="!rounded-button whitespace-nowrap cursor-pointer"
              onClick={showCreateModal}
            >
              创建项目
            </Button>
            <Button icon={<HistoryOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">
              部署历史
            </Button>
            <Button icon={<SettingOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">
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

        {/* 项目管理概览卡片 */}
        <Card className="mb-6 overflow-hidden shadow-sm">
          <div className="flex relative">
            <div className="w-1/2 pr-8 z-10">
              <h2 className="text-2xl font-bold mb-4">项目管理中心</h2>
              <p className="text-gray-600 mb-6">
                高效管理您的项目、代码仓库和部署配置。一站式解决方案，从代码到云端，简化您的开发运维流程。
              </p>
              <div className="flex space-x-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg flex-1">
                  <div className="text-blue-500 font-medium">总项目数</div>
                  <div className="text-2xl font-bold">42</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg flex-1">
                  <div className="text-green-500 font-medium">运行中</div>
                  <div className="text-2xl font-bold">36</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg flex-1">
                  <div className="text-purple-500 font-medium">今日部署</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
              </div>
              <Button 
                type="primary" 
                size="large" 
                icon={<PlusOutlined />} 
                className="!rounded-button whitespace-nowrap cursor-pointer"
                onClick={showCreateModal}
              >
                创建新项目
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full">
              <img
                src={heroImageUrl}
                alt="项目管理概览"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </Card>

        {/* 快速访问分类 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 overflow-hidden">
                <img src={categoryImageUrl1} alt="项目管理" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-medium mb-1">项目管理</h3>
              <p className="text-gray-500 text-sm text-center">创建和管理项目配置</p>
            </div>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 overflow-hidden">
                <img src={categoryImageUrl2} alt="代码仓库" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-medium mb-1">代码仓库</h3>
              <p className="text-gray-500 text-sm text-center">管理 Git 仓库和分支</p>
            </div>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 overflow-hidden">
                <img src={categoryImageUrl3} alt="部署配置" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-medium mb-1">部署配置</h3>
              <p className="text-gray-500 text-sm text-center">配置部署目标和参数</p>
            </div>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 overflow-hidden">
                <img src={categoryImageUrl4} alt="监控分析" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-medium mb-1">监控分析</h3>
              <p className="text-gray-500 text-sm text-center">查看项目运行状态和指标</p>
            </div>
          </Card>
        </div>

        {/* 筛选表单 */}
        <Card className="mb-6 shadow-sm">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="mb-1 text-sm text-gray-600">项目名称</div>
              <Input placeholder="请输入项目名称" className="w-full border-gray-300" />
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">仓库地址</div>
              <Input placeholder="请输入仓库地址" className="w-full border-gray-300" />
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">环境</div>
              <Select
                placeholder="请选择环境"
                className="w-full"
              >
                <Option value="生产环境">生产环境</Option>
                <Option value="测试环境">测试环境</Option>
                <Option value="开发环境">开发环境</Option>
              </Select>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">状态</div>
              <Select placeholder="请选择状态" className="w-full">
                <Option value="运行中">运行中</Option>
                <Option value="构建中">构建中</Option>
                <Option value="已停止">已停止</Option>
                <Option value="部署失败">部署失败</Option>
              </Select>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">云服务商</div>
              <Select placeholder="请选择云服务商" className="w-full">
                <Option value="阿里云 ACK">阿里云 ACK</Option>
                <Option value="阿里云 SAE">阿里云 SAE</Option>
                <Option value="AWS ECS">AWS ECS</Option>
              </Select>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">创建人</div>
              <Select placeholder="请选择创建人" className="w-full">
                <Option value="admin">管理员</Option>
                <Option value="developer">开发人员</Option>
                <Option value="operator">运维人员</Option>
              </Select>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">创建时间</div>
              <Select placeholder="请选择时间范围" className="w-full">
                <Option value="today">今天</Option>
                <Option value="week">本周</Option>
                <Option value="month">本月</Option>
                <Option value="custom">自定义</Option>
              </Select>
            </div>
            <div>
              <div className="mb-1 text-sm text-gray-600">资源规格</div>
              <Select placeholder="请选择资源规格" className="w-full">
                <Option value="2核4G">2核4G</Option>
                <Option value="4核8G">4核8G</Option>
                <Option value="8核16G">8核16G</Option>
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
              创建项目
            </Button>
            <div className="space-x-2">
              <Button className="!rounded-button whitespace-nowrap cursor-pointer">收起</Button>
              <Button type="primary" icon={<SearchOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">搜索</Button>
              <Button icon={<ReloadOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">重置</Button>
            </div>
          </div>
        </Card>

        {/* 数据表格 */}
        <Card styles={{ body: { padding: 0 } }} className="shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="text-lg font-medium">项目列表</div>
            <div className="flex space-x-2">
              <Tooltip title="刷新">
                <Button icon={<ReloadOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer" />
              </Tooltip>
              <Tooltip title="全屏">
                <Button icon={<FullscreenOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer" />
              </Tooltip>
              <Tooltip title="设置">
                <Button icon={<SettingOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer" />
              </Tooltip>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={projectData}
            pagination={{ 
              position: ['bottomRight'],
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`
            }}
            className="custom-table"
            rowClassName="hover:bg-gray-50"
            size="middle"
          />
        </Card>

        {/* 底部信息 */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>© 2025 项目管理系统 v2.5.3 | 今日日期: 2025-05-14, Wednesday</p>
        </div>
      </div>

      {/* 创建/编辑项目模态框 */}
      <Modal
        title={modalMode === 'create' ? '创建新项目' : '编辑项目'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleModalCancel} className="!rounded-button whitespace-nowrap cursor-pointer">
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
                <Col span={8}>
                  <Form.Item
                    name="name"
                    label="项目名称"
                    rules={[{ required: true, message: '请输入项目名称' }]}
                  >
                    <Input placeholder="请输入项目名称" />
                  </Form.Item>
                </Col>
                 <Col span={16}>
                  <Form.Item
                    name="gitRepos"
                    label="Git 仓库地址"
                    rules={[{ required: true, message: '请输入 Git 仓库地址' }]}
                  >
                    <Input 
                      placeholder="例如: https://github.com/organization/repository" 
                      addonBefore={
                        <Select defaultValue="github" style={{ width: 100 }}>
                          <Option value="github">GitHub</Option>
                          <Option value="gitlab">GitLab</Option>
                        </Select>
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
             <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="projectType"
                    label="项目类型"
                    rules={[{ required: true, message: '请选择项目类型' }]}
                  >
                    <Select placeholder="请选择项目类型">
                      <Option value="spring-boot-jar">spring-boot-jar</Option>
                      <Option value="dubbo">dubbo</Option>
                      <Option value="node-js">node-js</Option>
                    </Select>
              
                  </Form.Item>
                </Col>
                
                <Col span={16}>
                  <Form.Item
                    name="webhook"
                    label="webhok通知地址"
                    rules={[{ required: false, message: '请输入 Git 仓库地址' }]}
                  >
                    <Input 
                      placeholder="例如: https://github.com/organization/repository" 
                  
                    />
                  </Form.Item>
                </Col>
              </Row>


              <Form.Item
                name="description"
                label="项目描述"
              >
                <TextArea rows={4} placeholder="请输入项目描述" />
              </Form.Item>
            </TabPane>
            <TabPane tab="构建配置" key="2">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="buildCommand"
                    label="构建命令"
                    rules={[{ required: true, message: '请输入构建命令' }]}
                  >
                    <Input placeholder="例如: mvn clean package, npm run build" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dockerfilePath"
                    label="Dockerfile 路径"
                    rules={[{ required: true, message: '请输入 Dockerfile 路径' }]}
                  >
                    <Input placeholder="例如: /Dockerfile, /docker/Dockerfile.prod" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="buildArgs"
                label="构建参数"
              >
                <TextArea rows={4} placeholder="每行一个参数，格式为 KEY=VALUE" />
              </Form.Item>
              <Form.Item
                name="buildHooks"
                label="构建钩子"
              >
                <div className="border border-gray-300 rounded-md p-4">
                  <div className="mb-2">
                    <div className="text-sm text-gray-600 mb-1">构建前脚本</div>
                    <Input placeholder="构建前执行的命令" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">构建后脚本</div>
                    <Input placeholder="构建后执行的命令" />
                  </div>
                </div>
              </Form.Item>
            </TabPane>
            <TabPane tab="部署目标" key="3">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="cpu"
                    label="cpu核数"
                    rules={[{ required: true, message: '请输入cpu核数' }]}
                  >
                    <Input type="number" min={1} max={50} defaultValue={2} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="memory"
                    label="内存大小(G)"
                    rules={[{ required: true, message: '请输入内存大小' }]}
                  >
                    <Input type="number" min={1} max={50} defaultValue={2} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="pods"
                    label="pod数量"
                  >
                    <Input type="number" min={1} max={10} defaultValue={2} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="deployStrategy"
                    label="部署策略"
                  >
                    <Select placeholder="请选择部署策略" defaultValue="滚动更新">
                      <Option value="滚动更新">滚动更新</Option>
                      <Option value="蓝绿部署">蓝绿部署</Option>
                      <Option value="金丝雀发布">金丝雀发布</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="networkConfig"
                label="网络配置"
              >
                <div className="border border-gray-300 rounded-md p-4">
                  <Row gutter={16}>
                    <Col span={8}>
                      <div className="text-sm text-gray-600 mb-1">服务端口</div>
                      <Input placeholder="例如: 8080" defaultValue="8080" />
                    </Col>
                    <Col span={8}>
                      <div className="text-sm text-gray-600 mb-1">健康检查路径</div>
                      <Input placeholder="例如: /health" defaultValue="/health" />
                    </Col>
                    <Col span={8}>
                      <div className="text-sm text-gray-600 mb-1">超时时间(秒)</div>
                      <Input type="number" defaultValue={30} />
                    </Col>
                  </Row>
                </div>
              </Form.Item>
            </TabPane>
            <TabPane tab="环境变量" key="4">
              <div className="mb-4">
                <Button 
                  type="dashed" 
                  className="w-full !rounded-button whitespace-nowrap cursor-pointer" 
                  icon={<PlusOutlined />}
                  onClick={() => message.info('添加环境变量')}
                >
                  添加环境变量
                </Button>
              </div>
              <div className="border border-gray-300 rounded-md p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">环境变量列表</div>
                  <div className="text-gray-500 text-sm">共 3 项</div>
                </div>

                
              <Form.List name="envVarieables">
                {(fields, { add, remove }) => (
                  <div className="space-y-3">
                    {fields.map(({ key, name }) => (
                      <div className="flex items-center" key={key}>
                        {/* 键输入 */}
                        <Form.Item
                          name={[name, 'key']}
                          className="w-1/3 pr-2 mb-0"
                          rules={[{ required: true, message: '键不能为空' }]}
                        >
                          <Input placeholder="键" />
                        </Form.Item>
                        
                        {/* 值输入 */}
                        <Form.Item
                          name={[name, 'value']}
                          className="w-2/3 pl-2 flex mb-0"
                          rules={[{ required: true, message: '值不能为空' }]}
                        >
                          <div className="flex items-center w-full">
                            <Input placeholder="值" className="flex-1" />
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => remove(name)}
                              className="ml-2 !rounded-button"
                            />
                          </div>
                        </Form.Item>
                      </div>
                    ))}
                    
                    {/* 添加按钮 */}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      block
                    >
                      新增环境变量
                    </Button>
                  </div>
                )}
              </Form.List>

                
              </div>
              <Form.Item
                name="envFile"
                label="上传环境变量文件"
              >
                <Upload.Dragger 
                  name="files" 
                  action="/upload.do" 
                  multiple={false}
                  showUploadList={false}
                  onChange={() => message.success('文件上传成功')}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                  <p className="ant-upload-hint">
                    支持 .env 文件格式，每行一个环境变量，格式为 KEY=VALUE
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </div>
  );
};

export default App;

