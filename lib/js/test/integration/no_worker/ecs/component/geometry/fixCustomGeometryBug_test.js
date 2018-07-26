'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var VboBufferTool$Wonderjs = require("../../../../../tool/service/vboBuffer/VboBufferTool.js");
var GameObjectTool$Wonderjs = require("../../../../../tool/service/gameObject/GameObjectTool.js");
var CustomGeometryAPI$Wonderjs = require("../../../../../../src/api/geometry/CustomGeometryAPI.js");
var CustomGeometryTool$Wonderjs = require("../../../../../tool/service/geometry/CustomGeometryTool.js");

describe("test customGeometry", (function () {
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
        describe("fix bug", (function () {
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
                  var match = CustomGeometryTool$Wonderjs.createGameObject(state);
                  var geometry1 = match[2];
                  var match$1 = CustomGeometryTool$Wonderjs.createGameObject(match[0]);
                  var geometry2 = match$1[2];
                  var state$1 = VboBufferTool$Wonderjs.addVboBufferToCustomGeometryBufferMap(geometry1, match$1[0]);
                  var state$2 = VboBufferTool$Wonderjs.addVboBufferToCustomGeometryBufferMap(geometry2, state$1);
                  var state$3 = CustomGeometryAPI$Wonderjs.setCustomGeometryVertices(geometry2, vertices2, CustomGeometryAPI$Wonderjs.setCustomGeometryVertices(geometry1, vertices1, state$2));
                  var state$4 = CustomGeometryAPI$Wonderjs.setCustomGeometryNormals(geometry2, normals2, CustomGeometryAPI$Wonderjs.setCustomGeometryNormals(geometry1, normals1, state$3));
                  var state$5 = CustomGeometryAPI$Wonderjs.setCustomGeometryIndices(geometry2, indices2, CustomGeometryAPI$Wonderjs.setCustomGeometryIndices(geometry1, indices1, state$4));
                  var state$6 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(match[1], geometry1, state$5);
                  var match$2 = CustomGeometryTool$Wonderjs.createGameObject(state$6);
                  var geometry3 = match$2[2];
                  var state$7 = CustomGeometryAPI$Wonderjs.setCustomGeometryVertices(geometry3, vertices3, match$2[0]);
                  var state$8 = CustomGeometryAPI$Wonderjs.setCustomGeometryNormals(geometry3, normals3, state$7);
                  var state$9 = CustomGeometryAPI$Wonderjs.setCustomGeometryIndices(geometry3, indices3, state$8);
                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                  CustomGeometryAPI$Wonderjs.getCustomGeometryVertices(geometry2, state$9),
                                  CustomGeometryAPI$Wonderjs.getCustomGeometryNormals(geometry2, state$9),
                                  CustomGeometryAPI$Wonderjs.getCustomGeometryIndices(geometry2, state$9),
                                  CustomGeometryAPI$Wonderjs.getCustomGeometryVertices(geometry3, state$9),
                                  CustomGeometryAPI$Wonderjs.getCustomGeometryNormals(geometry3, state$9),
                                  CustomGeometryAPI$Wonderjs.getCustomGeometryIndices(geometry3, state$9)
                                ]), /* tuple */[
                              vertices2,
                              normals2,
                              indices2,
                              vertices3,
                              normals3,
                              indices3
                            ]);
                };
                Wonder_jest.test("new one after dispose(not cause reallocate) should has its own geometry point data", (function () {
                        return _test(SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0));
                      }));
                return Wonder_jest.test("new one after dispose(cause reallocate) should has its own geometry point data", (function () {
                              return _test(SettingTool$Wonderjs.setMemory(state[0], 1, /* () */0));
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
