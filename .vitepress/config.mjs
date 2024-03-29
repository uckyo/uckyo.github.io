import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dadu 知识库",
  description: "A VitePress Site",
  srcDir: './src',
  cleanUrls:true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: '学习笔记',
        items: [
          { text: '设计模式', link: '/Notes/DesignPatterns/原型模式'},
          { text: 'Typescript', link: '/Notes/Typescript/one' },
          { text: 'Electron', link: '/Notes/Electron/one' }
        ]
      },
      {
        text: '代码片段',
        link: '/Snippets/one',
      }
    ],
    outline: {
      level: [1,3],
      label: '页面导航'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    sidebar: {
      "/Notes/": [
        {
          text: '设计模式',
          collapsed: true,
          items: [
            { text: '原型模式', link: '/Notes/DesignPatterns/原型模式'},
            { text: '单例模式', link: '/Notes/DesignPatterns/单例模式'}
          ]
        },
        {
          text: 'Typescript',
          collapsed: true,
          items: [
            { text: 'one', link: '/Notes/Typescript/one' },
            { text: 'two', link: '/Notes/Typescript/two'}
          ]
        },
        {
          text: 'Electron',
          collapsed: true,
          items: [
            { text: 'one', link: '/Notes/Electron/one' },
            { text: 'two', link: '/Notes/Electron/two' }
          ]
        }
      ],
        "/Snippets/": [
            {
            text: 'one',
            link: '/Snippets/one'
            },
            {
            text: 'two',
            link: '/Snippets/two'
            }
        ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/uckyo/uckyo.github.io' }
    ]
  }
})
