const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  showPopup: () => ipcRenderer.invoke("show-popup"),
  onShowOverlay: (callback) => ipcRenderer.on("show-overlay", callback),
  onHideOverlay: (callback) => ipcRenderer.on("hide-overlay", callback),
});
