'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var CloneTool$Wonderjs = require("../../tool/core/CloneTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var BoxGeometryAPI$Wonderjs = require("../../../../../src/api/geometry/BoxGeometryAPI.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var CustomGeometryAPI$Wonderjs = require("../../../../../src/api/geometry/CustomGeometryAPI.js");
var CustomGeometryTool$Wonderjs = require("../../../../tool/service/geometry/CustomGeometryTool.js");
var GetComponentGameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GetComponentGameObjectTool.js");

describe("test current geometry component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test unsafe get current geometry component data", (function () {
                describe("get the last added geometry component data", (function () {
                        describe("test get custom geometry component data", (function () {
                                return Wonder_jest.test("test geometry index, type_", (function () {
                                              var match = BoxGeometryTool$Wonderjs.createGameObject(state[0]);
                                              var gameObject = match[1];
                                              var match$1 = CustomGeometryAPI$Wonderjs.createCustomGeometry(match[0]);
                                              var vertices2 = new Float32Array(/* array */[
                                                    1,
                                                    0,
                                                    3
                                                  ]);
                                              var normals2 = new Float32Array(/* array */[
                                                    2,
                                                    4,
                                                    -20
                                                  ]);
                                              var indices2 = new Uint16Array(/* array */[
                                                    1,
                                                    0,
                                                    2
                                                  ]);
                                              var match$2 = CustomGeometryAPI$Wonderjs.createCustomGeometry(match$1[0]);
                                              var customGeometry2 = match$2[1];
                                              var state$1 = CustomGeometryAPI$Wonderjs.setCustomGeometryIndices(customGeometry2, indices2, CustomGeometryAPI$Wonderjs.setCustomGeometryNormals(customGeometry2, normals2, CustomGeometryAPI$Wonderjs.setCustomGeometryVertices(customGeometry2, vertices2, match$2[0])));
                                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectCustomGeometryComponent(gameObject, customGeometry2, GameObjectTool$Wonderjs.disposeGameObjectBoxGeometryComponentWithoutVboBuffer(gameObject, match[2], state$1));
                                              var match$3 = GetComponentGameObjectTool$Wonderjs.unsafeGetGeometryComponentData(gameObject, state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              match$3[0],
                                                              match$3[1]
                                                            ]), /* tuple */[
                                                          customGeometry2,
                                                          1
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.test("test get box geometry component data", (function () {
                                      var match = CustomGeometryTool$Wonderjs.createGameObject(state[0]);
                                      var gameObject = match[1];
                                      var match$1 = BoxGeometryAPI$Wonderjs.createBoxGeometry(match[0]);
                                      var match$2 = BoxGeometryAPI$Wonderjs.createBoxGeometry(match$1[0]);
                                      var boxGeometry2 = match$2[1];
                                      var state$1 = GameObjectAPI$Wonderjs.addGameObjectBoxGeometryComponent(gameObject, boxGeometry2, GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(gameObject, match[2], match$2[0]));
                                      var match$3 = GetComponentGameObjectTool$Wonderjs.unsafeGetGeometryComponentData(gameObject, state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$3[0],
                                                      match$3[1]
                                                    ]), /* tuple */[
                                                  boxGeometry2,
                                                  0
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test unsafe get cloned gameObject's current geometry component data", (function () {
                Wonder_jest.test("test box geometry", (function () {
                        var match = BoxGeometryTool$Wonderjs.createGameObject(state[0]);
                        var boxGeometry1 = match[2];
                        var gameObject = match[1];
                        var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject, match[0]);
                        var match$1 = CloneTool$Wonderjs.cloneWithBoxGeometry(state$1, gameObject, boxGeometry1, 2);
                        var match$2 = GetComponentGameObjectTool$Wonderjs.unsafeGetGeometryComponentData(Caml_array.caml_array_get(match$1[3], 1), state$1);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$2[0]), boxGeometry1);
                      }));
                return Wonder_jest.test("test custom geometry", (function () {
                              var match = CustomGeometryTool$Wonderjs.createGameObject(state[0]);
                              var customGeometry1 = match[2];
                              var gameObject = match[1];
                              var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject, match[0]);
                              var match$1 = CloneTool$Wonderjs.cloneWithCustomGeometry(state$1, gameObject, customGeometry1, 2);
                              var match$2 = GetComponentGameObjectTool$Wonderjs.unsafeGetGeometryComponentData(Caml_array.caml_array_get(match$1[3], 1), state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$2[0]), customGeometry1);
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
