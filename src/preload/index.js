const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startPuppeteer: (url) => ipcRenderer.invoke('start-puppeteer', url),
  onPuppeteerLog: (callback) => {
    ipcRenderer.on('puppeteer-log', (_event, msg) => callback(msg));
  },
  removePuppeteerLog: () => {
    ipcRenderer.removeAllListeners('puppeteer-log');
  },
});
