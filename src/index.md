---
layout: home

hero:
  name: "Dadu 知识库"
  text: "等风来，不如追风去。"
  tagline: 明日复明日，明日何其多。
  actions:
    - theme: brand
      text: 前端笔记
      link: /Notes/Frontend/React/Start
    - theme: alt
      text: 后端笔记
      link: /Notes/Backend/Java/JavaSE/Start
    - theme: alt
      text: 面试题
      link: /Interview/HTTP
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
}
</style>
<script setup>
import Home from './components/Home/index.vue'
</script>
<Home />
