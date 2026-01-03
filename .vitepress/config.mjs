import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dadu 知识库",
  description: "A VitePress Site",
  srcDir: "./src",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "学习笔记",
        items: [
          { text: "前端", link: "/Notes/Frontend/React/Start" },
          { text: "后端", link: "/Notes/Backend/Java" },
        ],
      },
      {
        text: "面试题",
        link: "/Interview/HTTP",
      },
      {
        text: "代码片段",
        link: "/Snippets/one",
      },
    ],
    outline: {
      level: [1, 2],
      label: "页面导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    sidebar: {
      "/Notes/Frontend/": [
        {
          text: "React",
          collapsed: true,
          items: [
            { text: "Start", link: "/Notes/Frontend/React/Start" },
            { text: "JSX", link: "/Notes/Frontend/React/JSX" },
            { text: "Component", link: "/Notes/Frontend/React/Component" },
            { text: "Hooks", link: "/Notes/Frontend/React/Hooks" },
            { text: "Redux", link: "/Notes/Frontend/React/Redux" },
            { text: "React-Redux", link: "/Notes/Frontend/React/React-Redux" },
          ],
        },
        {
          text: "设计模式",
          collapsed: true,
          items: [
            {
              text: "原型模式",
              link: "/Notes/Frontend/DesignPatterns/原型模式",
            },
            {
              text: "单例模式",
              link: "/Notes/Frontend/DesignPatterns/单例模式",
            },
          ],
        },
        {
          text: "Typescript",
          collapsed: true,
          items: [
            { text: "one", link: "/Notes/Frontend/Typescript/one" },
            { text: "two", link: "/Notes/Frontend/Typescript/two" },
          ],
        },
        {
          text: "Electron",
          collapsed: true,
          items: [
            { text: "one", link: "/Notes/Frontend/Electron/one" },
            { text: "two", link: "/Notes/Frontend/Electron/two" },
          ],
        },
      ],
      "/Notes/Backend/": [
        {
          text: "Java",
          collapsed: true,
          items: [],
        },
      ],
      "/Snippets/": [
        {
          text: "one",
          link: "/Snippets/one",
        },
        {
          text: "two",
          link: "/Snippets/two",
        },
      ],
      "/Interview/": [
        {
          text: "HTTP",
          link: "/Interview/HTTP",
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/uckyo/uckyo.github.io" },
    ],
  },
});
