

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as GeometryTool$Wonderjs from "../../../../tool/service/geometry/GeometryTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as QueryCPUMemoryService$Wonderjs from "../../../../../src/service/record/main/memory/QueryCPUMemoryService.js";
import * as ReallocateGeometryCPUMemoryTool$Wonderjs from "../../../../tool/reallocate/ReallocateGeometryCPUMemoryTool.js";

Wonder_jest.describe("test reallocate cpu memory job", (function (param) {
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
        Wonder_jest.describe("isGeometryBufferNearlyFull", (function (param) {
                Wonder_jest.test("if nearly full, return true", (function (param) {
                        var newrecord = Caml_array.caml_array_dup(GeometryTool$Wonderjs.getRecord(state[0]));
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](QueryCPUMemoryService$Wonderjs.isGeometryBufferNearlyFull(0.8, (newrecord[/* vertices */2] = new Float32Array(100), newrecord[/* verticesOffset */11] = 80, newrecord))), true);
                      }));
                return Wonder_jest.test("else, return false", (function (param) {
                              var newrecord = Caml_array.caml_array_dup(GeometryTool$Wonderjs.getRecord(state[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](QueryCPUMemoryService$Wonderjs.isGeometryBufferNearlyFull(0.8, (newrecord[/* vertices */2] = new Float32Array(100), newrecord[/* verticesOffset */11] = 79, newrecord))), false);
                            }));
              }));
        Wonder_jest.describe("test reallocate geometry", (function (param) {
                var _prepare = function (state) {
                  return GeometryTool$Wonderjs.createThreeGameObjectsAndSetFullPointData(SettingTool$Wonderjs.setMemory(state, 1, /* () */0));
                };
                Wonder_jest.describe("if have dispose too many geometrys, reallocate", (function (param) {
                        Wonder_jest.describe("test type array data", (function (param) {
                                return Wonder_jest.describe("pack old type array with alived data", (function (param) {
                                              Wonder_jest.test("test indices and indices32", (function (param) {
                                                      var state$1 = SettingTool$Wonderjs.setMemory(state[0], 1, /* () */0);
                                                      var indices1 = new Uint16Array(/* array */[
                                                            2,
                                                            1,
                                                            0
                                                          ]);
                                                      var indices3 = new Uint16Array(/* array */[
                                                            0,
                                                            1,
                                                            2
                                                          ]);
                                                      var indices4 = new Uint16Array(/* array */[
                                                            3,
                                                            2,
                                                            5
                                                          ]);
                                                      var indices32_2 = new Uint32Array(/* array */[
                                                            2,
                                                            9,
                                                            1
                                                          ]);
                                                      var match = GeometryTool$Wonderjs.createGameObject(state$1);
                                                      var geometry1 = match[2];
                                                      var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
                                                      var geometry2 = match$1[2];
                                                      var match$2 = GeometryTool$Wonderjs.createGameObject(match$1[0]);
                                                      var geometry3 = match$2[2];
                                                      var match$3 = GeometryTool$Wonderjs.createGameObject(match$2[0]);
                                                      var geometry4 = match$3[2];
                                                      var state$2 = GeometryAPI$Wonderjs.setGeometryIndices32(geometry2, indices32_2, GeometryAPI$Wonderjs.setGeometryIndices16(geometry4, indices4, GeometryAPI$Wonderjs.setGeometryIndices16(geometry3, indices3, GeometryAPI$Wonderjs.setGeometryIndices16(geometry1, indices1, match$3[0]))));
                                                      var state$3 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1], geometry1, state$2);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      GeometryAPI$Wonderjs.getGeometryIndices16(geometry3, state$3),
                                                                      GeometryAPI$Wonderjs.getGeometryIndices16(geometry4, state$3),
                                                                      GeometryAPI$Wonderjs.getGeometryIndices32(geometry2, state$3)
                                                                    ]), /* tuple */[
                                                                  indices3,
                                                                  indices4,
                                                                  indices32_2
                                                                ]);
                                                    }));
                                              Wonder_jest.test("alive geometry's points should exist", (function (param) {
                                                      var match = _prepare(state[0]);
                                                      var match$1 = match[6];
                                                      var match$2 = match$1[1];
                                                      var match$3 = match$1[0];
                                                      var match$4 = match[5];
                                                      var match$5 = match[4];
                                                      var match$6 = match[3];
                                                      var match$7 = match[2];
                                                      var geometry3 = match$7[2];
                                                      var geometry2 = match$7[1];
                                                      var state$1 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1][0], match$7[0], match[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      GeometryAPI$Wonderjs.getGeometryVertices(geometry2, state$1),
                                                                      GeometryAPI$Wonderjs.getGeometryTexCoords(geometry2, state$1),
                                                                      GeometryAPI$Wonderjs.getGeometryNormals(geometry2, state$1),
                                                                      GeometryAPI$Wonderjs.getGeometryIndices16(geometry2, state$1),
                                                                      GeometryAPI$Wonderjs.getGeometryIndices32(geometry2, state$1),
                                                                      GeometryAPI$Wonderjs.getGeometryVertices(geometry3, state$1),
                                                                      GeometryAPI$Wonderjs.getGeometryTexCoords(geometry3, state$1),
                                                                      GeometryAPI$Wonderjs.getGeometryNormals(geometry3, state$1),
                                                                      GeometryAPI$Wonderjs.getGeometryIndices16(geometry3, state$1),
                                                                      GeometryAPI$Wonderjs.getGeometryIndices32(geometry3, state$1)
                                                                    ]), /* tuple */[
                                                                  match$6[1],
                                                                  match$5[1],
                                                                  match$4[1],
                                                                  match$3[1],
                                                                  match$2[1],
                                                                  match$6[2],
                                                                  match$5[2],
                                                                  match$4[2],
                                                                  match$3[2],
                                                                  match$2[2]
                                                                ]);
                                                    }));
                                              return Wonder_jest.test("type array should be packed", (function (param) {
                                                            var match = _prepare(state[0]);
                                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1][1], match[2][1], match[0]);
                                                            var match$1 = GeometryTool$Wonderjs.getRecord(state$1);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            match$1[/* vertices */2].slice(0, 10),
                                                                            match$1[/* texCoords */3].slice(0, 10),
                                                                            match$1[/* normals */4].slice(0, 10),
                                                                            match$1[/* indices16 */5].slice(0, 10),
                                                                            match$1[/* indices32 */6].slice(0, 10)
                                                                          ]), /* tuple */[
                                                                        new Float32Array(/* array */[
                                                                              11,
                                                                              10,
                                                                              11,
                                                                              4,
                                                                              3,
                                                                              2,
                                                                              4,
                                                                              3,
                                                                              2,
                                                                              0
                                                                            ]),
                                                                        new Float32Array(/* array */[
                                                                              0.5,
                                                                              1.5,
                                                                              1,
                                                                              0.5,
                                                                              1,
                                                                              0.5,
                                                                              0,
                                                                              0,
                                                                              0,
                                                                              0
                                                                            ]),
                                                                        new Float32Array(/* array */[
                                                                              1,
                                                                              3,
                                                                              3,
                                                                              5,
                                                                              4,
                                                                              2,
                                                                              5,
                                                                              4,
                                                                              2,
                                                                              0
                                                                            ]),
                                                                        new Uint16Array(/* array */[
                                                                              2,
                                                                              0,
                                                                              1,
                                                                              1,
                                                                              0,
                                                                              2,
                                                                              1,
                                                                              0,
                                                                              2,
                                                                              0
                                                                            ]),
                                                                        new Uint32Array(/* array */[
                                                                              1,
                                                                              2,
                                                                              0,
                                                                              1,
                                                                              0,
                                                                              2,
                                                                              1,
                                                                              0,
                                                                              2,
                                                                              0
                                                                            ])
                                                                      ]);
                                                          }));
                                            }));
                              }));
                        Wonder_jest.describe("test info array", (function (param) {
                                return Wonder_jest.test("update startIndex, endIndex for packed type array", (function (param) {
                                              var match = _prepare(state[0]);
                                              var state$1 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1][0], match[2][0], match[0]);
                                              var match$1 = GeometryTool$Wonderjs.getRecord(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              match$1[/* verticesInfos */7].slice(0, 6),
                                                              match$1[/* texCoordsInfos */8].slice(0, 6),
                                                              match$1[/* normalsInfos */9].slice(0, 6),
                                                              match$1[/* indicesInfos */10].slice(0, 6)
                                                            ]), /* tuple */[
                                                          new Uint32Array(/* array */[
                                                                0,
                                                                0,
                                                                0,
                                                                3,
                                                                3,
                                                                6
                                                              ]),
                                                          new Uint32Array(/* array */[
                                                                0,
                                                                0,
                                                                0,
                                                                2,
                                                                2,
                                                                4
                                                              ]),
                                                          new Uint32Array(/* array */[
                                                                0,
                                                                0,
                                                                0,
                                                                3,
                                                                3,
                                                                6
                                                              ]),
                                                          new Uint32Array(/* array */[
                                                                0,
                                                                0,
                                                                0,
                                                                3,
                                                                3,
                                                                6
                                                              ])
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.test("reset offset", (function (param) {
                                var match = _prepare(state[0]);
                                var match$1 = match[6];
                                var match$2 = match[2];
                                var match$3 = match[1];
                                var state$1 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match$3[0], match$2[0], match[0]);
                                var state$2 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match$3[2], match$2[2], state$1);
                                var match$4 = GeometryTool$Wonderjs.getRecord(state$2);
                                var verticesOffset = match$4[/* verticesOffset */11];
                                var texCoordsOffset = match$4[/* texCoordsOffset */12];
                                var normalsOffset = match$4[/* normalsOffset */13];
                                var indices16Offset = match$4[/* indices16Offset */14];
                                var indices32Offset = match$4[/* indices32Offset */15];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                verticesOffset,
                                                texCoordsOffset,
                                                normalsOffset,
                                                indices16Offset,
                                                indices32Offset
                                              ]), /* tuple */[
                                            match[3][1].length,
                                            match[4][1].length,
                                            match[5][1].length,
                                            match$1[0][1].length,
                                            match$1[1][1].length
                                          ]);
                              }));
                        return Wonder_jest.describe("test add new one after dispose old one", (function (param) {
                                      Wonder_jest.describe("if has disposed one", (function (param) {
                                              return Wonder_jest.test("use disposed index as new index", (function (param) {
                                                            var match = _prepare(state[0]);
                                                            var match$1 = match[2];
                                                            var state$1 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1][1], match$1[1], match[0]);
                                                            var match$2 = GeometryTool$Wonderjs.createGameObject(state$1);
                                                            var gameObject4 = match$2[1];
                                                            var state$2 = GameObjectAPI$Wonderjs.initGameObject(gameObject4, match$2[0]);
                                                            var state$3 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(gameObject4, match$2[2], state$2);
                                                            var match$3 = GeometryTool$Wonderjs.createGameObject(state$3);
                                                            var match$4 = GeometryTool$Wonderjs.createGameObject(match$3[0]);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                      return Wonder_jest.test("else, increase record.index ", (function (param) {
                                                    var match = _prepare(state[0]);
                                                    var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[2]), match[2][2] + 1 | 0);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("if geometry buffer nearly full, reallocate", (function (param) {
                        return Wonder_jest.test("test pack vertices", (function (param) {
                                      var newrecord = Caml_array.caml_array_dup(state[0]);
                                      var newrecord$1 = Caml_array.caml_array_dup(GeometryTool$Wonderjs.getRecord(state[0]));
                                      newrecord[/* geometryRecord */23] = (newrecord$1[/* vertices */2] = new Float32Array(100), newrecord$1[/* verticesOffset */11] = 84, newrecord$1);
                                      var vertices1 = new Float32Array(/* array */[
                                            2,
                                            1,
                                            -1
                                          ]);
                                      var vertices2 = new Float32Array(/* array */[
                                            4,
                                            2,
                                            1
                                          ]);
                                      var match = GeometryTool$Wonderjs.createGameObject(newrecord);
                                      var geometry1 = match[2];
                                      var match$1 = GeometryTool$Wonderjs.createGameObject(match[0]);
                                      var state$1 = GeometryAPI$Wonderjs.setGeometryVertices(match$1[2], vertices2, GeometryAPI$Wonderjs.setGeometryVertices(geometry1, vertices1, match$1[0]));
                                      var state$2 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBuffer(match[1], geometry1, state$1);
                                      var match$2 = GeometryTool$Wonderjs.getRecord(state$2);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$2[/* vertices */2].slice(0, 6)), new Float32Array(/* array */[
                                                      4,
                                                      2,
                                                      1,
                                                      0,
                                                      0,
                                                      0
                                                    ]));
                                    }));
                      }));
                return Wonder_jest.describe("optimize: should only reallocate once in one loop", (function (param) {
                              return Wonder_jest.test("test can correctly reallocate", (function (param) {
                                            var match = ReallocateGeometryCPUMemoryTool$Wonderjs.prepareForOptimize(state);
                                            var match$1 = match[6];
                                            var match$2 = match$1[1];
                                            var match$3 = match$1[0];
                                            var match$4 = match[5];
                                            var match$5 = match[4];
                                            var match$6 = match[3];
                                            var match$7 = match[2];
                                            var match$8 = match[1];
                                            return ReallocateGeometryCPUMemoryTool$Wonderjs.judgeForOptimize(match[0], /* tuple */[
                                                        match$8[0],
                                                        match$8[1],
                                                        match$8[2]
                                                      ], /* tuple */[
                                                        match$7[0],
                                                        match$7[1],
                                                        match$7[2]
                                                      ], /* tuple */[
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
                                                        /* tuple */[
                                                          match$3[0],
                                                          match$3[1],
                                                          match$3[2]
                                                        ],
                                                        /* tuple */[
                                                          match$2[0],
                                                          match$2[1],
                                                          match$2[2]
                                                        ]
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      return Wonder_jest.describe("reallocate geometry", (function (param) {
                                    return Wonder_jest.test("\n            create geometry g1;\n            dispose g1;\n            create geometry g2 with vertices v2;\n            create geometry g3 with vertices v3;\n            dispose g3;\n            reallocate geometry to new buffer;\n\n            g2->vertices should be v2.\n            ", (function (param) {
                                                  var state$1 = SettingTool$Wonderjs.setMemory(state[0], 2, /* () */0);
                                                  var match = GeometryTool$Wonderjs.createGameObject(state$1);
                                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate(match[1], match[2], match[0]);
                                                  var match$1 = GeometryTool$Wonderjs.createGameObject(state$2);
                                                  var geometry2 = match$1[2];
                                                  var vertices2 = new Float32Array(/* array */[
                                                        1,
                                                        2,
                                                        3
                                                      ]);
                                                  var state$3 = GeometryAPI$Wonderjs.setGeometryVertices(geometry2, vertices2, match$1[0]);
                                                  var match$2 = GeometryTool$Wonderjs.createGameObject(state$3);
                                                  var geometry3 = match$2[2];
                                                  var vertices3 = new Float32Array(/* array */[
                                                        3,
                                                        3,
                                                        3
                                                      ]);
                                                  var state$4 = GeometryAPI$Wonderjs.setGeometryVertices(geometry3, vertices3, match$2[0]);
                                                  var state$5 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate(match$2[1], geometry3, state$4);
                                                  var state$6 = ReallocateGeometryCPUMemoryTool$Wonderjs.reAllocateGeometryToNewBuffer(state$5);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryAPI$Wonderjs.getGeometryVertices(geometry2, state$6)), vertices2);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
