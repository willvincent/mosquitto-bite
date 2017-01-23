// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const notifier = require('node-notifier');


let fire = function() {
  notifier.notify({
    title: 'Test notification!',
    message: 'This is a test notification. Neat, huh?',
    sound: true,
    wait: true
  }, function (err, response) {
  });
};


fire();

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("notify").addEventListener("click", fire);
})
