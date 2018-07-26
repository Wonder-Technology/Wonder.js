

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as VboBufferTool$Wonderjs from "../../../../tool/service/vboBuffer/VboBufferTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as CustomGeometryAPI$Wonderjs from "../../../../../src/api/geometry/CustomGeometryAPI.js";
import * as CustomGeometryTool$Wonderjs from "../../../../tool/service/geometry/CustomGeometryTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "../../../../../src/service/state/main/geometry/custom/RecordCustomGeometryMainService.js";
import * as ReallocateCustomGeometryCPUMemoryTool$Wonderjs from "../../../../tool/reallocate/ReallocateCustomGeometryCPUMemoryTool.js";

describe("CustomGeometry", (function () {
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
        describe("createCustomGeometry", (function () {
                return Wonder_jest.test("create a new geometry which is just index(int)", (function () {
                              var match = CustomGeometryAPI$Wonderjs.createCustomGeometry(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              RecordCustomGeometryMainService$Wonderjs.getRecord(match[0])[/* index */0],
                                              match[1]
                                            ]), /* tuple */[
                                          1,
                                          0
                                        ]);
                            }));
              }));
        describe("test set points", (function () {
                var _testSetVertexDataWithTypeArray = function (_, getFunc, setFunc) {
                  return Wonder_jest.test("directly set it", (function () {
                                var match = CustomGeometryAPI$Wonderjs.createCustomGeometry(state[0]);
                                var geometry = match[1];
                                var state$1 = Curry._3(setFunc, geometry, new Float32Array(/* array */[
                                          1,
                                          2,
                                          3
                                        ]), match[0]);
                                var newData = new Float32Array(/* array */[
                                      3,
                                      5,
                                      5
                                    ]);
                                var state$2 = Curry._3(setFunc, geometry, newData, state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(getFunc, geometry, state$2)), newData);
                              }));
                };
                describe("set vertices with type array", (function () {
                        return _testSetVertexDataWithTypeArray("vertices", CustomGeometryAPI$Wonderjs.getCustomGeometryVertices, CustomGeometryAPI$Wonderjs.setCustomGeometryVertices);
                      }));
                describe("set texCoords with type array", (function () {
                        return _testSetVertexDataWithTypeArray("texCoords", CustomGeometryAPI$Wonderjs.getCustomGeometryTexCoords, CustomGeometryAPI$Wonderjs.setCustomGeometryTexCoords);
                      }));
                describe("set normals with type array", (function () {
                        return _testSetVertexDataWithTypeArray("normals", CustomGeometryAPI$Wonderjs.getCustomGeometryNormals, CustomGeometryAPI$Wonderjs.setCustomGeometryNormals);
                      }));
                describe("set indices with type array", (function () {
                        return Wonder_jest.test("directly set it", (function () {
                                      var match = CustomGeometryAPI$Wonderjs.createCustomGeometry(state[0]);
                                      var geometry = match[1];
                                      var newData = new Uint16Array(/* array */[
                                            3,
                                            5,
                                            5
                                          ]);
                                      var state$1 = CustomGeometryAPI$Wonderjs.setCustomGeometryIndices(geometry, newData, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](CustomGeometryAPI$Wonderjs.getCustomGeometryIndices(geometry, state$1)), newData);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("getDrawMode", (function () {
                return Wonder_jest.test("return TRIANGLES", (function () {
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl({
                                    TRIANGLES: 1
                                  }, state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](CustomGeometryAPI$Wonderjs.getCustomGeometryDrawMode(state$1)), 1);
                            }));
              }));
        describe("unsafeGetCustomGeometryGameObject", (function () {
                return Wonder_jest.test("get geometry's gameObject", (function () {
                              var match = CustomGeometryAPI$Wonderjs.createCustomGeometry(state[0]);
                              var geometry = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectCustomGeometryComponent(gameObject, geometry, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](CustomGeometryAPI$Wonderjs.unsafeGetCustomGeometryGameObject(geometry, state$1)), gameObject);
                            }));
              }));
        describe("dispose component", (function () {
                describe("dispose data", (function () {
                        describe("test dispose shared geometry", (function () {
                                return Wonder_jest.test("descrease group count", (function () {
                                              var match = CustomGeometryAPI$Wonderjs.createCustomGeometry(state[0]);
                                              var geometry1 = match[1];
                                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                              var gameObject1 = match$1[1];
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectCustomGeometryComponent(gameObject1, geometry1, match$1[0]);
                                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectCustomGeometryComponent(match$2[1], geometry1, match$2[0]);
                                              var match$3 = GameObjectAPI$Wonderjs.createGameObject(state$2);
                                              var state$3 = GameObjectAPI$Wonderjs.addGameObjectCustomGeometryComponent(match$3[1], geometry1, match$3[0]);
                                              var state$4 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](CustomGeometryTool$Wonderjs.getGroupCount(geometry1, state$4)), 1);
                                            }));
                              }));
                        describe("test dispose not shared geometry", (function () {
                                var _prepare = function (state) {
                                  var match = CustomGeometryTool$Wonderjs.createGameObject(state[0]);
                                  var geometry1 = match[2];
                                  var gameObject1 = match[1];
                                  var state$1 = VboBufferTool$Wonderjs.addVboBufferToCustomGeometryBufferMap(geometry1, match[0]);
                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$1);
                                  return /* tuple */[
                                          state$2,
                                          gameObject1,
                                          geometry1
                                        ];
                                };
                                Wonder_jest.test("remove from groupCountMap, gameObjectMap", (function () {
                                        var match = _prepare(state);
                                        var geometry1 = match[2];
                                        var match$1 = CustomGeometryTool$Wonderjs.getRecord(match[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        SparseMapService$WonderCommonlib.has(geometry1, match$1[/* groupCountMap */16]),
                                                        SparseMapService$WonderCommonlib.has(geometry1, match$1[/* gameObjectMap */15])
                                                      ]), /* tuple */[
                                                    false,
                                                    false
                                                  ]);
                                      }));
                                describe("test reallocate geometry", (function () {
                                        var _prepare = function (state) {
                                          return CustomGeometryTool$Wonderjs.createThreeGameObjectsAndSetPointData(SettingTool$Wonderjs.setMemory(state, 1, /* () */0));
                                        };
                                        describe("if have dispose too many customGeometrys, reallocate geometry", (function () {
                                                describe("test type array data", (function () {
                                                        describe("pack old type array with alived data", (function () {
                                                                Wonder_jest.test("alive geometry's points should exist", (function () {
                                                                        var match = _prepare(state[0]);
                                                                        var match$1 = match[6];
                                                                        var match$2 = match[5];
                                                                        var match$3 = match[4];
                                                                        var match$4 = match[3];
                                                                        var match$5 = match[2];
                                                                        var geometry3 = match$5[2];
                                                                        var geometry2 = match$5[1];
                                                                        var state$1 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(match[1][0], match$5[0], match[0]);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        CustomGeometryAPI$Wonderjs.getCustomGeometryVertices(geometry2, state$1),
                                                                                        CustomGeometryAPI$Wonderjs.getCustomGeometryTexCoords(geometry2, state$1),
                                                                                        CustomGeometryAPI$Wonderjs.getCustomGeometryNormals(geometry2, state$1),
                                                                                        CustomGeometryAPI$Wonderjs.getCustomGeometryIndices(geometry2, state$1),
                                                                                        CustomGeometryAPI$Wonderjs.getCustomGeometryVertices(geometry3, state$1),
                                                                                        CustomGeometryAPI$Wonderjs.getCustomGeometryTexCoords(geometry3, state$1),
                                                                                        CustomGeometryAPI$Wonderjs.getCustomGeometryNormals(geometry3, state$1),
                                                                                        CustomGeometryAPI$Wonderjs.getCustomGeometryIndices(geometry3, state$1)
                                                                                      ]), /* tuple */[
                                                                                    match$4[1],
                                                                                    match$3[1],
                                                                                    match$2[1],
                                                                                    match$1[1],
                                                                                    match$4[2],
                                                                                    match$3[2],
                                                                                    match$2[2],
                                                                                    match$1[2]
                                                                                  ]);
                                                                      }));
                                                                return Wonder_jest.test("type array should be packed", (function () {
                                                                              var match = _prepare(state[0]);
                                                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(match[1][1], match[2][1], match[0]);
                                                                              var match$1 = CustomGeometryTool$Wonderjs.getRecord(state$1);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              match$1[/* vertices */2].slice(0, 10),
                                                                                              match$1[/* texCoords */3].slice(0, 10),
                                                                                              match$1[/* normals */4].slice(0, 10),
                                                                                              match$1[/* indices */5].slice(0, 10)
                                                                                            ]), /* tuple */[
                                                                                          new Float32Array(/* array */[
                                                                                                10,
                                                                                                10,
                                                                                                11,
                                                                                                5,
                                                                                                3,
                                                                                                2,
                                                                                                5,
                                                                                                3,
                                                                                                2,
                                                                                                0
                                                                                              ]),
                                                                                          new Float32Array(/* array */[
                                                                                                0.5,
                                                                                                0.5,
                                                                                                0,
                                                                                                0.5,
                                                                                                0,
                                                                                                0.5,
                                                                                                0,
                                                                                                0,
                                                                                                0,
                                                                                                0
                                                                                              ]),
                                                                                          new Float32Array(/* array */[
                                                                                                1,
                                                                                                2,
                                                                                                3,
                                                                                                5,
                                                                                                1,
                                                                                                2,
                                                                                                5,
                                                                                                1,
                                                                                                2,
                                                                                                0
                                                                                              ]),
                                                                                          new Uint16Array(/* array */[
                                                                                                2,
                                                                                                1,
                                                                                                0,
                                                                                                0,
                                                                                                1,
                                                                                                2,
                                                                                                0,
                                                                                                1,
                                                                                                2,
                                                                                                0
                                                                                              ])
                                                                                        ]);
                                                                            }));
                                                              }));
                                                        return /* () */0;
                                                      }));
                                                describe("test info array", (function () {
                                                        return Wonder_jest.test("update startIndex, endIndex for packed type array", (function () {
                                                                      var match = _prepare(state[0]);
                                                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(match[1][0], match[2][0], match[0]);
                                                                      var match$1 = CustomGeometryTool$Wonderjs.getRecord(state$1);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                      match$1[/* verticesInfos */6].slice(0, 6),
                                                                                      match$1[/* texCoordsInfos */7].slice(0, 6),
                                                                                      match$1[/* normalsInfos */8].slice(0, 6),
                                                                                      match$1[/* indicesInfos */9].slice(0, 6)
                                                                                    ]), /* tuple */[
                                                                                  new Uint32Array(/* array */[
                                                                                        0,
                                                                                        3,
                                                                                        0,
                                                                                        3,
                                                                                        3,
                                                                                        6
                                                                                      ]),
                                                                                  new Uint32Array(/* array */[
                                                                                        0,
                                                                                        2,
                                                                                        0,
                                                                                        2,
                                                                                        2,
                                                                                        4
                                                                                      ]),
                                                                                  new Uint32Array(/* array */[
                                                                                        0,
                                                                                        3,
                                                                                        0,
                                                                                        3,
                                                                                        3,
                                                                                        6
                                                                                      ]),
                                                                                  new Uint32Array(/* array */[
                                                                                        0,
                                                                                        3,
                                                                                        0,
                                                                                        3,
                                                                                        3,
                                                                                        6
                                                                                      ])
                                                                                ]);
                                                                    }));
                                                      }));
                                                Wonder_jest.test("reset offset", (function () {
                                                        var match = _prepare(state[0]);
                                                        var match$1 = match[2];
                                                        var match$2 = match[1];
                                                        var state$1 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(match$2[0], match$1[0], match[0]);
                                                        var state$2 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(match$2[2], match$1[2], state$1);
                                                        var match$3 = CustomGeometryTool$Wonderjs.getRecord(state$2);
                                                        var verticesOffset = match$3[/* verticesOffset */10];
                                                        var texCoordsOffset = match$3[/* texCoordsOffset */11];
                                                        var normalsOffset = match$3[/* normalsOffset */12];
                                                        var indicesOffset = match$3[/* indicesOffset */13];
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        verticesOffset,
                                                                        texCoordsOffset,
                                                                        normalsOffset,
                                                                        indicesOffset
                                                                      ]), /* tuple */[
                                                                    match[3][1].length,
                                                                    match[4][1].length,
                                                                    match[5][1].length,
                                                                    match[6][1].length
                                                                  ]);
                                                      }));
                                                Wonder_jest.test("clean disposedIndexMap", (function () {
                                                        var match = _prepare(state[0]);
                                                        var state$1 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(match[1][0], match[2][0], match[0]);
                                                        var match$1 = CustomGeometryTool$Wonderjs.getRecord(state$1);
                                                        var disposedIndexMap = match$1[/* disposedIndexMap */18];
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](disposedIndexMap), SparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                                      }));
                                                Wonder_jest.test("reset aliveIndexArray", (function () {
                                                        var match = _prepare(state[0]);
                                                        var match$1 = match[2];
                                                        var state$1 = GameObjectTool$Wonderjs.disposeGameObject(match[1][0], match[0]);
                                                        var match$2 = CustomGeometryTool$Wonderjs.createGameObject(state$1);
                                                        var gameObject4 = match$2[1];
                                                        var state$2 = GameObjectAPI$Wonderjs.initGameObject(gameObject4, match$2[0]);
                                                        var state$3 = GameObjectTool$Wonderjs.disposeGameObject(gameObject4, state$2);
                                                        var match$3 = CustomGeometryTool$Wonderjs.getRecord(state$3);
                                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$3[/* aliveIndexArray */19]), /* array */[
                                                                    match$1[1],
                                                                    match$1[2]
                                                                  ]);
                                                      }));
                                                describe("test add new one after dispose old one", (function () {
                                                        describe("if has disposed one", (function () {
                                                                return Wonder_jest.test("use disposed index as new index", (function () {
                                                                              var match = _prepare(state[0]);
                                                                              var match$1 = match[2];
                                                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(match[1][1], match$1[1], match[0]);
                                                                              var match$2 = CustomGeometryTool$Wonderjs.createGameObject(state$1);
                                                                              var gameObject4 = match$2[1];
                                                                              var state$2 = GameObjectAPI$Wonderjs.initGameObject(gameObject4, match$2[0]);
                                                                              var state$3 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(gameObject4, match$2[2], state$2);
                                                                              var match$3 = CustomGeometryTool$Wonderjs.createGameObject(state$3);
                                                                              var match$4 = CustomGeometryTool$Wonderjs.createGameObject(match$3[0]);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              match$1[0],
                                                                                              match$1[2],
                                                                                              match$3[2],
                                                                                              match$4[2]
                                                                                            ]), /* tuple */[
                                                                                          0,
                                                                                          2,
                                                                                          1,
                                                                                          3
                                                                                        ]);
                                                                            }));
                                                              }));
                                                        return Wonder_jest.test("else, increase record.index ", (function () {
                                                                      var match = _prepare(state[0]);
                                                                      var match$1 = CustomGeometryTool$Wonderjs.createGameObject(match[0]);
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[2]), match[2][2] + 1 | 0);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        describe("optimize: should only reallocate once in one loop", (function () {
                                                return Wonder_jest.test("test can correctly reallocate", (function () {
                                                              var match = ReallocateCustomGeometryCPUMemoryTool$Wonderjs.prepareForOptimize(state);
                                                              var match$1 = match[6];
                                                              var match$2 = match[5];
                                                              var match$3 = match[4];
                                                              var match$4 = match[3];
                                                              var match$5 = match[2];
                                                              var match$6 = match[1];
                                                              return ReallocateCustomGeometryCPUMemoryTool$Wonderjs.judgeForOptimize(match[0], /* tuple */[
                                                                          match$6[0],
                                                                          match$6[1],
                                                                          match$6[2]
                                                                        ], /* tuple */[
                                                                          match$5[0],
                                                                          match$5[1],
                                                                          match$5[2]
                                                                        ], /* tuple */[
                                                                          match$4[0],
                                                                          match$4[1],
                                                                          match$4[2]
                                                                        ], /* tuple */[
                                                                          match$3[0],
                                                                          match$3[1],
                                                                          match$3[2]
                                                                        ], /* tuple */[
                                                                          match$2[0],
                                                                          match$2[1],
                                                                          match$2[2]
                                                                        ], /* tuple */[
                                                                          match$1[0],
                                                                          match$1[1],
                                                                          match$1[2]
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("contract check", (function () {
                        return Wonder_jest.test("shouldn't dispose the alive component", (function () {
                                      var match = CustomGeometryTool$Wonderjs.createGameObject(state[0]);
                                      var geometry1 = match[2];
                                      var gameObject1 = match[1];
                                      var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                                      var state$2 = VboBufferTool$Wonderjs.addVboBufferToCustomGeometryBufferMap(geometry1, state$1);
                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$2);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                        GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$3);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("contract check", (function () {
                describe("check is alive", (function () {
                        describe("if geometry is disposed", (function () {
                                var _testGetFunc = function (getFunc) {
                                  var match = CustomGeometryTool$Wonderjs.createGameObject(state[0]);
                                  var geometry = match[2];
                                  var state$1 = VboBufferTool$Wonderjs.addVboBufferToCustomGeometryBufferMap(geometry, match[0]);
                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(match[1], geometry, state$1);
                                  return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                    return Curry._2(getFunc, geometry, state$2);
                                                  })));
                                };
                                var _testSetFunc = function (setFunc) {
                                  var match = CustomGeometryTool$Wonderjs.createGameObject(state[0]);
                                  var geometry = match[2];
                                  var state$1 = VboBufferTool$Wonderjs.addVboBufferToCustomGeometryBufferMap(geometry, match[0]);
                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(match[1], geometry, state$1);
                                  return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                    return Curry._3(setFunc, geometry, 0, state$2);
                                                  })));
                                };
                                Wonder_jest.test("getCustomGeometryVertices should error", (function () {
                                        return _testGetFunc(CustomGeometryAPI$Wonderjs.getCustomGeometryVertices);
                                      }));
                                Wonder_jest.test("getCustomGeometryTexCoords should error", (function () {
                                        return _testGetFunc(CustomGeometryAPI$Wonderjs.getCustomGeometryTexCoords);
                                      }));
                                Wonder_jest.test("getCustomGeometryNormals should error", (function () {
                                        return _testGetFunc(CustomGeometryAPI$Wonderjs.getCustomGeometryNormals);
                                      }));
                                Wonder_jest.test("getCustomGeometryIndices should error", (function () {
                                        return _testGetFunc(CustomGeometryAPI$Wonderjs.getCustomGeometryIndices);
                                      }));
                                Wonder_jest.test("unsafeGetCustomGeometryGameObject should error", (function () {
                                        return _testGetFunc(CustomGeometryAPI$Wonderjs.unsafeGetCustomGeometryGameObject);
                                      }));
                                Wonder_jest.test("setCustomGeometryVertices should error", (function () {
                                        return _testSetFunc(CustomGeometryAPI$Wonderjs.setCustomGeometryVertices);
                                      }));
                                Wonder_jest.test("setCustomGeometryTexCoords should error", (function () {
                                        return _testSetFunc(CustomGeometryAPI$Wonderjs.setCustomGeometryTexCoords);
                                      }));
                                Wonder_jest.test("setCustomGeometryNormals should error", (function () {
                                        return _testSetFunc(CustomGeometryAPI$Wonderjs.setCustomGeometryNormals);
                                      }));
                                return Wonder_jest.test("setCustomGeometryIndices should error", (function () {
                                              return _testSetFunc(CustomGeometryAPI$Wonderjs.setCustomGeometryIndices);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
