

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as DisposeJob$Wonderjs from "../../../../../src/job/no_worker/loop/DisposeJob.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as UpdateCameraJob$Wonderjs from "../../../../../src/job/no_worker/loop/UpdateCameraJob.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";

Wonder_jest.describe("PerspectiveCameraProjection", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("createPerspectiveCameraProjection", (function (param) {
                Wonder_jest.test("create a new camera which is just index(int)", (function (param) {
                        var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), 0);
                      }));
                Wonder_jest.describe("change state", (function (param) {
                        return Wonder_jest.test("state->index + 1", (function (param) {
                                      var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                                      var record = match[0][/* perspectiveCameraProjectionRecord */14];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](record[/* index */0]), 1);
                                    }));
                      }));
                return Wonder_jest.test("add to dirty array", (function (param) {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionTool$Wonderjs.getDirtyArray(match[0])), /* array */[match[1]]);
                            }));
              }));
        Wonder_jest.describe("getAllPerspectiveCameraProjections", (function (param) {
                var _createPerspectiveCameraProjectionGameObjects = function (state) {
                  var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                  var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                  return /* tuple */[
                          match$2[0],
                          /* tuple */[
                            match[1],
                            match$1[1],
                            match$2[1]
                          ],
                          /* tuple */[
                            match[3][1],
                            match$1[3][1],
                            match$2[3][1]
                          ]
                        ];
                };
                Wonder_jest.test("get all cameraProjections include the ones add or not add to gameObject", (function (param) {
                        var match = _createPerspectiveCameraProjectionGameObjects(state);
                        var match$1 = match[2];
                        var match$2 = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.getAllPerspectiveCameraProjections(match$2[0])), /* array */[
                                    match$1[0],
                                    match$1[1],
                                    match$1[2],
                                    match$2[1]
                                  ]);
                      }));
                return Wonder_jest.test("test dispose", (function (param) {
                              var match = _createPerspectiveCameraProjectionGameObjects(state);
                              var match$1 = match[1];
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match$1[2], GameObjectAPI$Wonderjs.disposeGameObject(match$1[1], match[0]));
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllPerspectiveCameraProjectionComponents(state$2)), /* array */[match[2][0]]);
                            }));
              }));
        Wonder_jest.describe("markPerspectiveCameraProjectionDirty", (function (param) {
                return Wonder_jest.test("mark dirty", (function (param) {
                              var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                              var cameraProjection1 = match[3][1];
                              var state$1 = UpdateCameraJob$Wonderjs.execJob(undefined, match[0]);
                              var state$2 = PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionDirty(cameraProjection1, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionTool$Wonderjs.getDirtyArray(state$2)), /* array */[cameraProjection1]);
                            }));
              }));
        Wonder_jest.describe("markPerspectiveCameraProjectionNotDirty", (function (param) {
                return Wonder_jest.test("mark not dirty", (function (param) {
                              var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                              var cameraProjection1 = match[3][1];
                              var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                              var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(cameraProjection1, 2, match$1[0]);
                              var state$2 = PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionNotDirty(cameraProjection1, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$WonderCommonlib.removeDuplicateItems(PerspectiveCameraProjectionTool$Wonderjs.getDirtyArray(state$2))), /* array */[match$1[3][1]]);
                            }));
              }));
        Wonder_jest.describe("unsafeGetPerspectiveCameraProjectionGameObject", (function (param) {
                return Wonder_jest.test("get cameraProjection's gameObject", (function (param) {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              var cameraProjection = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent(gameObject, cameraProjection, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionGameObject(cameraProjection, state$1)), gameObject);
                            }));
              }));
        Wonder_jest.describe("dispose component", (function (param) {
                var _prepareTwo = function (state) {
                  var match = CameraTool$Wonderjs.createCameraGameObject(state);
                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                  return /* tuple */[
                          match$1[0],
                          match[1],
                          match[3][1],
                          match$1[1],
                          match$1[3][1]
                        ];
                };
                Wonder_jest.describe("dispose data", (function (param) {
                        Wonder_jest.test("dirtyArray: remove from array(include duplicated ones)", (function (param) {
                                var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                var perspectiveCameraProjection1 = match[3][1];
                                var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(perspectiveCameraProjection1, 1000, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection1, 0.1, match[0]));
                                var state$2 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], perspectiveCameraProjection1, state$1);
                                var match$1 = state$2[/* perspectiveCameraProjectionRecord */14];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* dirtyArray */1]), /* array */[]);
                              }));
                        Wonder_jest.test("remove from pMatrixMap, gameObjectMap", (function (param) {
                                var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                var perspectiveCameraProjection1 = match[3][1];
                                var state$1 = PerspectiveCameraProjectionTool$Wonderjs.updateCameraProjection(perspectiveCameraProjection1, match[0]);
                                var state$2 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], perspectiveCameraProjection1, state$1);
                                var match$1 = state$2[/* perspectiveCameraProjectionRecord */14];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                MutableSparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, match$1[/* pMatrixMap */2]),
                                                MutableSparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, match$1[/* gameObjectMap */7])
                                              ]), /* tuple */[
                                            false,
                                            false
                                          ]);
                              }));
                        return Wonder_jest.test("remove from nearMap, farMap, fovyMap, aspectMap", (function (param) {
                                      var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                      var perspectiveCameraProjection1 = match[3][1];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], perspectiveCameraProjection1, match[0]);
                                      var record = state$1[/* perspectiveCameraProjectionRecord */14];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      MutableSparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, record[/* nearMap */3]),
                                                      MutableSparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, record[/* farMap */4]),
                                                      MutableSparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, record[/* fovyMap */5]),
                                                      MutableSparseMapService$WonderCommonlib.has(perspectiveCameraProjection1, record[/* aspectMap */6])
                                                    ]), /* tuple */[
                                                  false,
                                                  false,
                                                  false,
                                                  false
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("test add new one after dispose old one", (function (param) {
                        Wonder_jest.test("use disposed index as new index firstly", (function (param) {
                                var match = _prepareTwo(state[0]);
                                var perspectiveCameraProjection1 = match[2];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], perspectiveCameraProjection1, match[0]);
                                var match$1 = CameraTool$Wonderjs.createCameraGameObject(state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[3][1]), perspectiveCameraProjection1);
                              }));
                        return Wonder_jest.test("if has no disposed index, get index from record.index", (function (param) {
                                      var match = _prepareTwo(state[0]);
                                      var perspectiveCameraProjection1 = match[2];
                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], perspectiveCameraProjection1, match[0]);
                                      var match$1 = CameraTool$Wonderjs.createCameraGameObject(state$1);
                                      var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$1[3][1],
                                                      match$2[3][1]
                                                    ]), /* tuple */[
                                                  perspectiveCameraProjection1,
                                                  match[4] + 1 | 0
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("contract check", (function (param) {
                              return Wonder_jest.test("expect dispose the alive component, but actual not", (function (param) {
                                            var match = _prepareTwo(state[0]);
                                            var perspectiveCameraProjection1 = match[2];
                                            var gameObject1 = match[1];
                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(gameObject1, perspectiveCameraProjection1, match[0]);
                                            return Wonder_jest.Expect[/* toThrowMessage */21]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                              GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(gameObject1, perspectiveCameraProjection1, state$1);
                                                              return /* () */0;
                                                            })));
                                          }));
                            }));
              }));
        Wonder_jest.describe("contract check: is alive", (function (param) {
                return Wonder_jest.describe("if cameraProjection is disposed", (function (param) {
                              var _testGetFunc = function (getFunc) {
                                var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                var cameraProjection = match[3][1];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(match[1], cameraProjection, match[0]);
                                return Wonder_jest.Expect[/* toThrowMessage */21]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                  return Curry._2(getFunc, cameraProjection, state$1);
                                                })));
                              };
                              Wonder_jest.test("unsafeGetPerspectiveCameraProjectionGameObject should error", (function (param) {
                                      return _testGetFunc(PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionGameObject);
                                    }));
                              return Wonder_jest.test("unsafeGetPerspectiveCameraProjectionPMatrix should error", (function (param) {
                                            return _testGetFunc(PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionPMatrix);
                                          }));
                            }));
              }));
        Wonder_jest.describe("getFovy", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              var cameraProjection = match[1];
                              var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy(cameraProjection, 65, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy(cameraProjection, state$1)), 65);
                            }));
              }));
        Wonder_jest.describe("getAspect", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              var cameraProjection = match[1];
                              var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(cameraProjection, 1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect(cameraProjection, state$1)), 1);
                            }));
              }));
        Wonder_jest.describe("getNear", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                              var cameraProjection = match[1];
                              var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(cameraProjection, 0.1, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear(cameraProjection, state$1)), 0.1);
                            }));
              }));
        return Wonder_jest.describe("getFar", (function (param) {
                      return Wonder_jest.test("test", (function (param) {
                                    var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                                    var cameraProjection = match[1];
                                    var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(cameraProjection, 1000, match[0]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar(cameraProjection, state$1)), 1000);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
