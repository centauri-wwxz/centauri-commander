#!/usr/bin/env node
const program = require('commander');
const Proxy = require('../../lib/drop/proxy');
const detectInstalled = require('detect-installed');
const chalk = require('chalk');

program
    .allowUnknownOption()
    .option('-i --intercept', 'proxy https')
    .option('-p --port [value]', 'proxy port, 8001 for default')
    .option('-w, --web [value]', 'web GUI port, 8002 for default')
    .option('-I --ignore-unauthorized-ssl', 'ignore rootCA security')
    .parse(process.argv);

detectInstalled('anyproxy').then((exists) => {
    if (exists) {
        new Proxy()
    } else {
        console.log(`\ncommand not found: anyporxy\n\nPlease run ${chalk.yellow('npm install anyproxy -g')} first`);
        process.exit(0);
    }
})

    
process.on('SIGINT', () => {
    // 在添加了该事件（Ctrl+C）的监听之后，才能捕获到子进程对该事件做的操作返回
});