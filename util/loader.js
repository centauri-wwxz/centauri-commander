const path = require('path');
const fs = require('fs');
const logger = require('tracer').colorConsole();

module.exports = (program, option) => {

    const opts = option || {};
    opts.name = option.name;
    opts.path = option.path;
    

    function filtRequire(filepath) {
        if (typeof filepath === 'string') {

            const f = require(filepath);
            if (typeof f === 'function') {
                f(program);
            }
        }

        return program;
    }

    // Load tasks in a given folder.
    function _loadCmds(dirpath) {
        if (fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory()) {
            // logger.info(`Loading commands from /cmds/${opts.name}`);
            console.log(`Loading commands from /cmds/${opts.name}...`);
            fs.readdirSync(dirpath).forEach(function(filename) {
                const filepath = path.join(dirpath, filename);
                filtRequire(filepath);
            });
        } else {
            logger.warn('Directory not found ' + dirpath);
        }

        return program;
    }

    if (opts.path) {
        _loadCmds(opts.path);

        const _lib = path.join(opts.path, `../${opts.name}.js`);

        if (fs.existsSync(_lib)) {
            filtRequire(_lib);
        }
    }
};
