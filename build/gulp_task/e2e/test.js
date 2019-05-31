var gulp = require("gulp");
var path = require("path");
var fs = require("fs");
var exec = require("child_process").exec;

function _getErrorMessage(e) {
    if (e[0] === undefined) {
        return e;
    }
    else {
        return e[0];
    }
}

function _exit() {
    process.exit(1);
}

function _fail(message, done) {
    console.log("fail");

    console.error(message);

    _exit();
}

function _runTestInCI(runTestFunc, browserArr, done) {
    console.log("run test...");

    runTestFunc(browserArr).then(function (failList) {
        console.log("pass test");

        console.log("done");

        done()
    }, function (e) {
        var failMessage = _getErrorMessage(e);

        _fail(failMessage, done);
    })
}


function _runTestInLocal(reportFilePath, runTestFunc, generateReportFunc, browserArr, done) {
    console.log("run test...");

    runTestFunc(browserArr).then(function (compareResultData) {
        console.log("pass test");

        console.log("done");

        done()
    }, function (e) {
        var failMessage = _getErrorMessage(e);
        var compareResultData = e[1];

        console.log("fail");

        console.error(failMessage);

        console.log("generate report...");

        try {
            generateReportFunc(reportFilePath, compareResultData).then(function () {
                _exit();
            }, function (e) {
                _fail(e, done);
            })
        }
        catch (e) {
            _fail(e, done);
        }
    })
}


function _runBuild(cb) {

    console.log("build...");

    exec("npm run buildAll", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
        if (err) {
            throw err;
        }

        cb()
    });
}

function _deepCopyJson(json) {
    return JSON.parse(JSON.stringify(json));
}

function _writeGenerateBasedCommitIdToConfig(commitId, config, type, configFilePath) {
    console.log("_write generate based commitId...");
    var copiedConfig = _deepCopyJson(config);
    copiedConfig[type].last_generate_based_commit_id = commitId;
    fs.writeFileSync(configFilePath, JSON.stringify(copiedConfig));
}

function _restoreToCurrentCommid(e, currentCommitId, done) {
    var installWithPuppeteer = require("../install/installWithPuppeteer").installWithPuppeteer;
    var git = require("gulp-git");

    git.reset(currentCommitId, { args: '--hard' }, function (err) {
        if (!!err) {
            _fail(err, done);
            return;
        }

        // _runBuild(function () {
        //     _fail(e, done);
        // });
        installWithPuppeteer(() => {
            _fail(e, done);
        }, (err) => {
            _fail(err, done);
        });
    });
}

module.exports = {
    fail: function (message, done) {
        _fail(message, done);
    },
    deepCopyJson: function (json) {
        return _deepCopyJson(json);
    },
    getE2EConfigFilePath: function () {
        return path.join(process.cwd(), "test/e2e/config/e2eConfig.json");
    },
    testInCI: function (generateDataInfo, type, generateCorrectDataFunc, runTestFunc, done) {
        var git = require("gulp-git");
        var configFilePath = this.getE2EConfigFilePath();

        git.revParse({ args: "HEAD" }, function (err, commitId) {
            var currentCommitId = commitId;

            var config = JSON.parse(fs.readFileSync(configFilePath));
            var basedCommitId = config[type].base_commit_id;

            if (!!err) {
                _fail(err, done);
                return;
            }

            // if (basedCommitId === config[type].last_generate_based_commit_id) {
            //     _runBuild(function () {
            //         _runTestInCI(runTestFunc, [], done);
            //     });
            //     return
            // }

            console.log("reset hard to basedCommitId:", basedCommitId, "...");

            git.reset(basedCommitId, { args: '--hard' }, function (err) {
                if (!!err) {
                    _fail(err, done);
                    return;
                }

                _runBuild(function () {
                    console.log(generateDataInfo);

                    generateCorrectDataFunc().then(function (browser) {
                        console.log("reset hard to currentCommitId:", currentCommitId, "...");

                        git.reset(currentCommitId, { args: '--hard' }, function (err) {
                            if (!!err) {
                                _fail(err, done);

                                return;
                            }

                            // _writeGenerateBasedCommitIdToConfig(basedCommitId, config, type, configFilePath);


                            _runBuild(function () {
                                _runTestInCI(runTestFunc, [browser], done);
                            });
                        });
                    }, function (e) {
                        console.log("restore to origin commitId...");

                        _restoreToCurrentCommid(e, currentCommitId, done);
                    })
                });
            });
        });
    },
    testInLocal: function (generateDataInfo, reportFilePath, type, generateCorrectDataFunc, generateReportFunc, runTestFunc, done) {
        var git = require("gulp-git");
        var installWithPuppeteer = require("../install/installWithPuppeteer").installWithPuppeteer;

        var configFilePath = this.getE2EConfigFilePath();

        git.revParse({ args: "HEAD" }, function (err, commitId) {
            var currentCommitId = commitId;

            var config = JSON.parse(fs.readFileSync(configFilePath));
            var basedCommitId = config[type].base_commit_id;

            if (!!err) {
                _fail(err, done);
                return;
            }

            if (basedCommitId === config[type].last_generate_based_commit_id) {
                console.log("already generate data based on the same commit id, not generate again...");

                _runBuild(function () {
                    _runTestInLocal(reportFilePath, runTestFunc, generateReportFunc, [], done);
                });

                return
            }

            console.log("reset hard to basedCommitId:", basedCommitId, "...");

            git.reset(basedCommitId, { args: '--hard' }, function (err) {
                if (!!err) {
                    _fail(err, done);
                    return;
                }

                console.log("reinstall node_modules...");


                installWithPuppeteer(() => {
                    _runBuild(function () {
                        console.log(generateDataInfo);

                        generateCorrectDataFunc().then(function (browser) {
                            console.log("reset hard to currentCommitId:", currentCommitId, "...");

                            git.reset(currentCommitId, { args: '--hard' }, function (err) {
                                if (!!err) {
                                    _fail(err, done);

                                    return;
                                }

                                _writeGenerateBasedCommitIdToConfig(basedCommitId, config, type, configFilePath);


                                console.log("reinstall node_modules...");

                                installWithPuppeteer(() => {
                                    _runBuild(function () {
                                        _runTestInLocal(reportFilePath, runTestFunc, generateReportFunc, [browser], done);
                                    });
                                }, (err) => {
                                    _fail(err, done);
                                });
                            });
                        }, function (e) {
                            console.log("restore to origin commitId...");

                            _restoreToCurrentCommid(e, currentCommitId, done);
                        })
                    });
                }, (err) => {
                    _fail(err, done);
                })
            });
        });

    },


    fastTest: function (reportFilePath, generateReportFunc, runTestFunc, done) {
        _runTestInLocal(reportFilePath, runTestFunc, generateReportFunc, [], done);
    }


}
