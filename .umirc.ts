import { defineConfig } from '@umijs/max';



export default defineConfig({

  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  extraPostCSSPlugins: [
    require("tailwindcss")({ config: "./tailwind.config.js" }), // 指定配置文件路径
    require("autoprefixer")
  ],
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '发布单',
      path: '/release',
      component: './Releases',
    },
    {
      name: '应用列表',
      path: '/projects',
      component: './Projects',
    },
     {
      name: 'Pods',
      path: '/pods',
      component: './Pods',
    },
     {
      name: '应用部署',
      path: '/deploy',
      component: './Deploys',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
});

