'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var JobAPI$Wonderjs = require("../../../../src/api/job/JobAPI.js");
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

Wonder_jest.describe("operate custom no worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test register job", (function (param) {
                Wonder_jest.describe("registerNoWorkerInitJob", (function (param) {
                        beforeEach((function () {
                                state[0] = TestTool$Wonderjs.createWithJobConfig(sandbox, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"registerd\"\n        },\n        {\n          \"name\": \"start_time\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n        \"name\": \"registerd\"\n    },\n    {\n        \"name\": \"start_time\"\n    }\n]\n        ", undefined, /* () */0), undefined, /* () */0);
                                state[0] = DirectorTool$Wonderjs.prepare(state[0]);
                                return /* () */0;
                              }));
                        return Wonder_jest.describe("add job which defined in init pipeline", (function (param) {
                                      Wonder_jest.describe("if the job is none(not register)", (function (param) {
                                              Wonder_jest.test("warn", (function (param) {
                                                      var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                      DirectorTool$Wonderjs.init(state[0]);
                                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](warn));
                                                    }));
                                              return Wonder_jest.test("exec the next job ", (function (param) {
                                                            var customData = /* array */[];
                                                            var state$1 = JobAPI$Wonderjs.registerNoWorkerInitJob("start_time", (function (param, state) {
                                                                    ArrayService$Wonderjs.push(1, customData);
                                                                    return state;
                                                                  }), state[0]);
                                                            DirectorTool$Wonderjs.init(state$1);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[1]);
                                                          }));
                                            }));
                                      Wonder_jest.test("should register before init", (function (param) {
                                              var customData = /* array */[];
                                              var state$1 = JobAPI$Wonderjs.registerNoWorkerInitJob("registerd", (function (param, state) {
                                                      ArrayService$Wonderjs.push(1, customData);
                                                      return state;
                                                    }), state[0]);
                                              DirectorTool$Wonderjs.init(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[1]);
                                            }));
                                      return Wonder_jest.test("can register job to replace default job", (function (param) {
                                                    var customData = /* array */[];
                                                    var state$1 = JobAPI$Wonderjs.registerNoWorkerInitJob("registerd", (function (param, state) {
                                                            ArrayService$Wonderjs.push(2, customData);
                                                            return state;
                                                          }), state[0]);
                                                    var state$2 = JobAPI$Wonderjs.registerNoWorkerInitJob("start_time", (function (param, state) {
                                                            ArrayService$Wonderjs.push(3, customData);
                                                            return state;
                                                          }), state$1);
                                                    DirectorTool$Wonderjs.init(state$2);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                2,
                                                                3
                                                              ]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("registerNoWorkerLoopJob", (function (param) {
                              beforeEach((function () {
                                      state[0] = TestTool$Wonderjs.createWithJobConfig(sandbox, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n      ]\n    }\n  ]\n        ", "\n                             [\n                         {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                             {\n                               \"name\": \"tick\"\n                             },\n        {\n          \"name\": \"registerd\"\n        }\n                           ]\n                         }\n                       ]\n                             ", "\n[\n]\n        ", "\n                     [\n\n                         {\n                             \"name\": \"tick\"\n                         },\n        {\n          \"name\": \"registerd\"\n        }\n                     ]\n                             ", /* () */0), undefined, /* () */0);
                                      state[0] = DirectorTool$Wonderjs.prepare(state[0]);
                                      return /* () */0;
                                    }));
                              return Wonder_jest.describe("add job which defined in loop pipeline", (function (param) {
                                            Wonder_jest.describe("if the job is none(not register)", (function (param) {
                                                    Wonder_jest.test("warn", (function (param) {
                                                            var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                            var state$1 = DirectorTool$Wonderjs.init(state[0]);
                                                            DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](warn));
                                                          }));
                                                    return Wonder_jest.test("exec the next job ", (function (param) {
                                                                  var customData = /* array */[];
                                                                  var state$1 = JobAPI$Wonderjs.registerNoWorkerLoopJob("tick", (function (param, state) {
                                                                          ArrayService$Wonderjs.push(1, customData);
                                                                          return state;
                                                                        }), state[0]);
                                                                  var state$2 = DirectorTool$Wonderjs.init(state$1);
                                                                  DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[1]);
                                                                }));
                                                  }));
                                            Wonder_jest.test("should register before init", (function (param) {
                                                    var customData = /* array */[];
                                                    var state$1 = JobAPI$Wonderjs.registerNoWorkerLoopJob("registerd", (function (param, state) {
                                                            ArrayService$Wonderjs.push(2, customData);
                                                            return state;
                                                          }), state[0]);
                                                    var state$2 = DirectorTool$Wonderjs.init(state$1);
                                                    DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[2]);
                                                  }));
                                            return Wonder_jest.test("can register job to replace default job", (function (param) {
                                                          var customData = /* array */[];
                                                          var state$1 = JobAPI$Wonderjs.registerNoWorkerLoopJob("registerd", (function (param, state) {
                                                                  ArrayService$Wonderjs.push(2, customData);
                                                                  return state;
                                                                }), state[0]);
                                                          var state$2 = JobAPI$Wonderjs.registerNoWorkerLoopJob("tick", (function (param, state) {
                                                                  ArrayService$Wonderjs.push(1, customData);
                                                                  return state;
                                                                }), state$1);
                                                          var state$3 = DirectorTool$Wonderjs.init(state$2);
                                                          DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                      1,
                                                                      2
                                                                    ]);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test operate job", (function (param) {
                      var _prepare = function (state) {
                        var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                        return NoWorkerJobTool$Wonderjs.init(/* tuple */[
                                    NoWorkerJobHandleSystem$Wonderjs.createInitJobHandleMap,
                                    NoWorkerJobHandleSystem$Wonderjs.createLoopJobHandleMap
                                  ], match[0]);
                      };
                      beforeEach((function () {
                              state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"start_time\"\n        }\n      ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"tick\"\n        }\n      ]\n    }\n  ]\n        ", "\n[\n\n    {\n        \"name\": \"start_time\"\n    }\n]\n        ", "\n[\n\n    {\n        \"name\": \"tick\"\n    }\n]\n        ", /* () */0), undefined, undefined, /* () */0);
                              return /* () */0;
                            }));
                      return Wonder_jest.describe("should operate after init", (function (param) {
                                    Wonder_jest.describe("test operate noWorker init job", (function (param) {
                                            Wonder_jest.describe("addNoWorkerInitJob", (function (param) {
                                                    return Wonder_jest.describe("add job to noWorker init pipeline", (function (param) {
                                                                  beforeEach((function () {
                                                                          state[0] = DirectorTool$Wonderjs.prepare(state[0]);
                                                                          return /* () */0;
                                                                        }));
                                                                  Wonder_jest.describe("test add job after target job", (function (param) {
                                                                          return Wonder_jest.test("test add two job", (function (param) {
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
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                                                    1,
                                                                                                    2
                                                                                                  ]);
                                                                                      }));
                                                                        }));
                                                                  return Wonder_jest.test("test add job before target job", (function (param) {
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
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[
                                                                                            1,
                                                                                            2
                                                                                          ]);
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("removeNoWorkerInitJob", (function (param) {
                                                          Wonder_jest.test("test remove custom added job", (function (param) {
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
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[]);
                                                                }));
                                                          return Wonder_jest.test("test remove default job", (function (param) {
                                                                        var state$1 = _prepare(state);
                                                                        var state$2 = JobAPI$Wonderjs.removeNoWorkerInitJob("start_time", state$1);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](NoWorkerJobTool$Wonderjs.isJobExistInJobList("start_time", NoWorkerJobTool$Wonderjs.getNoWorkerInitJobList(state$2))), false);
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test operate noWorker loop job", (function (param) {
                                                  var _prepare = function (state) {
                                                    var match = InitBasicMaterialJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                    return NoWorkerJobTool$Wonderjs.init(/* tuple */[
                                                                NoWorkerJobHandleSystem$Wonderjs.createInitJobHandleMap,
                                                                NoWorkerJobHandleSystem$Wonderjs.createLoopJobHandleMap
                                                              ], match[0]);
                                                  };
                                                  Wonder_jest.describe("addNoWorkerLoopJob", (function (param) {
                                                          return Wonder_jest.describe("add job to noWorker loop pipeline", (function (param) {
                                                                        return Wonder_jest.describe("test add job after target job", (function (param) {
                                                                                      return Wonder_jest.test("test add one job", (function (param) {
                                                                                                    var state$1 = _prepare(state);
                                                                                                    var customData = /* array */[];
                                                                                                    var state$2 = JobAPI$Wonderjs.addNoWorkerLoopJob(/* tuple */[
                                                                                                          "customJob",
                                                                                                          "tick"
                                                                                                        ], /* AFTER */1, (function (state) {
                                                                                                            ArrayService$Wonderjs.push(TimeControllerService$Wonderjs.getElapsed(state[/* timeControllerRecord */35]), customData);
                                                                                                            return state;
                                                                                                          }), state$1);
                                                                                                    NoWorkerJobTool$Wonderjs.execLoopJobs(TimeControllerTool$Wonderjs.setElapsed(100.1, state$2));
                                                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[100.1]);
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("removeNoWorkerLoopJob", (function (param) {
                                                                return Wonder_jest.test("test remove custom added job", (function (param) {
                                                                              var state$1 = _prepare(state);
                                                                              var customData = /* array */[];
                                                                              var state$2 = JobAPI$Wonderjs.removeNoWorkerLoopJob("customJob", JobAPI$Wonderjs.addNoWorkerLoopJob(/* tuple */[
                                                                                        "customJob",
                                                                                        "tick"
                                                                                      ], /* AFTER */1, (function (state) {
                                                                                          ArrayService$Wonderjs.push(TimeControllerService$Wonderjs.getElapsed(state[/* timeControllerRecord */35]), customData);
                                                                                          return state;
                                                                                        }), state$1));
                                                                              NoWorkerJobTool$Wonderjs.execLoopJobs(TimeControllerTool$Wonderjs.setElapsed(100.1, state$2));
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](customData), /* array */[]);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
