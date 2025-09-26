const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  runPuppeteer: (url) => ipcRenderer.invoke('start-puppeteer', url),
  stopAutomation: () => ipcRenderer.invoke('stop-automation'),
  onLog: (cb) => ipcRenderer.on('puppeteer-log', (e, logMessage) => cb(logMessage))
})
