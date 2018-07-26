'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var JobAPI$Wonderjs = require("../../../../src/api/JobAPI.js");
var TestTool$Wonderjs = require("../../../tool/TestTool.js");
var ArrayService$Wonderjs = require("../../../../src/service/atom/ArrayService.js");
var DirectorTool$Wonderjs = require("../../../tool/core/DirectorTool.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var NoWorkerJobTool$Wonderjs = require("../../../tool/service/job/no_worker/NoWorkerJobTool.js");
var TimeControllerTool$Wonderjs = require("../../../tool/service/timeController/TimeControllerTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var TimeControllerService$Wonderjs = require("../../../../src/service/record/main/timeController/TimeControllerService.js");
var NoWorkerJobHandleSystem$Wonderjs = require("../../../../src/job/no_worker/NoWorkerJobHandleSystem.js");
var InitBasicMaterialJobTool$Wonderjs = require("../../../tool/job/no_worker/init/InitBasicMaterialJobTool.js");

describe("operate custom no worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"start_time\"\n        }\n      ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"tick\"\n        }\n      ]\n    }\n  ]\n        ", "\n[\n\n    {\n        \"name\": \"start_time\"\n    }\n]\n        ", "\n[\n\n    {\n        \"name\": \"tick\"\n    }\n]\n        ", /* () */0), undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test operate noWorker init job", (function () {
                var _prepare = function (state) {
                  var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                  return NoWorkerJobTool$Wonderjs.init(/* tuple */[
                              NoWorkerJobHandleSystem$Wonderjs.createInitJobHandleMap,
                              NoWorkerJobHandleSystem$Wonderjs.createLoopJobHandleMap
                            ], match[0]);
                };
                describe("addNoWorkerInitJob", (function () {
                        describe("add job to noWorker init pipeline", (function () {
                                beforeEach((function () {
                                        state[0] = DirectorTool$Wonderjs.prepare(state[0]);
                                        return /* () */0;
                                      }));
                                describe("test add job after target job", (function () {
                                        return Wonder_jest.test("test add two job", (function () {
                                                      var state$1 = _prepare(state);
                                                      var customData = /* array */[];
                                                      var state$2 = JobAPI$Wonderjs.addNoWorkerInitJob(/* tuple */[
                                                            "customJob2",
                                                            "customJob1"
                                                          ], /* AFTER */1, (function (state) {
                                                              ArrayService$Wonderjs.push(2, customData);
                                                              return state;
                                                            }), JobAPI$Wonderjs.addNoWorkerInitJob(/* tuple */[
                                                                "customJob1",
                                                                "start_time"
                                                              ], /* AFTER */1, (function (state) {
                                                                  ArrayService$Wonderjs.push(1, customData);
                                                                  return state;
                                                                }), state$1));
                                                      NoWorkerJobTool$Wonderjs.execInitJobs(state$2);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                  1,
                                                                  2
                                                                ]);
                                                    }));
                                      }));
                                return Wonder_jest.test("test add job before target job", (function () {
                                              var state$1 = _prepare(state);
                                              var customData = /* array */[];
                                              var state$2 = JobAPI$Wonderjs.addNoWorkerInitJob(/* tuple */[
                                                    "customJob2",
                                                    "start_time"
                                                  ], /* AFTER */1, (function (state) {
                                                      ArrayService$Wonderjs.push(2, customData);
                                                      return state;
                                                    }), JobAPI$Wonderjs.addNoWorkerInitJob(/* tuple */[
                                                        "customJob1",
                                                        "create_canvas"
                                                      ], /* BEFORE */0, (function (state) {
                                                          ArrayService$Wonderjs.push(1, customData);
                                                          return state;
                                                        }), state$1));
                                              NoWorkerJobTool$Wonderjs.execInitJobs(state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                          1,
                                                          2
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("removeNoWorkerInitJob", (function () {
                        Wonder_jest.test("test remove custom added job", (function () {
                                var state$1 = _prepare(state);
                                var customData = /* array */[];
                                var state$2 = JobAPI$Wonderjs.removeNoWorkerInitJob("customJob", JobAPI$Wonderjs.addNoWorkerInitJob(/* tuple */[
                                          "customJob",
                                          "start_time"
                                        ], /* AFTER */1, (function (state) {
                                            ArrayService$Wonderjs.push(1, customData);
                                            return state;
                                          }), state$1));
                                NoWorkerJobTool$Wonderjs.execInitJobs(state$2);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[]);
                              }));
                        return Wonder_jest.test("test remove default job", (function () {
                                      var state$1 = _prepare(state);
                                      var state$2 = JobAPI$Wonderjs.removeNoWorkerInitJob("start_time", state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](NoWorkerJobTool$Wonderjs.isJobExistInJobList("start_time", NoWorkerJobTool$Wonderjs.getNoWorkerInitJobList(state$2))), false);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test operate noWorker loop job", (function () {
                var _prepare = function (state) {
                  var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                  return NoWorkerJobTool$Wonderjs.init(/* tuple */[
                              NoWorkerJobHandleSystem$Wonderjs.createInitJobHandleMap,
                              NoWorkerJobHandleSystem$Wonderjs.createLoopJobHandleMap
                            ], match[0]);
                };
                describe("addNoWorkerLoopJob", (function () {
                        describe("add job to noWorker loop pipeline", (function () {
                                describe("test add job after target job", (function () {
                                        return Wonder_jest.test("test add one job", (function () {
                                                      var state$1 = _prepare(state);
                                                      var customData = /* array */[];
                                                      var state$2 = JobAPI$Wonderjs.addNoWorkerLoopJob(/* tuple */[
                                                            "customJob",
                                                            "tick"
                                                          ], /* AFTER */1, (function (state) {
                                                              ArrayService$Wonderjs.push(TimeControllerService$Wonderjs.getElapsed(state[/* timeControllerRecord */33]), customData);
                                                              return state;
                                                            }), state$1);
                                                      NoWorkerJobTool$Wonderjs.execLoopJobs(TimeControllerTool$Wonderjs.setElapsed(100.1, state$2));
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[100.1]);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("removeNoWorkerLoopJob", (function () {
                        return Wonder_jest.test("test remove custom added job", (function () {
                                      var state$1 = _prepare(state);
                                      var customData = /* array */[];
                                      var state$2 = JobAPI$Wonderjs.removeNoWorkerLoopJob("customJob", JobAPI$Wonderjs.addNoWorkerLoopJob(/* tuple */[
                                                "customJob",
                                                "tick"
                                              ], /* AFTER */1, (function (state) {
                                                  ArrayService$Wonderjs.push(TimeControllerService$Wonderjs.getElapsed(state[/* timeControllerRecord */33]), customData);
                                                  return state;
                                                }), state$1));
                                      NoWorkerJobTool$Wonderjs.execLoopJobs(TimeControllerTool$Wonderjs.setElapsed(100.1, state$2));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
