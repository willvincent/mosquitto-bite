'use strict';

const path = require('path');
const menubar = require('menubar');
const ipcMain = require('electron').ipcMain;
const NotificationCenter = require('node-notifier').NotificationCenter;

var opts = {
  dir: __dirname,
  icon: path.join(__dirname, 'icon', 'IconTemplate.png'),
  tooltip: 'Mosquitto Bite',
  width: 300
};

var mb = menubar(opts);

var notifier = new NotificationCenter({
  withFallback: false, // Use Growl Fallback if <= 10.8
  customPath: void 0 // Relative/Absolute path to binary if you want to use your own fork of terminal-notifier
});

mb.on('ready', function ready () {
    mb.on('show', function show () {
        mb.window.webContents.send("show");
    });

    mb.on('after-hide', function show () {
        mb.window.webContents.send("after_hide");
    });

    ipcMain.on('quit', function() {
        mb.app.quit();
    });

    ipcMain.on('notify', function(event, payload) {
      notifier.notify({
        title: payload.title,
        message: payload.msg,
        sound: true,
        timeout: 3,
      }, function (err, response) {
      });
    })
});

mb.on('after-create-window', function() {
    if (process.env.NODE_ENV === 'dev') {
        mb.window.openDevTools();
        mb.window.setResizable(false);
    }
});
