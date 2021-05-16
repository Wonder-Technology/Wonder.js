'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var DisposeJob$Wonderjs = require("../../../../../src/job/no_worker/loop/DisposeJob.js");
var GeometryAPI$Wonderjs = require("../../../../../src/api/geometry/GeometryAPI.js");
var GeometryTool$Wonderjs = require("../../../../tool/service/geometry/GeometryTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var VboBufferTool$Wonderjs = require("../../../../tool/service/vboBuffer/VboBufferTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var BasicMaterialTool$Wonderjs = require("../../../../tool/service/material/BasicMaterialTool.js");
var RecordGeometryMainService$Wonderjs = require("../../../../../src/service/state/main/geometry/RecordGeometryMainService.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

Wonder_jest.describe("Geometry", (function (param) {
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
        Wonder_jest.describe("createGeometry", (function (param) {
                return Wonder_jest.test("create a new geometry which is just index(int)", (function (param) {
                              var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              RecordGeometryMainService$Wonderjs.getRecord(match[0])[/* index */0],
                                              match[1]
                                            ]), /* tuple */[
                                          1,
                                          0
                                        ]);
                            }));
              }));
        Wonder_jest.describe("getAllGeometrys", (function (param) {
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
                Wonder_jest.test("get all geometrys include the ones add or not add to gameObject", (function (param) {
                        var match = _createGeometryGameObjects(state);
                        var match$1 = match[2];
                        var match$2 = GeometryAPI$Wonderjs.createGeometry(match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.getAllGeometrys(match$2[0])), /* array */[
                                    match$1[0],
                                    match$1[1],
                                    match$1[2],
                                    match$2[1]
                                  ]);
                      }));
                return Wonder_jest.test("test dispose", (function (param) {
                              var match = _createGeometryGameObjects(state);
                              var match$1 = match[1];
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match$1[2], GameObjectAPI$Wonderjs.disposeGameObject(match$1[1], match[0]));
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.getAllGeometryComponents(state$2)), /* array */[match[2][0]]);
                            }));
              }));
        Wonder_jest.describe("test set points", (function (param) {
                var _testSetVertexDataWithTypeArray = function (type_, getFunc, setFunc) {
                  return Wonder_jest.test("directly set it", (function (param) {
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
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(getFunc, geometry, state$2)), newData);
                              }));
                };
                Wonder_jest.describe("set vertices with type array", (function (param) {
                        return _testSetVertexDataWithTypeArray("vertices", GeometryAPI$Wonderjs.getGeometryVertices, GeometryAPI$Wonderjs.setGeometryVertices);
                      }));
                Wonder_jest.describe("set texCoords with type array", (function (param) {
                        return _testSetVertexDataWithTypeArray("texCoords", GeometryAPI$Wonderjs.getGeometryTexCoords, GeometryAPI$Wonderjs.setGeometryTexCoords);
                      }));
                Wonder_jest.describe("set normals with type array", (function (param) {
                        return _testSetVertexDataWithTypeArray("normals", GeometryAPI$Wonderjs.getGeometryNormals, GeometryAPI$Wonderjs.setGeometryNormals);
                      }));
                return Wonder_jest.describe("set indices with type array", (function (param) {
                              return Wonder_jest.test("directly set it", (function (param) {
                                            var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                                            var geometry = match[1];
                                            var newData = new Uint16Array(/* array */[
                                                  3,
                                                  5,
                                                  5
                                                ]);
                                            var state$1 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry, newData, match[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.getGeometryIndices16(geometry, state$1)), newData);
                                          }));
                            }));
              }));
        Wonder_jest.describe("hasGeometryVertices", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                              var geometry = match[1];
                              var state$1 = GeometryAPI$Wonderjs.setGeometryVertices(geometry, new Float32Array(/* array */[
                                        1,
                                        2,
                                        3
                                      ]), match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.hasGeometryVertices(geometry, state$1)), true);
                            }));
              }));
        Wonder_jest.describe("test geometry has indices", (function (param) {
                var _testIndices16 = function (hasIndicesFunc, result) {
                  var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                  var geometry = match[1];
                  var state$1 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry, new Uint16Array(/* array */[
                            1,
                            2,
                            3
                          ]), match[0]);
                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(hasIndicesFunc, geometry, state$1)), result);
                };
                var _testIndices32 = function (hasIndicesFunc, result) {
                  var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                  var geometry = match[1];
                  var state$1 = GeometryAPI$Wonderjs.setGeometryIndices32(geometry, new Uint32Array(/* array */[
                            1,
                            2,
                            3
                          ]), match[0]);
                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._2(hasIndicesFunc, geometry, state$1)), result);
                };
                Wonder_jest.describe("hasGeometryIndices", (function (param) {
                        Wonder_jest.test("if has indices16, return true", (function (param) {
                                return _testIndices16(GeometryAPI$Wonderjs.hasGeometryIndices, true);
                              }));
                        return Wonder_jest.test("if has indices32, return true", (function (param) {
                                      return _testIndices32(GeometryAPI$Wonderjs.hasGeometryIndices, true);
                                    }));
                      }));
                Wonder_jest.describe("hasGeometryIndices16", (function (param) {
                        Wonder_jest.test("if has indices16, return true", (function (param) {
                                return _testIndices16(GeometryAPI$Wonderjs.hasGeometryIndices16, true);
                              }));
                        return Wonder_jest.test("if has indices32, return false", (function (param) {
                                      return _testIndices32(GeometryAPI$Wonderjs.hasGeometryIndices16, false);
                                    }));
                      }));
                return Wonder_jest.describe("hasGeometryIndices32", (function (param) {
                              Wonder_jest.test("if has indices16, return false", (function (param) {
                                      return _testIndices16(GeometryAPI$Wonderjs.hasGeometryIndices32, false);
                                    }));
                              return Wonder_jest.test("if has indices32, return true", (function (param) {
                                            return _testIndices32(GeometryAPI$Wonderjs.hasGeometryIndices32, true);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test setGeometryName", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                              var geometry = match[1];
                              var name = "geo1";
                              var state$1 = GeometryAPI$Wonderjs.setGeometryName(geometry, name, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.unsafeGetGeometryName(geometry, state$1)), name);
                            }));
              }));
        Wonder_jest.describe("unsafeGetGeometryGameObjects", (function (param) {
                return Wonder_jest.test("get geometry's gameObjects", (function (param) {
                              var match = GeometryAPI$Wonderjs.createGeometry(state[0]);
                              var geometry = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject1 = match$1[1];
                              var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                              var gameObject2 = match$2[1];
                              var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject2, geometry, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject1, geometry, match$2[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(geometry, state$1)), /* array */[
                                          gameObject1,
                                          gameObject2
                                        ]);
                            }));
              }));
        Wonder_jest.describe("batchDisposeGeometry", (function (param) {
                var _exec = function (geometry1, state) {
                  var state$1 = GeometryAPI$Wonderjs.batchDisposeGeometry(/* array */[geometry1], state);
                  return DisposeJob$Wonderjs.execJob(undefined, state$1);
                };
                Wonder_jest.describe("if geometry has gameObjects", (function (param) {
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
                        Wonder_jest.test("remove from gameObject", (function (param) {
                                var match = _prepareAndExec(state);
                                var state$1 = match[2];
                                var match$1 = match[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent(match$1[0], state$1),
                                                GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent(match$1[1], state$1)
                                              ]), /* tuple */[
                                            false,
                                            false
                                          ]);
                              }));
                        Wonder_jest.describe("dispose geometry data", (function (param) {
                                Wonder_jest.test("remove gameObject", (function (param) {
                                        var match = _prepareAndExec(state);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.hasGameObject(match[1], match[2])), false);
                                      }));
                                return Wonder_jest.test("remove from nameMap", (function (param) {
                                              var match = _prepareAndExec(state);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.getName(match[1], match[2])), undefined);
                                            }));
                              }));
                        return Wonder_jest.describe("dispose vbo buffer data", (function (param) {
                                      return Wonder_jest.test("test", (function (param) {
                                                    var match = _prepare(state);
                                                    var geometry1 = match[1];
                                                    var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry1, match[2]);
                                                    var state$2 = _exec(geometry1, state$1);
                                                    var match$1 = VboBufferTool$Wonderjs.getRecord(state$2);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryVertexBufferMap */0])), false);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("else", (function (param) {
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
                              Wonder_jest.describe("dispose geometry data", (function (param) {
                                      Wonder_jest.test("remove gameObject", (function (param) {
                                              var match = _prepareAndExec(state);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.hasGameObject(match[0], match[1])), false);
                                            }));
                                      return Wonder_jest.test("remove from nameMap", (function (param) {
                                                    var match = _prepareAndExec(state);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.getName(match[0], match[1])), undefined);
                                                  }));
                                    }));
                              return Wonder_jest.describe("dispose vbo buffer data", (function (param) {
                                            return Wonder_jest.test("test", (function (param) {
                                                          var match = _prepare(state);
                                                          var geometry1 = match[0];
                                                          var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry1, match[1]);
                                                          var state$2 = _exec(geometry1, state$1);
                                                          var match$1 = VboBufferTool$Wonderjs.getRecord(state$2);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryVertexBufferMap */0])), false);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("dispose component", (function (param) {
                Wonder_jest.describe("dispose data", (function (param) {
                        Wonder_jest.test("remove point data", (function (param) {
                                var match = GeometryTool$Wonderjs.createGameObjectAndSetPointData(state[0]);
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1], match[2], match[0]);
                                var match$1 = GeometryAPI$Wonderjs.createGeometry(state$1);
                                var geometry2 = match$1[1];
                                var state$2 = match$1[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                GeometryAPI$Wonderjs.getGeometryVertices(geometry2, state$2),
                                                GeometryAPI$Wonderjs.getGeometryTexCoords(geometry2, state$2),
                                                GeometryAPI$Wonderjs.getGeometryNormals(geometry2, state$2),
                                                GeometryAPI$Wonderjs.getGeometryIndices16(geometry2, state$2)
                                              ]), /* tuple */[
                                            new Float32Array(/* array */[]),
                                            new Float32Array(/* array */[]),
                                            new Float32Array(/* array */[]),
                                            new Uint16Array(/* array */[])
                                          ]);
                              }));
                        Wonder_jest.describe("test dispose shared geometry", (function (param) {
                                return Wonder_jest.describe("remove gamemObject", (function (param) {
                                              var _prepare = function (state) {
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
                                                return /* tuple */[
                                                        state$3,
                                                        /* tuple */[
                                                          gameObject1,
                                                          gameObject2,
                                                          gameObject3
                                                        ],
                                                        geometry1
                                                      ];
                                              };
                                              Wonder_jest.test("test remove one gameObjecct", (function (param) {
                                                      var match = _prepare(state);
                                                      var geometry1 = match[2];
                                                      var match$1 = match[1];
                                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match$1[0], geometry1, match[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(geometry1, state$1)), /* array */[
                                                                  match$1[1],
                                                                  match$1[2]
                                                                ]);
                                                    }));
                                              Wonder_jest.test("test remove two gameObjeccts", (function (param) {
                                                      var match = _prepare(state);
                                                      var geometry1 = match[2];
                                                      var match$1 = match[1];
                                                      var state$1 = GameObjectTool$Wonderjs.batchDisposeGameObjectsGeometryComponentWithoutVboBuffer(/* array */[
                                                            match$1[2],
                                                            match$1[1]
                                                          ], geometry1, match[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(geometry1, state$1)), /* array */[match$1[0]]);
                                                    }));
                                              return Wonder_jest.test("test remove all gameObjeccts", (function (param) {
                                                            var match = _prepare(state);
                                                            var geometry1 = match[2];
                                                            var match$1 = match[1];
                                                            var state$1 = GameObjectTool$Wonderjs.batchDisposeGameObjectsGeometryComponentWithoutVboBuffer(/* array */[
                                                                  match$1[0],
                                                                  match$1[1],
                                                                  match$1[2]
                                                                ], geometry1, match[0]);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryTool$Wonderjs.hasGameObject(geometry1, state$1)), false);
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.describe("test dispose not shared geometry", (function (param) {
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
                                      return Wonder_jest.test("remove from gameObjectsMap, nameMap", (function (param) {
                                                    var match = _prepare(state);
                                                    var geometry1 = match[2];
                                                    var state$1 = match[0];
                                                    var match$1 = GeometryTool$Wonderjs.getRecord(state$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    GeometryTool$Wonderjs.hasGameObject(geometry1, state$1),
                                                                    MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* nameMap */20])
                                                                  ]), /* tuple */[
                                                                false,
                                                                false
                                                              ]);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("contract check", (function (param) {
                        return Wonder_jest.test("shouldn't dispose the alive component", (function (param) {
                                      var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                      var geometry1 = match[2];
                                      var gameObject1 = match[1];
                                      var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                                      var state$2 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry1, state$1);
                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$2);
                                      return Wonder_jest.Expect[/* toThrowMessage */21]("expect dispose the alive component, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                        GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(gameObject1, geometry1, state$3);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                return Wonder_jest.describe("fix bug", (function (param) {
                              return Wonder_jest.test("if have create other gameObjects, shouldn't affect dispose geometry gameObjects", (function (param) {
                                            var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                            var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
                                            var state$1 = DisposeJob$Wonderjs.execJob(undefined, GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[
                                                      match[1],
                                                      match$1[1]
                                                    ], match$1[0]));
                                            var match$2 = GeometryTool$Wonderjs.createGameObject(state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(match$2[2], match$2[0])), /* array */[match$2[1]]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("contract check", (function (param) {
                      return Wonder_jest.describe("check is alive", (function (param) {
                                    return Wonder_jest.describe("if geometry is disposed", (function (param) {
                                                  var _testGetFunc = function (getFunc) {
                                                    var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                                    var geometry = match[2];
                                                    var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry, match[0]);
                                                    var state$2 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1], geometry, state$1);
                                                    return Wonder_jest.Expect[/* toThrowMessage */21]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                      return Curry._2(getFunc, geometry, state$2);
                                                                    })));
                                                  };
                                                  var _testSetFunc = function (setFunc) {
                                                    var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                                    var geometry = match[2];
                                                    var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry, match[0]);
                                                    var state$2 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1], geometry, state$1);
                                                    return Wonder_jest.Expect[/* toThrowMessage */21]("expect component alive, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                      return Curry._3(setFunc, geometry, 0, state$2);
                                                                    })));
                                                  };
                                                  Wonder_jest.test("getGeometryVertices should error", (function (param) {
                                                          return _testGetFunc(GeometryAPI$Wonderjs.getGeometryVertices);
                                                        }));
                                                  Wonder_jest.test("getGeometryTexCoords should error", (function (param) {
                                                          return _testGetFunc(GeometryAPI$Wonderjs.getGeometryTexCoords);
                                                        }));
                                                  Wonder_jest.test("getGeometryNormals should error", (function (param) {
                                                          return _testGetFunc(GeometryAPI$Wonderjs.getGeometryNormals);
                                                        }));
                                                  Wonder_jest.test("getGeometryIndices16 should error", (function (param) {
                                                          return _testGetFunc(GeometryAPI$Wonderjs.getGeometryIndices16);
                                                        }));
                                                  Wonder_jest.test("unsafeGetGeometryGameObjects should error", (function (param) {
                                                          return _testGetFunc(GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects);
                                                        }));
                                                  Wonder_jest.test("setGeometryVertices should error", (function (param) {
                                                          return _testSetFunc(GeometryAPI$Wonderjs.setGeometryVertices);
                                                        }));
                                                  Wonder_jest.test("setGeometryTexCoords should error", (function (param) {
                                                          return _testSetFunc(GeometryAPI$Wonderjs.setGeometryTexCoords);
                                                        }));
                                                  Wonder_jest.test("setGeometryNormals should error", (function (param) {
                                                          return _testSetFunc(GeometryAPI$Wonderjs.setGeometryNormals);
                                                        }));
                                                  return Wonder_jest.test("setGeometryIndices16 should error", (function (param) {
                                                                return _testSetFunc(GeometryAPI$Wonderjs.setGeometryIndices16);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
