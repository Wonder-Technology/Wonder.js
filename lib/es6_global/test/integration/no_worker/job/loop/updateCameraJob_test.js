

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ViewTool$Wonderjs from "../../../../tool/service/device/ViewTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as NoWorkerJobTool$Wonderjs from "../../../../tool/service/job/no_worker/NoWorkerJobTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as ArcballCameraControllerTool$Wonderjs from "../../../../tool/service/camera_controller/ArcballCameraControllerTool.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";

describe("test update camera job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("update perspectiveCameraProjection", (function () {
                var _buildNoWorkerJobConfig = function () {
                  return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"update_camera\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"update_camera\"\n        }\n]\n        ", /* () */0);
                };
                beforeEach((function () {
                        state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0);
                        return /* () */0;
                      }));
                CameraTool$Wonderjs.testBuildPMatrix((function () {
                        return state[0];
                      }), (function (state) {
                        return DirectorTool$Wonderjs.run(state, undefined, /* () */0);
                      }));
                Wonder_jest.test("test dirty during multi updates", (function () {
                        var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state[0]);
                        var perspectiveCameraProjection = match[2];
                        var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                        var state$2 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.2, state$1);
                        var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionPMatrix(perspectiveCameraProjection, state$3)), new Float32Array(/* array */[
                                        1.7320508075688776,
                                        0,
                                        0,
                                        0,
                                        0,
                                        1.7320508075688776,
                                        0,
                                        0,
                                        0,
                                        0,
                                        -1.0004000800160033,
                                        -1,
                                        0,
                                        0,
                                        -0.40008001600320064,
                                        0
                                      ]));
                      }));
                return Wonder_jest.test("test mark dirty", (function () {
                              var match = CameraTool$Wonderjs.createCameraGameObjectWithoutAspect(state[0]);
                              var cameraProjection1 = match[3][1];
                              var __x = SettingTool$Wonderjs.buildFakeCanvasWithSize(SettingTool$Wonderjs.buildFakeGl(sandbox), sandbox, undefined, 100, 150, /* () */0);
                              var state$1 = ViewTool$Wonderjs.setCanvas(__x, match[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                              var __x$1 = SettingTool$Wonderjs.buildFakeCanvasWithSize(SettingTool$Wonderjs.buildFakeGl(sandbox), sandbox, undefined, 200, 150, /* () */0);
                              var state$3 = ViewTool$Wonderjs.setCanvas(__x$1, state$2);
                              var state$4 = PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionDirty(cameraProjection1, state$3);
                              var state$5 = DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionTool$Wonderjs.unsafeGetPMatrix(cameraProjection1, state$5)), new Float32Array(/* array */[
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
                                            ]));
                            }));
              }));
        describe("update arcballCameraController", (function () {
                var _prepare = function (_, _$1, _$2, _$3, _$4) {
                  var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"update_camera\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"update_camera\"\n        }\n]\n        ", /* () */0), undefined, /* () */0);
                  var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                  var cameraController = match[3][0];
                  var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTarget(cameraController, /* tuple */[
                        1,
                        2,
                        3
                      ], ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, 0.5, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi(cameraController, 1, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController, 2.5, match[0]))));
                  return /* tuple */[
                          state$1,
                          match[2]
                        ];
                };
                describe("update one arcballCameraController", (function () {
                        describe("update transform", (function () {
                                Wonder_jest.test("set localPosition", (function () {
                                        var match = _prepare(2.5, 1, 0.5, /* tuple */[
                                              1,
                                              2,
                                              3
                                            ], /* () */0);
                                        var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(match[1], state)), /* tuple */[
                                                    1.6475868225097656,
                                                    4.19395637512207,
                                                    4.008556842803955
                                                  ]);
                                      }));
                                return Wonder_jest.test("lookAt target", (function () {
                                              var match = _prepare(2.5, 1, 0.5, /* tuple */[
                                                    1,
                                                    2,
                                                    3
                                                  ], /* () */0);
                                              var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformRotation(match[1], state)), /* tuple */[
                                                          -0.4895463742519966,
                                                          0.24214243964541454,
                                                          0.14363681885111765,
                                                          0.8252756113563703
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("update two arcballCameraController", (function () {
                        return Wonder_jest.test("set localPosition", (function () {
                                      var match = _prepare(2.5, 1, 0.5, /* tuple */[
                                            1,
                                            2,
                                            3
                                          ], /* () */0);
                                      var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                      var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match$1[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      TransformAPI$Wonderjs.getTransformLocalPosition(match[1], state),
                                                      TransformAPI$Wonderjs.getTransformLocalPosition(match$1[2], state)
                                                    ]), /* tuple */[
                                                  /* tuple */[
                                                    1.6475868225097656,
                                                    4.19395637512207,
                                                    4.008556842803955
                                                  ],
                                                  /* tuple */[
                                                    6.123233998228043e-16,
                                                    6.123233998228043e-16,
                                                    10
                                                  ]
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
