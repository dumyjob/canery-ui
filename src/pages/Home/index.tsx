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
    

        {/* 部署系统概览卡片 */}
        <Card className="mb-6 overflow-hidden shadow-sm">
          <div className="flex relative">
            <div className="w-1/2 pr-8 z-10">
              <h2 className="text-2xl font-bold mb-4">一键部署系统</h2>
              <p className="text-gray-600 mb-6">
                高效、安全的云原生部署平台，支持多环境一键发布、回滚和监控。提供完整的CI/CD流程，确保应用稳定可靠地交付。
              </p>
              <div className="flex space-x-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg flex-1">
                  <div className="text-blue-500 font-medium">今日部署</div>
                  <div className="text-2xl font-bold">24</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg flex-1">
                  <div className="text-green-500 font-medium">成功率</div>
                  <div className="text-2xl font-bold">98.5%</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg flex-1">
                  <div className="text-purple-500 font-medium">活跃项目</div>
                  <div className="text-2xl font-bold">56</div>
                </div>
              </div>
              <Button type="primary" size="large" icon={<RocketOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">
                创建新部署
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full">
              <img
                src={heroImageUrl}
                alt="部署系统概览"
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
                <img src={categoryImageUrl1} alt="部署管理" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-medium mb-1">部署管理</h3>
              <p className="text-gray-500 text-sm text-center">管理所有应用的部署流程</p>
            </div>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 overflow-hidden">
                <img src={categoryImageUrl2} alt="监控中心" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-medium mb-1">监控中心</h3>
              <p className="text-gray-500 text-sm text-center">实时监控应用性能与资源</p>
            </div>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 overflow-hidden">
                <img src={categoryImageUrl3} alt="服务管理" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-medium mb-1">服务管理</h3>
              <p className="text-gray-500 text-sm text-center">管理微服务与依赖关系</p>
            </div>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 overflow-hidden">
                <img src={categoryImageUrl4} alt="配置中心" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-medium mb-1">配置中心</h3>
              <p className="text-gray-500 text-sm text-center">管理环境变量与系统配置</p>
            </div>
          </Card>
        </div>

        {/* 部署状态概览 */}
        <Card className="mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">部署状态概览</h3>
            <Select defaultValue="today" style={{ width: 120 }}>
              <Option value="today">今日</Option>
              <Option value="week">本周</Option>
              <Option value="month">本月</Option>
            </Select>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <Card className="bg-blue-50 border-none">
              <Statistic 
                title="总部署次数" 
                value={86} 
                valueStyle={{ color: '#1890ff' }}
                prefix={<DeploymentUnitOutlined />} 
              />
            </Card>
            <Card className="bg-green-50 border-none">
              <Statistic 
                title="成功部署" 
                value={79} 
                valueStyle={{ color: '#52c41a' }}
                prefix={<CheckCircleOutlined />} 
                suffix={<span className="text-sm text-gray-500">91.9%</span>}
              />
            </Card>
            <Card className="bg-yellow-50 border-none">
              <Statistic 
                title="进行中" 
                value={4} 
                valueStyle={{ color: '#faad14' }}
                prefix={<ClockCircleOutlined />} 
              />
            </Card>
            <Card className="bg-red-50 border-none">
              <Statistic 
                title="失败部署" 
                value={3} 
                valueStyle={{ color: '#f5222d' }}
                prefix={<ExclamationCircleOutlined />} 
                suffix={<span className="text-sm text-gray-500">3.5%</span>}
              />
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-none bg-gray-50">
              <h4 className="text-base font-medium mb-3">部署环境分布</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>生产环境</span>
                    <span>32</span>
                  </div>
                  <Progress percent={37} showInfo={false} strokeColor="#1890ff" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>测试环境</span>
                    <span>45</span>
                  </div>
                  <Progress percent={52} showInfo={false} strokeColor="#52c41a" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>开发环境</span>
                    <span>9</span>
                  </div>
                  <Progress percent={11} showInfo={false} strokeColor="#faad14" />
                </div>
              </div>
            </Card>
            <Card className="border-none bg-gray-50">
              <h4 className="text-base font-medium mb-3">部署类型分布</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>常规部署</span>
                    <span>41</span>
                  </div>
                  <Progress percent={48} showInfo={false} strokeColor="#1890ff" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>金丝雀部署</span>
                    <span>28</span>
                  </div>
                  <Progress percent={33} showInfo={false} strokeColor="#722ed1" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>蓝绿部署</span>
                    <span>17</span>
                  </div>
                  <Progress percent={19} showInfo={false} strokeColor="#13c2c2" />
                </div>
              </div>
            </Card>
          </div>
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

