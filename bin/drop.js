#!/usr/bin/env node

const program = require('commander');
const packageInfo = require('../package.json');
const path = require('path');

(() => {
    console.log(packageInfo.name, packageInfo.version);

    require('../util/loader')(program, {
        path: path.join(process.mainModule.filename, '../../cmds/drop'),
        name: 'drop',
    })
})();
