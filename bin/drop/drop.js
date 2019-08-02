#!/usr/bin/env node

const program = require('commander');
const packageInfo = require('../../package.json');

console.log(packageInfo.name, packageInfo.version);

program
    .version(packageInfo.version)
    .command('proxy', '快捷启动anyProxy抓包工具').alias('p')
    .parse(process.argv);
