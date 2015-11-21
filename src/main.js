var app = require('app');
var BrowserWindow = require('browser-window');
const shell = require('shell');

var mainWindow = null;

app.on('window-all-closed', function() {
  // Stay active until the user quits explicitly with Cmd + Q on OS X 
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  app.setName('Lights Out');
  
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600, 
    title: 'Lights Out',
    icon: __dirname + '/../assets/icon.png'
  });
  mainWindow.loadUrl('file://' + __dirname + '/../app/index.html');

  var Menu = require('menu');
	menu = Menu.buildFromTemplate(menuTemplate());
	Menu.setApplicationMenu(menu);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

// menuTemplate returns the template for the main menu.
// Contains some OSX specific code, so it's not just a object.
var menuTemplate = function() {
	var template = [
		{
			label: 'File',
			submenu: [
        {
          label: 'New Game',
          accelerator: 'CmdOrCtrl+N',
					click: function(item, focusedWindow) {
						if (focusedWindow) {
							focusedWindow.reload();
            }
					}
        },
        {
					type: 'separator'
        },
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: function() { app.quit(); }
				},
      ]
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Toggle Full Screen',
					accelerator: (function() {
						if (process.platform == 'darwin')
							return 'Ctrl+Command+F';
						else
							return 'F11';
					})(),
					click: function(item, focusedWindow) {
						if (focusedWindow)
							focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
					}
				},
			]
		},
		{
			label: 'Window',
			role: 'window',
			submenu: [
				{
					label: 'Minimize',
					accelerator: 'CmdOrCtrl+M',
					role: 'minimize'
				},
				{
					label: 'Close',
					accelerator: 'CmdOrCtrl+W',
					role: 'close'
				},
			]
		},
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
	];

	if (process.platform == 'darwin') {
		var name = app.getName();
		template.unshift({
			label: name,
			submenu: [
				{
					label: 'About ' + name,
					role: 'about'
				},
				{
					type: 'separator'
				},
				{
					label: 'Services',
					role: 'services',
					submenu: []
				},
				{
					type: 'separator'
				},
				{
					label: 'Hide ' + name,
					accelerator: 'Command+H',
					role: 'hide'
				},
				{
					label: 'Hide Others',
					accelerator: 'Command+Shift+H',
					role: 'hideothers'
				},
				{
					label: 'Show All',
					role: 'unhide'
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: function() { app.quit(); }
				},
			]
		});
		// Window menu.
		template[3].submenu.push(
			{
				type: 'separator'
			},
			{
				label: 'Bring All to Front',
				role: 'front'
			}
		);
	};

  return template;
};
