var gulp = require("gulp");
var git = require("gulp-git");
var path = require("path");
var fs = require("fs");

function _getErrorMessage(e) {
    if (e[0] === undefined) {
        return e;
    }
    else {
        return e[0];
    }
}

function _fail(message, done) {
    console.log("fail");

    console.error(message);

    process.exit(1);
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

        generateReportFunc(reportFilePath, compareResultData).then(function () {
            console.log("done");

            done()
        }, function (e) {
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
    fail: function (message, done) {
        _fail(message, done);
    },
    deepCopyJson: function (json) {
        return _deepCopyJson(json);
    },
    getE2eConfigFilePath: function () {
        return path.join(process.cwd(), "test/e2e/config/e2eConfig.json");
    },
    testInCI: function (generateDataInfo, type, generateCorrectDataFunc, runTestFunc, done) {
        var configFilePath = test.getE2eConfigFilePath();

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
