import { defineConfig } from "vitepress";
import { nav } from "./nav.js";
import { sidebar } from "./sidebar.js";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dadu 知识库",
  description: "A VitePress Site",
  srcDir: "./src",
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
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
    socialLinks: [
      { icon: "github", link: "https://github.com/uckyo/uckyo.github.io" },
    ],
  },
});
