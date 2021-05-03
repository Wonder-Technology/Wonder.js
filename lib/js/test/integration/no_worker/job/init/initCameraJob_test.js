'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var ViewTool$Wonderjs = require("../../../../tool/service/device/ViewTool.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var PerspectiveCameraProjectionAPI$Wonderjs = require("../../../../../src/api/camera/PerspectiveCameraProjectionAPI.js");
var PerspectiveCameraProjectionTool$Wonderjs = require("../../../../tool/service/camera/PerspectiveCameraProjectionTool.js");

Wonder_jest.describe("test init camera job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("init perspectiveCameraProjection", (function (param) {
                      var _buildNoWorkerJobConfig = function (param) {
                        return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_camera\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"init_camera\"\n        }\n]\n        ", undefined, /* () */0);
                      };
                      beforeEach((function () {
                              state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0);
                              return /* () */0;
                            }));
                      return Wonder_jest.describe("build pMatrix", (function (param) {
                                    CameraTool$Wonderjs.testBuildPMatrix((function (param) {
                                            return state[0];
                                          }), DirectorTool$Wonderjs.init);
                                    return Wonder_jest.test("if has no aspect, use canvas.width/canvas.height", (function (param) {
                                                  var __x = SettingTool$Wonderjs.buildFakeCanvasWithSize(SettingTool$Wonderjs.buildFakeGl(sandbox), sandbox, undefined, 200, 150, /* () */0);
                                                  state[0] = ViewTool$Wonderjs.setCanvas(__x, state[0]);
                                                  var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCameraWithoutAspect(state[0]);
                                                  var perspectiveCameraProjection = match[2];
                                                  var state$1 = DirectorTool$Wonderjs.init(match[0]);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  PerspectiveCameraProjectionTool$Wonderjs.getAspect(perspectiveCameraProjection, state$1),
                                                                  PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionPMatrix(perspectiveCameraProjection, state$1)
                                                                ]), /* tuple */[
                                                              undefined,
                                                              new Float32Array(/* array */[
                                                                    1.299038052558899,
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    1.7320507764816284,
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    -1.0002000331878662,
                                                                    -1,
                                                                    0,
                                                                    0,
                                                                    -0.20002000033855438,
                                                                    0
                                                                  ])
                                                            ]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
