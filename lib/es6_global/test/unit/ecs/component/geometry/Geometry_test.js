

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as DisposeJob$Wonderjs from "../../../../../src/job/no_worker/loop/DisposeJob.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as GeometryTool$Wonderjs from "../../../../tool/service/geometry/GeometryTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as VboBufferTool$Wonderjs from "../../../../tool/service/vboBuffer/VboBufferTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as BasicMaterialTool$Wonderjs from "../../../../tool/service/material/BasicMaterialTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as RecordGeometryMainService$Wonderjs from "../../../../../src/service/state/main/geometry/RecordGeometryMainService.js";

describe("Geometry", (function () {
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
        describe("createGeometry", (function () {
                return Wonder_jest.test("create a new geometry which is just index(int)", (function () {
                              var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              RecordGeometryMainService$Wonderjs.getRecord(match[0])[/* index */0],
                                              match[1]
                                            ]), /* tuple */[
                                          1,
                                          0
                                        ]);
                            }));
              }));
        describe("getAllGeometrys", (function () {
                var _createGeometryGameObjects = function (state) {
                  var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                  var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
                  var match$2 = BoxGeometryTool$Wonderjs.createGameObject(match$1[0]);
                  return /* tuple */[
                          match$2[0],
                          /* tuple */[
                            match[1],
                            match$1[1],
                            match$2[1]
                          ],
                          /* tuple */[
                            match[2],
                            match$1[2],
                            match$2[2]
                          ]
                        ];
                };
                Wonder_jest.test("get all geometrys include the ones add or not add to gameObject", (function () {
                        var match = _createGeometryGameObjects(state);
                        var match$1 = match[2];
                        var match$2 = GeometryAPI$Wonderjs.createGeometry(match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.getAllGeometrys(match$2[0])), /* array */[
                                    match$1[0],
                                    match$1[1],
                                    match$1[2],
                                    match$2[1]
                                  ]);
                      }));
                return Wonder_jest.test("test dispose", (function () {
                              var match = _createGeometryGameObjects(state);
                              var match$1 = match[1];
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match$1[2], GameObjectAPI$Wonderjs.disposeGameObject(match$1[1], match[0]));
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllGeometryComponents(state$2)), /* array */[match[2][0]]);
                            }));
              }));
        describe("test set points", (function () {
                var _testSetVertexDataWithTypeArray = function (_, getFunc, setFunc) {
                  return Wonder_jest.test("directly set it", (function () {
                                var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
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
                        return _testSetVertexDataWithTypeArray("vertices", GeometryAPI$Wonderjs.getGeometryVertices, GeometryAPI$Wonderjs.setGeometryVertices);
                      }));
                describe("set texCoords with type array", (function () {
                        return _testSetVertexDataWithTypeArray("texCoords", GeometryAPI$Wonderjs.getGeometryTexCoords, GeometryAPI$Wonderjs.setGeometryTexCoords);
                      }));
                describe("set normals with type array", (function () {
                        return _testSetVertexDataWithTypeArray("normals", GeometryAPI$Wonderjs.getGeometryNormals, GeometryAPI$Wonderjs.setGeometryNormals);
                      }));
                describe("set indices with type array", (function () {
                        return Wonder_jest.test("directly set it", (function () {
                                      var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                                      var geometry = match[1];
                                      var newData = new Uint16Array(/* array */[
                                            3,
                                            5,
                                            5
                                          ]);
                                      var state$1 = GeometryAPI$Wonderjs.setGeometryIndices(geometry, newData, match[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.getGeometryIndices(geometry, state$1)), newData);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("hasGeometryVertices", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                              var geometry = match[1];
                              var state$1 = GeometryAPI$Wonderjs.setGeometryVertices(geometry, new Float32Array(/* array */[
                                        1,
                                        2,
                                        3
                                      ]), match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.hasGeometryVertices(geometry, state$1)), true);
                            }));
              }));
        describe("hasGeometryIndices", (function () {
                Wonder_jest.test("test indices16", (function () {
                        var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                        var geometry = match[1];
                        var state$1 = GeometryAPI$Wonderjs.setGeometryIndices(geometry, new Uint16Array(/* array */[
                                  1,
                                  2,
                                  3
                                ]), match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.hasGeometryIndices(geometry, state$1)), true);
                      }));
                return Wonder_jest.test("test indices32", (function () {
                              var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                              var geometry = match[1];
                              var state$1 = GeometryAPI$Wonderjs.setGeometryIndices32(geometry, new Uint32Array(/* array */[
                                        1,
                                        2,
                                        3
                                      ]), match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.hasGeometryIndices(geometry, state$1)), true);
                            }));
              }));
        describe("test setGeometryName", (function () {
                return Wonder_jest.test("test", (function () {
                              var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                              var geometry = match[1];
                              var name = "geo1";
                              var state$1 = GeometryAPI$Wonderjs.setGeometryName(geometry, name, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.unsafeGetGeometryName(geometry, state$1)), name);
                            }));
              }));
        describe("unsafeGetGeometryGameObjects", (function () {
                return Wonder_jest.test("get geometry's gameObjects", (function () {
                              var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                              var geometry = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject1 = match$1[1];
                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                              var gameObject2 = match$2[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject2, geometry, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject1, geometry, match$2[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(geometry, state$1)), /* array */[
                                          gameObject1,
                                          gameObject2
                                        ]);
                            }));
              }));
        describe("batchDisposeGeometry", (function () {
                var _exec = function (geometry1, state) {
                  var state$1 = GeometryAPI$Wonderjs.batchDisposeGeometry(/* array */[geometry1], state);
                  return DisposeJob$Wonderjs.execJob(undefined, state$1);
                };
                describe("if geometry has gameObjects", (function () {
                        var _prepare = function (state) {
                          var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                          var geometry1 = match[1];
                          var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                          var gameObject1 = match$1[1];
                          var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject1, geometry1, match$1[0]);
                          var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                          var gameObject2 = match$2[1];
                          var state$2 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject2, geometry1, match$2[0]);
                          return /* tuple */[
                                  /* tuple */[
                                    gameObject1,
                                    gameObject2
                                  ],
                                  geometry1,
                                  state$2
                                ];
                        };
                        var _prepareAndExec = function (state) {
                          var match = _prepare(state);
                          var geometry1 = match[1];
                          var match$1 = match[0];
                          var state$1 = _exec(geometry1, match[2]);
                          return /* tuple */[
                                  /* tuple */[
                                    match$1[0],
                                    match$1[1]
                                  ],
                                  geometry1,
                                  state$1
                                ];
                        };
                        Wonder_jest.test("remove from gameObject", (function () {
                                var match = _prepareAndExec(state);
                                var state$1 = match[2];
                                var match$1 = match[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent(match$1[0], state$1),
                                                GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent(match$1[1], state$1)
                                              ]), /* tuple */[
                                            false,
                                            false
                                          ]);
                              }));
                        describe("dispose geometry data", (function () {
                                Wonder_jest.test("remove gameObject", (function () {
                                        var match = _prepareAndExec(state);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.hasGameObject(match[1], match[2])), false);
                                      }));
                                return Wonder_jest.test("remove from nameMap", (function () {
                                              var match = _prepareAndExec(state);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.getName(match[1], match[2])), undefined);
                                            }));
                              }));
                        describe("dispose vbo buffer data", (function () {
                                return Wonder_jest.test("test", (function () {
                                              var match = _prepare(state);
                                              var geometry1 = match[1];
                                              var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry1, match[2]);
                                              var state$2 = _exec(geometry1, state$1);
                                              var match$1 = VboBufferTool$Wonderjs.getRecord(state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryVertexBufferMap */0])), false);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("else", (function () {
                        var _prepare = function (state) {
                          var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                          return /* tuple */[
                                  match[1],
                                  match[0]
                                ];
                        };
                        var _prepareAndExec = function (state) {
                          var match = _prepare(state);
                          var geometry1 = match[0];
                          var state$1 = _exec(geometry1, match[1]);
                          return /* tuple */[
                                  geometry1,
                                  state$1
                                ];
                        };
                        describe("dispose geometry data", (function () {
                                Wonder_jest.test("remove gameObject", (function () {
                                        var match = _prepareAndExec(state);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.hasGameObject(match[0], match[1])), false);
                                      }));
                                return Wonder_jest.test("remove from nameMap", (function () {
                                              var match = _prepareAndExec(state);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.getName(match[0], match[1])), undefined);
                                            }));
                              }));
                        describe("dispose vbo buffer data", (function () {
                                return Wonder_jest.test("test", (function () {
                                              var match = _prepare(state);
                                              var geometry1 = match[0];
                                              var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry1, match[1]);
                                              var state$2 = _exec(geometry1, state$1);
                                              var match$1 = VboBufferTool$Wonderjs.getRecord(state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryVertexBufferMap */0])), false);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("dispose component", (function () {
                describe("dispose data", (function () {
                        Wonder_jest.test("remove point data", (function () {
                                var match = GeometryTool$Wonderjs.createGameObjectAndSetPointData(state[0]);
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1], match[2], match[0]);
                                var match$1 = GeometryAPI$Wonderjs.createGeometry(state$1);
                                var geometry2 = match$1[1];
                                var state$2 = match$1[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                GeometryAPI$Wonderjs.getGeometryVertices(geometry2, state$2),
                                                GeometryAPI$Wonderjs.getGeometryTexCoords(geometry2, state$2),
                                                GeometryAPI$Wonderjs.getGeometryNormals(geometry2, state$2),
                                                GeometryAPI$Wonderjs.getGeometryIndices(geometry2, state$2)
                                              ]), /* tuple */[
                                            new Float32Array(/* array */[]),
                                            new Float32Array(/* array */[]),
                                            new Float32Array(/* array */[]),
                                            new Uint16Array(/* array */[])
                                          ]);
                              }));
                        describe("test dispose shared geometry", (function () {
                                return Wonder_jest.test("remove gameObject", (function () {
                                              var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                                              var geometry1 = match[1];
                                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                              var gameObject1 = match$1[1];
                                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject1, geometry1, match$1[0]);
                                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                              var gameObject2 = match$2[1];
                                              var state$2 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject2, geometry1, match$2[0]);
                                              var match$3 = GameObjectAPI$Wonderjs.createGameObject(state$2);
                                              var gameObject3 = match$3[1];
                                              var state$3 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject3, geometry1, match$3[0]);
                                              var state$4 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$3);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(geometry1, state$4)), /* array */[
                                                          gameObject3,
                                                          gameObject2
                                                        ]);
                                            }));
                              }));
                        describe("test dispose not shared geometry", (function () {
                                var _prepare = function (state) {
                                  var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                  var geometry1 = match[2];
                                  var gameObject1 = match[1];
                                  var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry1, match[0]);
                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$1);
                                  return /* tuple */[
                                          state$2,
                                          gameObject1,
                                          geometry1
                                        ];
                                };
                                return Wonder_jest.test("remove from gameObjectsMap, nameMap", (function () {
                                              var match = _prepare(state);
                                              var geometry1 = match[2];
                                              var state$1 = match[0];
                                              var match$1 = GeometryTool$Wonderjs.getRecord(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              GeometryTool$Wonderjs.hasGameObject(geometry1, state$1),
                                                              SparseMapService$WonderCommonlib.has(geometry1, match$1[/* nameMap */20])
                                                            ]), /* tuple */[
                                                          false,
                                                          false
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("contract check", (function () {
                        return Wonder_jest.test("shouldn't dispose the alive component", (function () {
                                      var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                      var geometry1 = match[2];
                                      var gameObject1 = match[1];
                                      var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                                      var state$2 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry1, state$1);
                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$2);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                        GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$3);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                describe("fix bug", (function () {
                        return Wonder_jest.test("if have create other gameObjects, shouldn't affect dispose geometry gameObjects", (function () {
                                      var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                      var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
                                      var state$1 = DisposeJob$Wonderjs.execJob(undefined, GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[
                                                match[1],
                                                match$1[1]
                                              ], match$1[0]));
                                      var match$2 = GeometryTool$Wonderjs.createGameObject(state$1);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(match$2[2], match$2[0])), /* array */[match$2[1]]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("contract check", (function () {
                describe("check is alive", (function () {
                        describe("if geometry is disposed", (function () {
                                var _testGetFunc = function (getFunc) {
                                  var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                  var geometry = match[2];
                                  var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry, match[0]);
                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1], geometry, state$1);
                                  return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                    return Curry._2(getFunc, geometry, state$2);
                                                  })));
                                };
                                var _testSetFunc = function (setFunc) {
                                  var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                  var geometry = match[2];
                                  var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry, match[0]);
                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1], geometry, state$1);
                                  return Wonder_jest.Expect[/* toThrowMessage */20]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                    return Curry._3(setFunc, geometry, 0, state$2);
                                                  })));
                                };
                                Wonder_jest.test("getGeometryVertices should error", (function () {
                                        return _testGetFunc(GeometryAPI$Wonderjs.getGeometryVertices);
                                      }));
                                Wonder_jest.test("getGeometryTexCoords should error", (function () {
                                        return _testGetFunc(GeometryAPI$Wonderjs.getGeometryTexCoords);
                                      }));
                                Wonder_jest.test("getGeometryNormals should error", (function () {
                                        return _testGetFunc(GeometryAPI$Wonderjs.getGeometryNormals);
                                      }));
                                Wonder_jest.test("getGeometryIndices should error", (function () {
                                        return _testGetFunc(GeometryAPI$Wonderjs.getGeometryIndices);
                                      }));
                                Wonder_jest.test("unsafeGetGeometryGameObjects should error", (function () {
                                        return _testGetFunc(GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects);
                                      }));
                                Wonder_jest.test("setGeometryVertices should error", (function () {
                                        return _testSetFunc(GeometryAPI$Wonderjs.setGeometryVertices);
                                      }));
                                Wonder_jest.test("setGeometryTexCoords should error", (function () {
                                        return _testSetFunc(GeometryAPI$Wonderjs.setGeometryTexCoords);
                                      }));
                                Wonder_jest.test("setGeometryNormals should error", (function () {
                                        return _testSetFunc(GeometryAPI$Wonderjs.setGeometryNormals);
                                      }));
                                return Wonder_jest.test("setGeometryIndices should error", (function () {
                                              return _testSetFunc(GeometryAPI$Wonderjs.setGeometryIndices);
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
