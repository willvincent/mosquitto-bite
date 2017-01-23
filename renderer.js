// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipc = require('electron').ipcRenderer;

let fire = function() {
  ipc.send('notify', {title: 'Test', msg: 'Testing!'});
};
let quit = function() {
  ipc.send('quit');
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("notify").addEventListener("click", fire);
  document.getElementById('quit').addEventListener('click', quit);
});
