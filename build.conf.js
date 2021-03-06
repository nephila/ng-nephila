var fs = require('fs');
var pkg = require('./package.json');

module.exports = {
  banner: '/*!\n' +
    ' * ngNephila\n' +
    ' * v' + pkg.version +'\n' +
    ' * Copyright 2015 Nephila http://nephila.it/\n' +
    ' * See LICENSE in this repository for license information\n' +
    ' */\n',

  closureStart: '(function(){\n',
  closureEnd: '\n})();',

  dist: 'dist',
  demo : {
    ngNephila : 'demo/lib/ngNephila/dist',
    lib : 'demo/lib',
    www : 'demo'
  },

  templateFiles: [
    'template/**/*.html',
  ],

  pluginFiles: [
    'src/module.js',
    'src/filters/*.js',
    'src/services/*.js',
    'src/components/*.js',
    'template/**/*.html.js'
  ],

  versionData: {
    version: pkg.version
  }
};
