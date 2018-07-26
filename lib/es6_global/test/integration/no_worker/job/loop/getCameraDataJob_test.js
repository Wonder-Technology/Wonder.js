

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SceneAPI$Wonderjs from "../../../../../src/api/SceneAPI.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as RenderTool$Wonderjs from "../../../../tool/service/render/RenderTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as BasicCameraViewAPI$Wonderjs from "../../../../../src/api/BasicCameraViewAPI.js";
import * as BasicCameraViewTool$Wonderjs from "../../../../tool/service/camera/BasicCameraViewTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../src/api/PerspectiveCameraProjectionAPI.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";

describe("test get camera record job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function () {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_camera\"\n        }\n      ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"get_camera_data\"\n        }\n      ]\n    }\n  ]\n        ", "\n[\n        {\n          \"name\": \"init_camera\"\n        }\n]\n        ", "\n[\n        {\n          \"name\": \"get_camera_data\"\n        }\n]\n        ", /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("set current camera record to state.renderRecord.cameraRecord", (function () {
                var _prepare = function (state) {
                  var match = RenderJobsTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                  var match$2 = match$1[3];
                  var transform2 = match$1[2];
                  var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, /* tuple */[
                        1,
                        2,
                        3
                      ], match$1[0]);
                  var match$3 = CameraTool$Wonderjs.createCameraGameObject(state$1);
                  var match$4 = match$3[3];
                  var perspectiveCameraProjection3 = match$4[1];
                  var transform3 = match$3[2];
                  var state$2 = PerspectiveCameraProjectionTool$Wonderjs.update(PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection3, 11, TransformAPI$Wonderjs.setTransformLocalPosition(transform3, /* tuple */[
                                10,
                                11,
                                12
                              ], match$3[0])));
                  var state$3 = RenderJobsTool$Wonderjs.passGl(sandbox, state$2);
                  return /* tuple */[
                          state$3,
                          /* tuple */[
                            match$1[1],
                            transform2,
                            /* tuple */[
                              match$2[0],
                              match$2[1]
                            ]
                          ],
                          /* tuple */[
                            match$3[1],
                            transform3,
                            /* tuple */[
                              match$4[0],
                              perspectiveCameraProjection3
                            ]
                          ]
                        ];
                };
                describe("test set different camera to be current camera", (function () {
                        Wonder_jest.test("test1", (function () {
                                var match = _prepare(state);
                                var match$1 = match[1];
                                var match$2 = match$1[2];
                                var state$1 = SceneAPI$Wonderjs.setCurrentCameraGameObject(match$1[0], match[0]);
                                var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](RenderTool$Wonderjs.getCameraRecord(state$2)), /* record */[
                                            /* vMatrix */BasicCameraViewAPI$Wonderjs.getBasicCameraViewWorldToCameraMatrix(match$2[0], state$2),
                                            /* pMatrix */PerspectiveCameraProjectionTool$Wonderjs.unsafeGetPMatrix(match$2[1], state$2),
                                            /* position */BasicCameraViewTool$Wonderjs.getPosition(match$1[1], state$2)
                                          ]);
                              }));
                        return Wonder_jest.test("test2", (function () {
                                      var match = _prepare(state);
                                      var match$1 = match[2];
                                      var match$2 = match$1[2];
                                      var state$1 = SceneAPI$Wonderjs.setCurrentCameraGameObject(match$1[0], match[0]);
                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](RenderTool$Wonderjs.getCameraRecord(state$2)), /* record */[
                                                  /* vMatrix */BasicCameraViewAPI$Wonderjs.getBasicCameraViewWorldToCameraMatrix(match$2[0], state$2),
                                                  /* pMatrix */PerspectiveCameraProjectionTool$Wonderjs.unsafeGetPMatrix(match$2[1], state$2),
                                                  /* position */BasicCameraViewTool$Wonderjs.getPosition(match$1[1], state$2)
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
