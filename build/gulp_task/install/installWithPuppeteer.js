var gulp = require("gulp");
var exec = require("child_process").exec;

function _installWithPuppeteer(handleSuccessFunc, handleErrorFunc) {
    console.log("reinstall node_modules...");

    exec("sudo npm config set puppeteer_download_host=https://npm.taobao.org/mirrors && sudo rm -rf node_modules/ yarn.lock && sudo yarn install", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
        if (err) {
            handleErrorFunc(err);
            return;
        }

        handleSuccessFunc();
    });

}

gulp.task("installWithPuppeteer", function (done) {
    _installWithPuppeteer(() => done(), (err) => { throw err });
});

module.exports = {
    installWithPuppeteer: _installWithPuppeteer
}
