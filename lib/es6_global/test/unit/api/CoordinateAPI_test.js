

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as CameraTool$Wonderjs from "../../tool/service/camera/CameraTool.js";
import * as TransformAPI$Wonderjs from "../../../src/api/TransformAPI.js";
import * as CoordinateAPI$Wonderjs from "../../../src/api/CoordinateAPI.js";
import * as UpdateCameraJob$Wonderjs from "../../../src/job/no_worker/loop/UpdateCameraJob.js";
import * as UpdateTransformJob$Wonderjs from "../../../src/job/no_worker/loop/UpdateTransformJob.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../src/api/camera/PerspectiveCameraProjectionAPI.js";

Wonder_jest.describe("CoordinateAPI", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("convertWorldToScreen", (function (param) {
                      return Wonder_jest.describe("convert world coordinate to screen coordinate", (function (param) {
                                    var _test = function (localPosition, param, screenCoordinate) {
                                      var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                      var match$1 = match[3];
                                      var perspectiveCameraProjection = match$1[1];
                                      var transform = match[2];
                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPosition, match[0]);
                                      var state$2 = TransformAPI$Wonderjs.lookAt(transform, /* tuple */[
                                            0,
                                            0,
                                            0
                                          ], state$1);
                                      var state$3 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(perspectiveCameraProjection, 1000 / 2000, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy(perspectiveCameraProjection, 60, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(perspectiveCameraProjection, 100, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.1, state$2))));
                                      var state$4 = UpdateTransformJob$Wonderjs.execJob(undefined, state$3);
                                      var state$5 = UpdateCameraJob$Wonderjs.execJob(undefined, state$4);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CoordinateAPI$Wonderjs.convertWorldToScreen(match$1[0], perspectiveCameraProjection, /* tuple */[
                                                          param[0],
                                                          param[1],
                                                          param[2],
                                                          1000,
                                                          2000
                                                        ], state$5)), screenCoordinate);
                                    };
                                    Wonder_jest.test("test1", (function (param) {
                                            return _test(/* tuple */[
                                                        0,
                                                        1,
                                                        1
                                                      ], /* tuple */[
                                                        0,
                                                        0,
                                                        0
                                                      ], /* tuple */[
                                                        500,
                                                        1000
                                                      ]);
                                          }));
                                    Wonder_jest.test("test2", (function (param) {
                                            return _test(/* tuple */[
                                                        0,
                                                        0,
                                                        1
                                                      ], /* tuple */[
                                                        1,
                                                        0.5,
                                                        0
                                                      ], /* tuple */[
                                                        2232,
                                                        134
                                                      ]);
                                          }));
                                    return Wonder_jest.describe("fix bug", (function (param) {
                                                  return Wonder_jest.describe("if world coordinate is in the reverse direction, screen coordinate should be out of screen", (function (param) {
                                                                return Wonder_jest.test("if the w(the coordinate(x,y,z,w) after perspective transform) < 0.0, set screen coordinate to be undefined", (function (param) {
                                                                              return _test(/* tuple */[
                                                                                          0,
                                                                                          0,
                                                                                          1
                                                                                        ], /* tuple */[
                                                                                          0,
                                                                                          0,
                                                                                          100
                                                                                        ], undefined);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
