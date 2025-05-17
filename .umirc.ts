import { defineConfig } from '@umijs/max';



export default defineConfig({
  // 转发api请求到后端
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8080',
      logLevel: 'debug',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' } // 移除路径前缀
    }
  },
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
      name: '服务列表',
      path: '/projects',
      component: './Projects',
    },
    {
      name: '发布单',
      path: '/release',
      component: './Releases',
    },
   {
      name: '应用部署',
      path: '/deploy',
      component: './Deploys',
    },
     {
      name: 'Pods',
      path: '/pods',
      component: './Pods',
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

