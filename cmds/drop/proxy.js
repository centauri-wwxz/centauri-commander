module.exports = program => {
    program
        .command('proxy')
        .description('快捷启动anyProxy抓包工具')
        // .allowUnknownOption()
        // .option('-I --intercept', 'proxy https')
        // .option('-i --ignore-unauthorized-ssl', 'ignore rootCA security')
        .action(() => {
            console.log('123');
            console.log(this.arguments);
        });

};
