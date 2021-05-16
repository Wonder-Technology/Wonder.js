'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var TransformAPI$Wonderjs = require("../../../../../src/api/TransformAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var TransformTool$Wonderjs = require("../../../../tool/service/transform/TransformTool.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");

Wonder_jest.describe("test update transform job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"update_transform\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"update_transform\"\n        }\n]\n        ", /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test special cases", (function (param) {
                      return Wonder_jest.test("shouldn't update disposed transform's data", (function (param) {
                                    var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                    var transform1 = match[1];
                                    var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                    var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match$1[1], /* tuple */[
                                          3,
                                          1,
                                          2
                                        ], TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                              1,
                                              2,
                                              3
                                            ], match$1[0]));
                                    var state$2 = TransformTool$Wonderjs.dispose(transform1, state$1);
                                    var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.getLocalToWorldMatrix(transform1, state$3)), TransformTool$Wonderjs.getDefaultLocalToWorldMatrix(state$3));
                                  }));
                    }));
      }));

/*  Not a pure module */
