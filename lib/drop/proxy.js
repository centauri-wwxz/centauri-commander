const program = require('commander');
const open = require('open');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

class Proxy {
    constructor() {
        let pkgs = program.args;
        this.init();
    }

    init() {
        let finalExec = this.getExec();
        this.exec(finalExec)
    }

    getExec() {
        /**
         * @description: get full command
         * @return: final command for anyProxy shell
         */
        let exec = 'anyproxy';
        if (program.intercept) {
            exec = exec + ' --intercept';
        }
        if (program.ignoreUnauthorizedSsl) {
            exec = exec + ' --ignore-unauthorized-ssl';
        }
        if (program.port) {
            exec = exec + ` --port ${program.port || 8001}`;
        }
        if (program.web) {
            exec = exec + ` --web ${program.web}`;
        }
        return exec;
    }

    async exec(finalExec) {
        /**
         * @description: exec anyProxy shell
         * @param {string} finalExec the full command for anyProxy shell
         */
        const child = exec(finalExec, (err) => {
            if (err) {
                console.log(err);
            }
        });
        console.log('anyProxy for http starting...');
        child.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
        await open(`http://localhost:${program.web || 8002}`);
    }
}

module.exports = Proxy