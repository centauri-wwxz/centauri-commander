#!/usr/bin/env node
const program = require('commander');
const Proxy = require('../../lib/drop/proxy');

program
    .allowUnknownOption()
    .option('-i --intercept', 'proxy https')
    .option('-I --ignore-unauthorized-ssl', 'ignore rootCA security')
    .parse(process.argv);

new Proxy()