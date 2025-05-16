// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Layout, Menu, Button, Table, Tabs, Tag, Tooltip, Badge, Space, Typography, Input, Breadcrumb } from 'antd';
import {
AppstoreOutlined,
SettingOutlined,
CloudOutlined,
TeamOutlined,
FileTextOutlined,
DashboardOutlined,
SearchOutlined,
DownOutlined,
ReloadOutlined,
EyeOutlined,
HistoryOutlined,
CodeOutlined,
AreaChartOutlined,
DeleteOutlined,
PlusOutlined,
QuestionCircleOutlined,
BranchesOutlined
} from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import * as echarts from 'echarts';
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { Title, Text } = Typography;
const swiperModules = [Pagination, Autoplay];
const App: React.FC = () => {
const [collapsed, setCollapsed] = useState(false);
// 模拟数据
const podData = [
{
key: '1',
name: 'pay-service-v20250527-f42005235-7bb89f4bf0-4upwv',
podIp: '10.196.78.244',
replicas: '2/2',
commitId: '87f08523',
status: 'Running',
restartCount: '--',
lastRestartTime: '--',
nodeName: 'kilo-node-vmkl8n-4o7qbjsvqj',
nodeIp: '10.196.64.37',
operation: ['查看日志', '事件日志', 'Arthas', 'Dump', '监控']
},
{
key: '2',
name: 'pay-service-v20250527-f42005235-7bb89f4bf0-4znf',
podIp: '10.196.23.200',
replicas: '2/2',
commitId: '87f08523',
status: 'Running',
restartCount: '--',
lastRestartTime: '--',
nodeName: 'kilo-node-vmsu9n-4o7qbjsvqj',
nodeIp: '10.196.64.81',
operation: ['查看日志', '事件日志', 'Arthas', 'Dump', '监控']
},
{
key: '3',
name: 'pay-service-v20250527-f42005235-7bb89f4bf0-6ekzk',
podIp: '10.196.0.207',
replicas: '2/2',
commitId: '87f08523',
status: 'Running',
restartCount: '--',
lastRestartTime: '--',
nodeName: 'kilo-node-vmkek-/g/cokmzdn',
nodeIp: '10.196.64.199',
operation: ['查看日志', '事件日志', 'Arthas', 'Dump', '监控']
},
{
key: '4',
name: 'pay-service-v20250527-f42005235-7bb89f4bf0-7ecjq',
podIp: '10.196.23.230',
replicas: '2/2',
commitId: '87f08523',
status: 'Running',
restartCount: '--',
lastRestartTime: '--',
nodeName: 'kilo-node-vm-kek-/g/cokmzdn',
nodeIp: '10.196.64.147',
operation: ['查看日志', '事件日志', 'Arthas', 'Dump', '监控']
},
{
key: '5',
name: 'pay-service-v20250527-f42005235-7bb89f4bf0-7llnr',
podIp: '10.196.25.221',
replicas: '2/2',
commitId: '87f08523',
status: 'Running',
restartCount: '--',
lastRestartTime: '--',
nodeName: 'kilo-node-vmapiy-7g7cokmzdn',
nodeIp: '10.196.64.180',
operation: ['查看日志', '事件日志', 'Arthas', 'Dump', '监控']
},
{
key: '6',
name: 'pay-service-v20250527-f42005235-7bb89f4bf0-imbd',
podIp: '10.196.17.178',
replicas: '2/2',
commitId: '87f08523',
status: 'Running',
restartCount: '--',
lastRestartTime: '--',
nodeName: 'kilo-node-vmdmfp-4o7qbjsvqj',
nodeIp: '10.196.64.26',
operation: ['查看日志', '事件日志', 'Arthas', 'Dump', '监控']
},
];
const columns = [
{
title: '名称',
dataIndex: 'name',
key: 'name',
ellipsis: true,
width: 320,
render: (text: string) => (
<Tooltip placement="topLeft" title={text}>
<span className="font-medium text-gray-900">{text}</span>
</Tooltip>
),
},
{
title: '状态',
dataIndex: 'status',
key: 'status',
width: 100,
render: (text: string) => (
<Badge
status={text === 'Running' ? 'success' : 'error'}
text={text}
className={`${text === 'Running' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}
/>
),
},
{
title: 'Pod IP',
dataIndex: 'podIp',
key: 'podIp',
width: 120,
render: (text: string) => (
<span className="text-gray-600">{text}</span>
),
},
{
title: '容器组',
dataIndex: 'replicas',
key: 'replicas',
width: 80,
render: (text: string) => (
<Tag color="blue" className="px-2 py-1">{text}</Tag>
),
},
{
title: 'Commit ID',
dataIndex: 'commitId',
key: 'commitId',
width: 100,
render: (text: string) => (
<a href="#" className="text-blue-500 hover:text-blue-600 font-medium">{text}</a>
),
},
{
title: '状态',
dataIndex: 'status',
key: 'status',
width: 100,
render: (text: string) => (
<span className={`${text === 'Running' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
{text}
</span>
),
},
{
title: '重启次数',
dataIndex: 'restartCount',
key: 'restartCount',
width: 100,
render: (text: string) => (
<span className="text-gray-600">{text}</span>
),
},
{
title: '上次重启时间',
dataIndex: 'lastRestartTime',
key: 'lastRestartTime',
width: 120,
render: (text: string) => (
<span className="text-gray-600">{text}</span>
),
},
{
title: '节点名称',
dataIndex: 'nodeName',
key: 'nodeName',
width: 200,
ellipsis: true,
render: (text: string) => (
<Tooltip placement="topLeft" title={text}>
<span className="text-gray-600">{text}</span>
</Tooltip>
),
},
{
title: '节点机 IP',
dataIndex: 'nodeIp',
key: 'nodeIp',
width: 120,
render: (text: string) => (
<span className="text-gray-600">{text}</span>
),
},
{
title: '操作',
dataIndex: 'operation',
key: 'operation',
width: 350,
render: (operations: string[]) => (
<Space size="small">
{operations.map((op, index) => (
<Button
key={index}
type={index === 0 ? "primary" : "default"}
size="small"
className="!rounded-button whitespace-nowrap cursor-pointer"
style={{ fontSize: '12px' }}
>
{op}
</Button>
))}
</Space>
),
},
];
// 初始化图表
React.useEffect(() => {
const chartDom = document.getElementById('cpu-memory-chart');
if (chartDom) {
const myChart = echarts.init(chartDom);
const option = {
animation: false,
tooltip: {
trigger: 'axis',
axisPointer: {
type: 'cross',
label: {
backgroundColor: '#6a7985'
}
}
},
legend: {
data: ['CPU 使用率', '内存使用率']
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: [
{
type: 'category',
boundaryGap: false,
data: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
}
],
yAxis: [
{
type: 'value',
axisLabel: {
formatter: '{value}%'
}
}
],
series: [
{
name: 'CPU 使用率',
type: 'line',
stack: 'Total',
areaStyle: {},
emphasis: {
focus: 'series'
},
data: [12, 15, 23, 18, 25, 20, 15]
},
{
name: '内存使用率',
type: 'line',
stack: 'Total',
areaStyle: {},
emphasis: {
focus: 'series'
},
data: [32, 35, 30, 38, 36, 40, 35]
}
]
};
myChart.setOption(option);
window.addEventListener('resize', () => {
myChart.resize();
});
return () => {
window.removeEventListener('resize', () => {
myChart.resize();
});
myChart.dispose();
};
}
}, []);
return (
<Layout style={{ minHeight: '1024px', width: '1440px' }}>
<Header className="bg-white h-16 px-6 flex items-center justify-between border-b border-gray-200">
<div className="flex items-center">
<div className="flex items-center mr-8">
<div className="text-blue-600 text-xl font-bold mr-2">
<CloudOutlined />
</div>
<span className="text-lg font-semibold">Crane</span>
</div>
<div className="flex items-center border rounded px-3 py-1 bg-gray-50 text-gray-700 mr-4">
<span>生产消费云系统 (prod-gl-cloud)</span>
<DownOutlined className="ml-2 text-xs" />
</div>
<Breadcrumb className="text-sm">
<Breadcrumb.Item>应用</Breadcrumb.Item>
<Breadcrumb.Item>应用详情</Breadcrumb.Item>
</Breadcrumb>
</div>
<div className="flex items-center">
<Button type="primary" icon={<PlusOutlined />} className="mr-3 !rounded-button whitespace-nowrap cursor-pointer">
New Issue
</Button>
<Button icon={<FileTextOutlined />} className="mr-3 !rounded-button whitespace-nowrap cursor-pointer">Doc</Button>
<Button icon={<SettingOutlined />} className="mr-3 !rounded-button whitespace-nowrap cursor-pointer">System</Button>
<Button className="mr-3 !rounded-button whitespace-nowrap cursor-pointer">罗马日志</Button>
<Button className="mr-3 !rounded-button whitespace-nowrap cursor-pointer">下拉框</Button>
<Button icon={<TeamOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">团队管理</Button>
</div>
</Header>
<Layout>
<Sider
width={200}
theme="light"
collapsible
collapsed={collapsed}
onCollapse={setCollapsed}
className="border-r border-gray-200"
>
<div className="p-4">
<Button type="primary" block className="!rounded-button whitespace-nowrap cursor-pointer">
应用列表
</Button>
</div>
<Menu
mode="inline"
defaultSelectedKeys={['1']}
defaultOpenKeys={['sub1']}
className="border-r-0"
>
<Menu.Item key="1" icon={<AppstoreOutlined />}>
相关界面
</Menu.Item>
<Menu.Item key="2" icon={<FileTextOutlined />}>
从这里点击
</Menu.Item>
<Menu.SubMenu key="sub1" icon={<AppstoreOutlined />} title="部署">
<Menu.Item key="3">发布单</Menu.Item>
<Menu.Item key="4">流程 Pipeline</Menu.Item>
<Menu.Item key="5">部署集合</Menu.Item>
<Menu.Item key="6">部署环境</Menu.Item>
<Menu.Item key="7">构建环境</Menu.Item>
</Menu.SubMenu>
<Menu.SubMenu key="sub2" icon={<CloudOutlined />} title="服务">
<Menu.Item key="8">日志服务</Menu.Item>
<Menu.Item key="9">全链监控服务</Menu.Item>
<Menu.Item key="10">发现服务</Menu.Item>
<Menu.Item key="11">Arthas</Menu.Item>
<Menu.Item key="12">Java Dumps</Menu.Item>
<Menu.Item key="13">容器内命令</Menu.Item>
</Menu.SubMenu>
</Menu>
</Sider>
<Content className="bg-gray-50 p-6">
<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
<div className="flex justify-between items-center mb-6">
<Title level={4} className="m-0">pay-service</Title>
<Button type="primary" icon={<ReloadOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">
应用刷新
</Button>
</div>
<div className="grid grid-cols-3 gap-6 mb-6">
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-gray-500 mb-2">项目：平台服务-客户组</div>
<div className="text-gray-500 mb-2">应用描述：平台-客户核心</div>
<div className="text-gray-500">开发语言：Java</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-gray-500 mb-2">
<span className="mr-2">集群：</span>
<Tag color="blue">北区(251066)</Tag>
<Tag color="blue">南区(704436)</Tag>
<QuestionCircleOutlined className="text-gray-400 ml-1" />
</div>
<div className="text-gray-500 mb-2">
<span className="mr-2">应用类型：</span>
<Tag color="green">service</Tag>
</div>
<div className="text-gray-500">
<span className="mr-2">构建环境：</span>
<Tag color="blue">dev</Tag>
<Tag color="blue">prod-gl-cloud</Tag>
<Tag color="blue">uat-gl</Tag>
<QuestionCircleOutlined className="text-gray-400 ml-1" />
</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-gray-500 mb-2">
<span className="mr-2">开发者：</span>
<span>张三(144112)、王磊(150185)、刘强(1.1k)</span>
<QuestionCircleOutlined className="text-gray-400 ml-1" />
</div>
<div className="text-gray-500 mb-2">
<span className="mr-2">应用等级：</span>
<span>黄金</span>
</div>
<div className="text-gray-500">
<span className="mr-2">Web 服务地址：</span>
<a href="/pay-service" className="text-blue-500">/pay-service</a>
</div>
</div>
</div>
<div className="grid grid-cols-2 gap-6">
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-gray-500">
<span className="mr-2">全局地址：</span>
<a href="git@code.aliyun.com:pay-R/pay-service.git" className="text-blue-500">git@code.aliyun.com:pay-R/pay-service.git</a>
</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-gray-500">
<span className="mr-2">metric：</span>
<Badge status="success" text="有完整埋点" />
<QuestionCircleOutlined className="text-gray-400 ml-1" />
</div>
</div>
</div>
</div>
<div className="bg-white rounded-lg shadow-sm">
<Tabs defaultActiveKey="1" className="px-6 pt-4">
<TabPane tab={
<span>
<Badge count={podData.length} offset={[10, 0]}>
Pod
</Badge>
</span>
} key="1">
</TabPane>
<TabPane tab={
<span>
<Badge count={0} offset={[10, 0]}>
出错详情
</Badge>
</span>
} key="2">
</TabPane>
<TabPane tab="集群记录" key="3"></TabPane>
<TabPane tab="发布" key="4"></TabPane>
<TabPane tab="全部发布" key="5"></TabPane>
<TabPane tab="变更发布单" key="6"></TabPane>
<TabPane tab="三方依赖" key="7"></TabPane>
</Tabs>
<div className="p-6">
<div className="flex justify-between items-center mb-4">
<div>
<Button type="primary" icon={<ReloadOutlined />} className="mr-3 !rounded-button whitespace-nowrap cursor-pointer">
重启应用
</Button>
<Button icon={<BranchesOutlined />} className="mr-3 !rounded-button whitespace-nowrap cursor-pointer">
扩缩容
</Button>
<Button icon={<HistoryOutlined />} className="!rounded-button whitespace-nowrap cursor-pointer">
回滚
</Button>
</div>
<Input
placeholder="搜索 Pod 名称"
prefix={<SearchOutlined className="text-gray-400" />}
className="w-64 text-sm"
/>
</div>
<Table
columns={columns}
dataSource={podData}
pagination={false}
size="middle"
scroll={{ x: 1200 }}
className="border border-gray-200 rounded-lg"
rowClassName="hover:bg-gray-50"
/>
</div>
</div>
<div className="flex justify-end mt-6">
<Button
type="primary"
icon={<AreaChartOutlined />}
onClick={() => window.open('/monitoring')}
className="!rounded-button whitespace-nowrap cursor-pointer"
>
查看资源监控
</Button>
</div>
</Content>
</Layout>
</Layout>
);
};
export default App
