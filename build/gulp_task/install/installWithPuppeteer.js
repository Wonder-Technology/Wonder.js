var gulp = require("gulp");
var path = require("path");
var fs = require("fs");
var exec = require("child_process").exec;

function _installWithPuppeteer(handleSuccessFunc, handleErrorFunc) {
    var packageFilePath = path.join(process.cwd(), "./package.json");

    console.log("remove puppeteer in package.json...");



    var packageContent = JSON.parse(fs.readFileSync(packageFilePath));

    delete packageContent.devDependencies.puppeteer;



    fs.writeFileSync(packageFilePath,
        JSON.stringify(packageContent, null, "\t")
    );



    console.log("reinstall node_modules without puppeteer...");





    exec("sudo rm -rf node_modules/ yarn.lock && sudo yarn install", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
        if (err) {
            handleErrorFunc(err);
            return;
        }

        console.log("sudo cp -rf ../Wonder-Benchmark/node_modules/puppeteer ./node_modules/puppeteer");

        exec("sudo cp -rf ../Wonder-Benchmark/node_modules/puppeteer ./node_modules/puppeteer", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
            if (err) {
                handleErrorFunc(err);
                return;
            }


            console.log("sudo install in puppeteer...");



            exec("sudo cyarn install", { cwd: path.join(process.cwd(), "node_modules/puppeteer"), maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
                if (err) {
                    handleErrorFunc(err);
                    return;
                }

                console.log("restore package.json");


                packageContent.devDependencies.puppeteer = "^1.12.2";



                fs.writeFileSync(packageFilePath,
                    JSON.stringify(packageContent, null, "\t")
                );

                handleSuccessFunc();
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
