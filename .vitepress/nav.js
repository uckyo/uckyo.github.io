// 导航栏配置
export const nav = [
  { text: "首页", link: "/" },
  {
    text: "前端",
    items: [
      { text: "React", link: "/Notes/Frontend/React/Start" },
      { text: "Typescript", link: "/Notes/Frontend/Typescript/one" },
      { text: "Electron", link: "/Notes/Frontend/Electron/one" },
      { text: "设计模式", link: "/Notes/Frontend/DesignPatterns/原型模式" },
    ],
  },
  {
    text: "后端",
    items: [
      { text: "JavaSE", link: "/Notes/Backend/Java/JavaSE/快速开始" },
      { text: "SpringAI", link: "/Notes/Backend/Java/SpringAI/Start" },
      { text: "SpringBoot", link: "/Notes/Backend/Java/SpringBoot/Start" },
    ],
  },
  {
    text: "算法",
    link: "/Notes/Algorithm/Start",
  },
  {
    text: "面试题",
    link: "/Interview/HTTP",
  },
  {
    text: "代码片段",
    items: [{ text: "Java", link: "/Snippets/Java/通用基础代码" }],
  },
];
