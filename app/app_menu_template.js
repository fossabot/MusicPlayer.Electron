const electron = require('electron');
const { app } = electron;
const c = require('./constants');

// create menu template
const menuTemplate = function(mainWindow) {
  const template = [
    {
      label: c.menu.calculate.label,
      submenu: [
        {
          label: c.menu.calculate.car,
          accelerator: 'CmdOrCtrl+B',
          click() {
            mainWindow.loadRelativeUrl('/');
          }
        },
        {
          label: c.menu.calculate.movables,
          accelerator: 'CmdOrCtrl+N',
          click() {
            mainWindow.loadRelativeUrl('/mobilien-rechner');
          }
        },
      ],
    },
    {
      label: c.menu.edit.label,
      submenu: [
        {
          label: c.menu.edit.undo,
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: c.menu.edit.redo,
          accelerator: process.platform === 'darwin' ? 'Shift+CmdOrCtrl+Z' : 'Ctrl+Y',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: c.menu.edit.cut,
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: c.menu.edit.copy,
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: c.menu.edit.paste,
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: c.menu.edit.selectall,
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
      ]
    },
    /*
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (function() {
            if (process.platform === 'darwin')
              return 'Ctrl+Command+F';
            else
              return 'F11';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (function() {
            if (process.platform === 'darwin')
              return 'Alt+Command+I';
            else
              return 'Ctrl+Shift+I';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.toggleDevTools();
          }
        },
      ]
    },
    */
    {
      label: c.menu.window.label,
      role: 'window',
      submenu: [
        {
          label: c.menu.window.minimize,
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: c.menu.window.close,
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    /*
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: function() { shell.openExternal('http://electron.atom.io') }
        },
      ]
    },
    */
  ];

  if (process.platform === 'darwin') {
    const name = c.settings.appName;
    template.unshift({
      label: name,
      submenu: [
        {
          label: c.menu.app.about + ' ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        /*
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        */
        {
          label: name + ' ' + c.menu.app.hide,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: c.menu.app.hideothers,
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: c.menu.app.unhide,
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: c.menu.app.quit,
          accelerator: 'Command+Q',
          click: function() { app.quit(); }
        },
      ]
    });

    const windowMenu = template.find(function(menu) {return menu.role === 'window'});
    if (windowMenu) {
      windowMenu.submenu.push(
        {
          type: 'separator'
        },
        {
          label: c.menu.window.front,
          role: 'front'
        }
      );
    }
  } else {
    // not OSX
    template.unshift({
      label: c.menu.file.label,
      submenu: [
        {
          label: c.menu.app.quit,
          accelerator: 'Ctrl+Q',
          click: function() { app.quit(); }
        },
      ]
    });
  }

  // additional menu items for development
  if (process.env.NODE_ENV !== 'production') {
    template.push({
      label: 'Development',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'},
        {type: 'separator'},
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'},
      ]
    });
  }

  return template;
}

module.exports = menuTemplate;