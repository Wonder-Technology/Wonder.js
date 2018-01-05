var gulp = require("gulp");
var git = require("gulp-git");
var path = require("path");
var fs = require("fs");


function _runTest(runTestFunc, browserArr, done) {
    console.log("run test...");

    runTestFunc(browserArr).then(function (failList) {
        console.log("done");
        done()
    }, function (e) {
        console.log("fail");
        console.error(e);
        done();
    })
}


function _runTestInLocal(reportFilePath, runTestFunc, generateReportFunc, browserArr, done) {
    console.log("run test...");

    runTestFunc(browserArr).then(function (failList) {
        console.log("generate report...");

        generateReportFunc(reportFilePath, failList).then(function () {
            console.log("done");
            done()
        }, function (e) {
            console.error(e);
            done();
        })
    }, function (e) {
        console.log("fail");
        console.error(e);
        done();
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

function _restoreToCurrentCommid(currentCommitId, done) {
    git.reset(currentCommitId, { args: '--hard' }, function (err) {
        if (!!err) {
            console.error(err);
            done();
            return;
        }

        console.log("build...");

        _runBuild(function () {
            done()
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
                console.error(err);
                done();
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
                    console.error(err);
                    done();
                    return;
                }

                _runBuild(function () {
                    console.log(generateDataInfo);

                    generateCorrectDataFunc().then(function (browser) {
                        console.log("reset hard to currentCommitId:", currentCommitId, "...");

                        git.reset(currentCommitId, { args: '--hard' }, function (err) {
                            if (!!err) {
                                console.error(err);

                                return;
                            }

                            // _writeGenerateBasedCommitIdToConfig(basedCommitId, config, type, configFilePath);


                            _runBuild(function () {
                                _runTest(runTestFunc, [browser], done);
                            });
                        });
                    }, function (e) {
                        console.error(e);

                        console.log("restore to origin commitId...");

                        _restoreToCurrentCommid(currentCommitId, done);
                    })
                });
            });
        });

    },
    testInLocal: function (generateDataInfo, reportFilePath, type, generateCorrectDataFunc, generateReportFunc, runTestFunc, reportFilePath, done) {
        var configFilePath = path.join(process.cwd(), "test/e2e/config/e2eConfig.json");

        git.revParse({ args: "HEAD" }, function (err, commitId) {
            var currentCommitId = commitId;

            var config = JSON.parse(fs.readFileSync(configFilePath));
            var basedCommitId = config[type].base_commit_id;

            if (!!err) {
                console.error(err);
                done();
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
                    console.error(err);
                    done();
                    return;
                }

                _runBuild(function () {
                    console.log(generateDataInfo);

                    generateCorrectDataFunc().then(function (browser) {
                        console.log("reset hard to currentCommitId:", currentCommitId, "...");

                        git.reset(currentCommitId, { args: '--hard' }, function (err) {
                            if (!!err) {
                                console.error(err);

                                return;
                            }

                            _writeGenerateBasedCommitIdToConfig(basedCommitId, config, type, configFilePath);

                            _runBuild(function () {
                                _runTestInLocal(reportFilePath, runTestFunc, generateReportFunc, [browser], done);
                            });
                        });
                    }, function (e) {
                        console.error(e);

                        console.log("restore to origin commitId...");

                        _restoreToCurrentCommid(currentCommitId, done);
                    })
                });
            });
        });

    }
}
