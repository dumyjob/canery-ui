// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { Table, Input, Select, Button, Tag, Tooltip, Card, Divider, Row, Col, Progress, Statistic } from 'antd';
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
  GlobalOutlined
} from '@ant-design/icons';

const { Option } = Select;

const App: React.FC = () => {
  const [expandedMenu, setExpandedMenu] = useState<string[]>(['应用', '部署', '服务']);
  
  const toggleMenu = (menu: string) => {
    if (expandedMenu.includes(menu)) {
      setExpandedMenu(expandedMenu.filter(item => item !== menu));
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
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '应用',
      dataIndex: 'application',
      key: 'application',
      width: 150,
    },
    {
      title: '发布类型',
      dataIndex: 'deployType',
      key: 'deployType',
      width: 120,
    },
    {
      title: '双层架构',
      dataIndex: 'architecture',
      key: 'architecture',
      width: 120,
      render: (text: string) => text ? text : '--',
    },
    {
      title: '流量策略',
      dataIndex: 'trafficPolicy',
      key: 'trafficPolicy',
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
          icon = <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5 inline-block"></span>;
        } else if (status === '发布中') {
          color = 'green';
          icon = <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 inline-block"></span>;
        } else if (status === '已停用') {
          color = 'gray';
          icon = <span className="w-2 h-2 rounded-full bg-gray-500 mr-1.5 inline-block"></span>;
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
      title: '带队状态',
      dataIndex: 'teamStatus',
      key: 'teamStatus',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: () => (
        <div className="space-x-2">
          <Button type="link" className="text-blue-500 p-0 whitespace-nowrap !rounded-button cursor-pointer">编辑</Button>
          <Button type="link" className="text-blue-500 p-0 whitespace-nowrap !rounded-button cursor-pointer">更多操作</Button>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: '54179',
      name: 'fund.transaction.transfer.mq.pay.service',
      application: 'pay-service',
      deployType: '金丝雀',
      architecture: '--',
      trafficPolicy: '100% 到新版本',
      status: '使用中',
      teamStatus: '待审批: pay-service',
      description: '金融交易转账服务',
    },
    {
      key: '2',
      id: '54172',
      name: 'image#*32-v3-vector-向量矩阵',
      application: 'km-matrix',
      deployType: '定时',
      architecture: 'km-matrix',
      trafficPolicy: 'non-stop',
      status: '使用中',
      teamStatus: '待审批: km-matrix',
      description: '向量矩阵计算服务',
    },
    {
      key: '3',
      id: '54164',
      name: 'ITC-49636 (线上问题)收银台结算前端',
      application: 'pay-service',
      deployType: '金丝雀',
      architecture: '--',
      trafficPolicy: '平均分配流量',
      status: '使用中',
      teamStatus: '待审批: pay-service,payfusion-service',
      description: '收银台结算服务',
    },
    {
      key: '4',
      id: '54102',
      name: 'itc-pay-consumer',
      application: 'pay-consumer',
      deployType: '金丝雀',
      architecture: '--',
      trafficPolicy: '100% 到新版本',
      status: '发布中',
      teamStatus: '待审批: pay-consumer',
      description: '支付消费者服务',
    },
    {
      key: '5',
      id: '54029',
      name: 'ITC-49635 双服务可选配置开关升级',
      application: 'pay-service',
      deployType: '金丝雀',
      architecture: '--',
      trafficPolicy: '100% 到新版本',
      status: '使用中',
      teamStatus: '待审批: pay-service',
      description: '服务配置开关升级',
    },
    {
      key: '6',
      id: '54018',
      name: 'data-processing-service',
      application: 'data-service',
      deployType: '蓝绿部署',
      architecture: 'microservice',
      trafficPolicy: '灰度发布',
      status: '使用中',
      teamStatus: '待审批: data-service',
      description: '数据处理服务',
    },
    {
      key: '7',
      id: '53998',
      name: 'auth-gateway-service',
      application: 'auth-service',
      deployType: '常规',
      architecture: 'gateway',
      trafficPolicy: '直接切换',
      status: '已停用',
      teamStatus: '已审批: auth-service',
      description: '认证网关服务',
    },
  ];

  // 生成背景图片的URL
  const heroImageUrl = 'https://readdy.ai/api/search-image?query=Modern%20digital%20deployment%20system%20dashboard%20with%20blue%20and%20white%20color%20scheme%2C%20showing%20deployment%20status%2C%20monitoring%20graphs%2C%20and%20server%20health%20indicators.%20Professional%20UI%20design%20with%20clean%20layout%20and%20subtle%20grid%20pattern%20in%20background%2C%20high%20quality%203D%20visualization%20of%20cloud%20infrastructure%20and%20deployment%20pipeline&width=600&height=300&seq=12345&orientation=landscape';
  
  // 生成分类图标
  const categoryImageUrl1 = 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20cloud%20deployment%20with%20blue%20gradient%2C%20showing%20a%20rocket%20or%20cloud%20symbol%20with%20upward%20arrow%2C%20perfect%20for%20deployment%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background&width=80&height=80&seq=23456&orientation=squarish';
  const categoryImageUrl2 = 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20application%20monitoring%20with%20purple%20gradient%2C%20showing%20a%20dashboard%20or%20graph%20symbol%2C%20perfect%20for%20monitoring%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background&width=80&height=80&seq=34567&orientation=squarish';
  const categoryImageUrl3 = 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20cloud%20services%20with%20green%20gradient%2C%20showing%20a%20server%20or%20cloud%20database%20symbol%2C%20perfect%20for%20services%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background&width=80&height=80&seq=45678&orientation=squarish';
  const categoryImageUrl4 = 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20icon%20representing%20system%20configuration%20with%20orange%20gradient%2C%20showing%20a%20gear%20or%20settings%20symbol%2C%20perfect%20for%20configuration%20category%20in%20enterprise%20software%2C%20clean%20professional%20design%20on%20transparent%20background&width=80&height=80&seq=56789&orientation=squarish';

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
              suffix={<Button type="text" size="small" icon={<DownOutlined />} />}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button type="primary" icon={<PlusOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">
              新建发布单
            </Button>
            <Button icon={<HistoryOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">
              历史记录
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
            <Button type="primary" icon={<PlusOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">
              创建发布单
            </Button>
            <div className="space-x-2">
              <Button className="!rounded-button whitespace-nowrap cursor-pointer">收起</Button>
              <Button type="primary" icon={<SearchOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">搜索</Button>
              <Button icon={<ReloadOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">重置</Button>
            </div>
          </div>
        </Card>

        {/* 数据表格 */}
        <Card  styles={{ body: { padding: 0 } }} className="shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="text-lg font-medium">发布单列表</div>
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
            dataSource={data}
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
          <p>© 2025 一键部署系统 v2.5.3 | 今日日期: 2025-05-14, Wednesday</p>
        </div>
      </div>
    </div>
  );
};

export default App;

