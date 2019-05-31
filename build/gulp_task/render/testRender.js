var gulp = require("gulp");
var path = require("path");
var gulp = require("gulp");
var test = require("../e2e/test");
var exec = require("child_process").exec;
var fs = require("fs");

gulp.task("testRenderInCI", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    test.testInCI("generate correct image...", "render", testRender.generateCorrectImage, testRender.runTest, done);
});

function _getCorrectDir() {
    return "./test/e2e/render/screenshot/correct/"
};

function _getTempDir() {
    return "./_temp/"
};

function _writeCorrectImageToTempDir(handleSuccessFunc, handleFailFunc) {
    exec("sudo rm -rf " + _getTempDir() + " && sudo mkdir " + _getTempDir() + " && sudo cp -rf " + _getCorrectDir() + " " + _getTempDir(), { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
        if (err) {
            handleFailFunc(err);
            return;
        }

        handleSuccessFunc();
    });

};

function _updateCorrectImageFromTempDir(handleSuccessFunc, handleFailFunc) {
    exec("sudo rm -rf " + _getCorrectDir() + " && sudo mkdir " + _getCorrectDir() + " && sudo cp -rf " + _getTempDir() + " " + _getCorrectDir() + " && sudo rm -rf " + _getTempDir(), { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
        if (err) {
            handleFailFunc(err);
            return;
        }

        handleSuccessFunc();
    });
};

function _generateCorrectImage(generateCorrectDataFunc, done) {
    var git = require("gulp-git");
    var installWithPuppeteer = require("../install/installWithPuppeteer").installWithPuppeteer;

    var configFilePath = test.getE2EConfigFilePath();



    git.revParse({ args: "HEAD" }, function (err, commitId) {
        var currentCommitId = commitId;

        var config = JSON.parse(fs.readFileSync(configFilePath));
        var basedCommitId = config["render"].base_commit_id;

        if (!!err) {
            test.fail(err, done);
            return;
        }



        console.log("reset hard to basedCommitId:", basedCommitId, "...");

        git.reset(basedCommitId, { args: '--hard' }, function (err) {
            if (!!err) {
                test.fail(err, done);
                return;
            }

            installWithPuppeteer(() => {
                test.runBuild(function () {
                    console.log("generate correct image...");

                    generateCorrectDataFunc().then(function (browser) {
                        console.log("write correct image to temp dir");
                        _writeCorrectImageToTempDir(() => {
                            console.log("reset hard to currentCommitId:", currentCommitId, "...");

                            git.reset(currentCommitId, { args: '--hard' }, function (err) {
                                if (!!err) {
                                    test.fail(err, done);

                                    return;
                                }


                                installWithPuppeteer(() => {
                                    console.log("update correct image from temp dir");

                                    _updateCorrectImageFromTempDir(() => {
                                        console.log("finish");

                                        done();
                                    }, (err) => {
                                        test.fail(err, done);
                                    });
                                }, (err) => {
                                    test.fail(err, done);
                                });

                            });
                        }, (err) => {
                            test.fail(err, done);
                        });
                    }, function (e) {
                        console.log("restore to origin commitId...");

                        test.restoreToCurrentCommid(e, currentCommitId, done);
                    })
                });
            }, (err) => {
                console.log("restore to origin commitId...");

                test.restoreToCurrentCommid(e, currentCommitId, done);

            })
        });
    });
}

gulp.task("testRenderInLocal", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/render/report/report.html");

    test.testInLocal("generate correct image...", reportFilePath, "render", testRender.generateCorrectImage, testRender.generateReport, testRender.runTest, done);
});


gulp.task("generateCorrectImage", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    _generateCorrectImage(testRender.generateCorrectImage, done)
});




gulp.task("testFastRender", function (done) {
    var testRender = require(path.join(process.cwd(), "lib/js/test/e2e/render/TestRender.js"));

    var reportFilePath = path.join(process.cwd(), "./test/e2e/render/report/report.html");

    test.fastTest(reportFilePath, testRender.generateReport, testRender.runTest, done);
});
