var gulp = require("gulp");
var git = require("gulp-git");
var path = require("path");
var fs = require("fs");

function _fail(message, done) {
    throw message
}

function _runTest(runTestFunc, browserArr, done) {
    console.log("run test...");

    runTestFunc(browserArr).then(function (failList) {
        console.log("pass test");

        console.log("done");

        done()
    }, function (e) {
        console.log("fail");
        _fail(e, done);
    })
}


function _runTestInLocal(reportFilePath, runTestFunc, generateReportFunc, browserArr, done) {
    console.log("run test...");

    runTestFunc(browserArr).then(function (compareResultData) {
        console.log("pass test");

        console.log("done");

        done()
    }, function (e) {
        var failMessage = e[0];
        var compareResultData = e[1];

        console.log("fail");
        console.log(e);
        console.error(failMessage);


        console.log("generate report...");

        generateReportFunc(reportFilePath, compareResultData).then(function () {
            console.log("done");

            done()
        }, function (e) {
            console.log("fail");
            _fail(e, done);
        })
    })
}


function _runBuild(cb) {
    var exec = require("child_process").exec;

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
    git.reset(currentCommitId, { args: '--hard' }, function (err) {
        if (!!err) {
            _fail(err, done);
            return;
        }

        _runBuild(function () {
            _fail(e, done);
        });
    });
}

module.exports = {
    testInCI: function (generateDataInfo, type, generateCorrectDataFunc, runTestFunc, done) {
        var configFilePath = path.join(process.cwd(), "test/e2e/config/e2eConfig.json");

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
            //         _runTest(runTestFunc, [], done);
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
                                _runTest(runTestFunc, [browser], done);
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
        var configFilePath = path.join(process.cwd(), "test/e2e/config/e2eConfig.json");

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

                            _runBuild(function () {
                                _runTestInLocal(reportFilePath, runTestFunc, generateReportFunc, [browser], done);
                            });
                        });
                    }, function (e) {
                        console.log("restore to origin commitId...");

                        _restoreToCurrentCommid(e, currentCommitId, done);
                    })
                });
            });
        });

    }
}
