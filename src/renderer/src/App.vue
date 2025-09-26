<template>
  <div style="padding:20px">
    <h1>Electron + Puppeteer + Vue + Preload</h1>
    <button @click="startAutomation">启动自动化</button>
    <button @click="stopAutomation">停止自动化</button>
    <h3>页面标题: {{ title }}</h3>
    <div>
      <h3>Puppeteer Logs:</h3>
      <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: '',
      logs: [],
    };
  },
  mounted() {
    window.electronAPI.onLog((msg) => {
      this.logs.push(msg)
    })
  },
  methods: {
    async startAutomation() {
      const t = await window.electronAPI.runPuppeteer('https://www.baidu.com');
      this.title = t.title;
    },
    async stopAutomation() {
      const t = await window.electronAPI.stopAutomation();
      if (t) {
        this.logs.push(' 停止成功');
      } else {
        this.logs.push('停止失败');
      }
    },
  },
};
</script>
