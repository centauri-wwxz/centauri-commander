const program = require('commander');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

class Proxy {
    constructor() {
        let pkgs = program.args;
        this.init();
    }

    init() {
        if (program.intercept) {
            this._intercept();
            return false;
        }
        if (program.ignoreUnauthorizedSsl) {
            this._ignoreUnauthorizedSsl();
            return false;
        }
        this._defalut()
    }

    _defalut() {
        const child = exec('anyproxy');
        // console.log(child);
        console.log('anyProxy for http starting...');
        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
    }

    _intercept() {
        const child = exec('anyproxy --intercept', (err, stdout, stderr) => {
            if (err) {
              console.error(`exec error: ${err}`);
              return;
            }
          
            console.log(`Number of files ${stdout}`);
          });
        console.log('anyProxy for https starting...');
        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
        child.stdout.on('close', (data) => {
            console.log(`close: \n${data}`);
        });
        child.stdout.on('exit', (data) => {
            console.log(`exit: \n${data}`);
        });
        child.stdout.on('disconnect', (data) => {
            console.log(`disconnect: \n${data}`);
        });
    }

    _ignoreUnauthorizedSsl() {
        const child = exec('anyproxy -i --ignore-unauthorized-ssl');
        console.log('anyProxy for https starting, ignore rootCa security...');
        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
    }
}

module.exports = Proxy