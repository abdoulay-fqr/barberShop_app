document.getElementById("myPopupButton").addEventListener("click", async () => {
  await window.electronAPI.showPopup();
});

window.electronAPI.onShowOverlay(() => {
  document.getElementById("blur-overlay").style.display = "block";
  document.getElementById("main-content").classList.add("content-blurred");
});

window.electronAPI.onHideOverlay(() => {
  document.getElementById("blur-overlay").style.display = "none";
  document.getElementById("main-content").classList.remove("content-blurred");
});
