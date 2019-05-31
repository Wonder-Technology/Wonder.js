var gulp = require("gulp");
var path = require("path");
var fs = require("fs");
var exec = require("child_process").exec;

function _installWithPuppeteer(handleSuccessFunc, handleErrorFunc) {
    var packageFilePath = path.join(process.cwd(), "./package.json");



    console.log("specific puppeteer version in package.json...");

    var packageContent = JSON.parse(fs.readFileSync(packageFilePath));

    var originPuppeteer = packageContent.devDependencies.puppeteer;



    packageContent.devDependencies.puppeteer = "1.17.0";



    fs.writeFileSync(packageFilePath,
        JSON.stringify(packageContent, null, "\t")
    );



    console.log("reinstall node_modules without download puppeteer->chrome...");




    exec("sudo rm -rf node_modules/ yarn.lock && sudo env PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn install", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
        if (err) {
            handleErrorFunc(err);
            return;
        }


        console.log("copy downloaded chrome");

        exec("sudo mkdir ./node_modules/puppeteer/.local-chromum && sudo mkdir ./node_modules/puppeteer/.local-chromum/mac-662092 && sudo mkdir ./node_modules/puppeteer/.local-chromum/mac-662092/chrome-mac", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
            if (err) {
                handleErrorFunc(err);
                return;
            }


            exec("sudo cp -rf ../File/chrome-mac/ ./node_modules/puppeteer/.local-chromum/mac-662092/chrome-mac", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
                if (err) {
                    handleErrorFunc(err);
                    return;
                }


                console.log("make ~/.bash_profile work(already have set process.env.PUPPETEER_EXECUTABLE_PATH in it)");


                exec("source ~/.bash_profile", { cwd: __dirname }, function (err, stdout, stderr) {

                    console.log("restore puppeteer version package.json");


                    packageContent.devDependencies.puppeteer = originPuppeteer;



                    fs.writeFileSync(packageFilePath,
                        JSON.stringify(packageContent, null, "\t")
                    );

                    handleSuccessFunc();
                });



            });
        });

    });

}

gulp.task("installWithPuppeteer", function (done) {
    _installWithPuppeteer(() => done(), (err) => { throw err });
});

module.exports = {
    installWithPuppeteer: _installWithPuppeteer
}
