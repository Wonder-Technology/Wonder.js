

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../../tool/TestTool.js";
import * as DisposeJob$Wonderjs from "../../../../../../src/job/no_worker/loop/DisposeJob.js";
import * as GeometryAPI$Wonderjs from "../../../../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../../../../../tool/service/setting/SettingTool.js";
import * as GeometryTool$Wonderjs from "../../../../../tool/service/geometry/GeometryTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as VboBufferTool$Wonderjs from "../../../../../tool/service/vboBuffer/VboBufferTool.js";
import * as GameObjectTool$Wonderjs from "../../../../../tool/service/gameObject/GameObjectTool.js";

Wonder_jest.describe("fix geometry bug", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("new one after dispose should has its own geometry point data", (function (param) {
                var _test = function (state) {
                  var vertices1 = new Float32Array(/* array */[10]);
                  var vertices2 = new Float32Array(/* array */[
                        3,
                        2
                      ]);
                  var vertices3 = new Float32Array(/* array */[
                        5,
                        3,
                        2
                      ]);
                  var normals1 = new Float32Array(/* array */[1]);
                  var normals2 = new Float32Array(/* array */[
                        2,
                        2
                      ]);
                  var normals3 = new Float32Array(/* array */[
                        5,
                        1,
                        2
                      ]);
                  var indices1 = new Uint16Array(/* array */[2]);
                  var indices2 = new Uint16Array(/* array */[
                        2,
                        2
                      ]);
                  var indices3 = new Uint16Array(/* array */[
                        3,
                        3,
                        2
                      ]);
                  var match = GeometryTool$Wonderjs.createGameObject(state);
                  var geometry1 = match[2];
                  var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
                  var geometry2 = match$1[2];
                  var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry1, match$1[0]);
                  var state$2 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry2, state$1);
                  var state$3 = GeometryAPI$Wonderjs.setGeometryVertices(geometry2, vertices2, GeometryAPI$Wonderjs.setGeometryVertices(geometry1, vertices1, state$2));
                  var state$4 = GeometryAPI$Wonderjs.setGeometryNormals(geometry2, normals2, GeometryAPI$Wonderjs.setGeometryNormals(geometry1, normals1, state$3));
                  var state$5 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry2, indices2, GeometryAPI$Wonderjs.setGeometryIndices16(geometry1, indices1, state$4));
                  var state$6 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1], geometry1, state$5);
                  var match$2 = GeometryTool$Wonderjs.createGameObject(state$6);
                  var geometry3 = match$2[2];
                  var state$7 = GeometryAPI$Wonderjs.setGeometryVertices(geometry3, vertices3, match$2[0]);
                  var state$8 = GeometryAPI$Wonderjs.setGeometryNormals(geometry3, normals3, state$7);
                  var state$9 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry3, indices3, state$8);
                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                  GeometryAPI$Wonderjs.getGeometryVertices(geometry2, state$9),
                                  GeometryAPI$Wonderjs.getGeometryNormals(geometry2, state$9),
                                  GeometryAPI$Wonderjs.getGeometryIndices16(geometry2, state$9),
                                  GeometryAPI$Wonderjs.getGeometryVertices(geometry3, state$9),
                                  GeometryAPI$Wonderjs.getGeometryNormals(geometry3, state$9),
                                  GeometryAPI$Wonderjs.getGeometryIndices16(geometry3, state$9)
                                ]), /* tuple */[
                              vertices2,
                              normals2,
                              indices2,
                              vertices3,
                              normals3,
                              indices3
                            ]);
                };
                Wonder_jest.test("test not cause reallocate", (function (param) {
                        return _test(SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0));
                      }));
                return Wonder_jest.test("test cause reallocate", (function (param) {
                              return _test(SettingTool$Wonderjs.setMemory(state[0], 1, /* () */0));
                            }));
              }));
        return Wonder_jest.describe("add after delete", (function (param) {
                      var _test = function (deleteGameObjectGeometryComponentFunc, state) {
                        var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                        var gameObject1 = match[1];
                        var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
                        var geometry2 = match$1[2];
                        var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject1, geometry2, GameObjectAPI$Wonderjs.disposeGameObjectGeometryComponent(gameObject1, match[2], match$1[0]));
                        var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                        var state$3 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject1, geometry2, Curry._3(deleteGameObjectGeometryComponentFunc, gameObject1, geometry2, state$2));
                        var state$4 = DisposeJob$Wonderjs.execJob(undefined, state$3);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(gameObject1, state$4)), geometry2);
                      };
                      Wonder_jest.test("test add after dispose", (function (param) {
                              return _test(GameObjectAPI$Wonderjs.disposeGameObjectGeometryComponent, state);
                            }));
                      return Wonder_jest.test("test add after remove", (function (param) {
                                    return _test(GameObjectAPI$Wonderjs.removeGameObjectGeometryComponent, state);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
