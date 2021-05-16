'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var TimeControllerAPI$Wonderjs = require("../../../../../src/api/TimeControllerAPI.js");
var TimeControllerTool$Wonderjs = require("../../../../tool/service/timeController/TimeControllerTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");

Wonder_jest.describe("test tick job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"start_time\"\n        }\n      ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"tick\"\n        }\n      ]\n    }\n  ]\n        ", "\n\n[\n        {\n          \"name\": \"start_time\"\n        }\n]\n        ", "\n\n[\n        {\n          \"name\": \"tick\"\n        }\n]\n        ", /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, undefined, /* () */0);
                TimeControllerTool$Wonderjs.setStartTime(100);
                return TestTool$Wonderjs.closeContractCheck(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("compute gameTime", (function (param) {
                Wonder_jest.test("gameTime's unit is second", (function (param) {
                        var state$1 = DirectorTool$Wonderjs.init(state[0]);
                        var state$2 = DirectorTool$Wonderjs.run(state$1, 1100, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TimeControllerAPI$Wonderjs.getGameTime(state$2)), 1);
                      }));
                return Wonder_jest.test("record total game time", (function (param) {
                              var state$1 = DirectorTool$Wonderjs.init(state[0]);
                              var state$2 = DirectorTool$Wonderjs.run(state$1, 1000, /* () */0);
                              var state$3 = DirectorTool$Wonderjs.run(state$2, 2100, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TimeControllerAPI$Wonderjs.getGameTime(state$3)), 2);
                            }));
              }));
        return Wonder_jest.describe("compute fps", (function (param) {
                      Wonder_jest.test("fps is 60 on the first loop", (function (param) {
                              var state$1 = DirectorTool$Wonderjs.init(state[0]);
                              var state$2 = DirectorTool$Wonderjs.run(state$1, 500, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TimeControllerAPI$Wonderjs.getFps(state$2)), 60);
                            }));
                      return Wonder_jest.test("test compute", (function (param) {
                                    var state$1 = DirectorTool$Wonderjs.init(state[0]);
                                    var state$2 = DirectorTool$Wonderjs.run(state$1, 1000, /* () */0);
                                    var state$3 = DirectorTool$Wonderjs.run(state$2, 1050, /* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TimeControllerAPI$Wonderjs.getFps(state$3)), 20);
                                  }));
                    }));
      }));

/*  Not a pure module */
