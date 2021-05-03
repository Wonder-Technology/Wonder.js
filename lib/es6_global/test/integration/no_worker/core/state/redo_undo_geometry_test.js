

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as ArrayService$Wonderjs from "../../../../../src/service/atom/ArrayService.js";
import * as GeometryTool$Wonderjs from "../../../../tool/service/geometry/GeometryTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as ReallocateGeometryCPUMemoryTool$Wonderjs from "../../../../tool/reallocate/ReallocateGeometryCPUMemoryTool.js";

Wonder_jest.describe("test redo,undo geometry data", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _createGameObjectAndSetPointData = function (state) {
          var match = GeometryAPI$Wonderjs.createGeometry(state);
          var geometry = match[1];
          var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
          var gameObject = match$1[1];
          var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, match$1[0]);
          var vertices1 = new Float32Array(/* array */[
                10,
                10,
                10,
                10,
                10,
                10
              ]);
          var texCoords1 = new Float32Array(/* array */[
                0.5,
                0.5,
                0.5,
                0.5
              ]);
          var normals1 = new Float32Array(/* array */[
                1,
                1,
                1,
                1,
                1,
                1
              ]);
          var indices1 = new Uint16Array(/* array */[
                0,
                2,
                1
              ]);
          var indices32_1 = new Uint32Array(/* array */[
                0,
                2,
                1
              ]);
          var state$2 = GeometryAPI$Wonderjs.setGeometryIndices32(geometry, indices32_1, GeometryAPI$Wonderjs.setGeometryIndices16(geometry, indices1, GeometryAPI$Wonderjs.setGeometryNormals(geometry, normals1, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry, texCoords1, GeometryAPI$Wonderjs.setGeometryVertices(geometry, vertices1, state$1)))));
          return /* tuple */[
                  state$2,
                  gameObject,
                  geometry,
                  /* tuple */[
                    vertices1,
                    texCoords1,
                    normals1,
                    indices1,
                    indices32_1
                  ]
                ];
        };
        var _prepare = function (param) {
          var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(12, 6, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
          var match = _createGameObjectAndSetPointData(state);
          var match$1 = match[3];
          var geometry1 = match[2];
          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
          var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
          var match$2 = GeometryTool$Wonderjs.createGameObject(state$1);
          var geometry2 = match$2[2];
          var match$3 = GeometryTool$Wonderjs.createGameObject(state$1);
          var geometry3 = match$3[2];
          var vertices2 = new Float32Array(/* array */[
                2,
                3,
                40,
                1,
                3,
                5,
                3,
                4,
                11
              ]);
          var texCoords2 = new Float32Array(/* array */[
                1,
                0.5,
                1,
                1.5,
                0.3,
                0.5
              ]);
          var normals2 = new Float32Array(/* array */[
                3,
                2,
                4,
                5,
                6,
                7,
                2.5,
                1.5,
                0
              ]);
          var indices2 = new Uint16Array(/* array */[
                0,
                1,
                2
              ]);
          var indices32_2 = new Uint32Array(/* array */[
                0,
                1,
                2
              ]);
          var currentState = GeometryAPI$Wonderjs.setGeometryIndices32(geometry2, indices32_2, GeometryAPI$Wonderjs.setGeometryIndices16(geometry2, indices2, GeometryAPI$Wonderjs.setGeometryNormals(geometry3, normals2, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry1, texCoords2, GeometryAPI$Wonderjs.setGeometryVertices(geometry2, vertices2, match$3[0])))));
          return /* tuple */[
                  /* tuple */[
                    currentState,
                    copiedState
                  ],
                  /* tuple */[
                    geometry1,
                    geometry2,
                    geometry3
                  ],
                  /* tuple */[
                    match$1[0],
                    match$1[1],
                    match$1[2],
                    match$1[3],
                    match$1[4]
                  ],
                  /* tuple */[
                    vertices2,
                    texCoords2,
                    normals2,
                    indices2,
                    indices32_2
                  ]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("deep copy geometry record", (function (param) {
                Wonder_jest.test("shadow copy nameMap", (function (param) {
                        return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                      var match = GeometryTool$Wonderjs.getRecord(state);
                                      return /* array */[match[/* nameMap */20]];
                                    }), state[0]);
                      }));
                Wonder_jest.test("shadow copy indicesTypeMap", (function (param) {
                        return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                      var match = GeometryTool$Wonderjs.getRecord(state);
                                      return /* array */[match[/* indicesTypeMap */17]];
                                    }), state[0]);
                      }));
                return Wonder_jest.test("deep copy gameObjectsMap", (function (param) {
                              var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                              var geometry1 = match[2];
                              var state$1 = match[0];
                              var match$1 = GeometryTool$Wonderjs.getRecord(state$1);
                              var originGameObjectsArr = /* array */[1];
                              var copiedOriginGameObjectsArr = originGameObjectsArr.slice();
                              MutableSparseMapService$WonderCommonlib.set(geometry1, originGameObjectsArr, match$1[/* gameObjectsMap */18]);
                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                              var match$2 = GeometryTool$Wonderjs.getRecord(copiedState);
                              var arr = MutableSparseMapService$WonderCommonlib.unsafeGet(geometry1, match$2[/* gameObjectsMap */18]);
                              arr[0] = 2;
                              var match$3 = GeometryTool$Wonderjs.getRecord(state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.unsafeGet(geometry1, match$3[/* gameObjectsMap */18])), copiedOriginGameObjectsArr);
                            }));
              }));
        return Wonder_jest.describe("restore geometry record to target state", (function (param) {
                      Wonder_jest.test("test restore point data typeArrays", (function (param) {
                              var match = _prepare(/* () */0);
                              var match$1 = match[0];
                              var restoredState = MainStateTool$Wonderjs.restore(match$1[0], match$1[1]);
                              var match$2 = GeometryTool$Wonderjs.getRecord(restoredState);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              match$2[/* vertices */2].slice(0, 8),
                                              match$2[/* texCoords */3].slice(0, 8),
                                              match$2[/* normals */4].slice(0, 8),
                                              match$2[/* indices16 */5].slice(0, 8),
                                              match$2[/* indices32 */6].slice(0, 8)
                                            ]), /* tuple */[
                                          new Float32Array(/* array */[
                                                10,
                                                10,
                                                10,
                                                10,
                                                10,
                                                10,
                                                2,
                                                3
                                              ]),
                                          new Float32Array(/* array */[
                                                0.5,
                                                0.5,
                                                0.5,
                                                0.5,
                                                1,
                                                0.5,
                                                1,
                                                1.5
                                              ]),
                                          new Float32Array(/* array */[
                                                1,
                                                1,
                                                1,
                                                1,
                                                1,
                                                1,
                                                3,
                                                2
                                              ]),
                                          new Uint16Array(/* array */[
                                                0,
                                                2,
                                                1,
                                                0,
                                                1,
                                                2,
                                                0,
                                                0
                                              ]),
                                          new Uint32Array(/* array */[
                                                0,
                                                2,
                                                1,
                                                0,
                                                1,
                                                2,
                                                0,
                                                0
                                              ])
                                        ]);
                            }));
                      Wonder_jest.test("test restore point info typeArrays", (function (param) {
                              var match = _prepare(/* () */0);
                              var match$1 = match[1];
                              var geometry1 = match$1[0];
                              var match$2 = match[0];
                              var restoredState = MainStateTool$Wonderjs.restore(match$2[0], match$2[1]);
                              GeometryAPI$Wonderjs.getGeometryVertices(geometry1, restoredState);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              GeometryAPI$Wonderjs.getGeometryVertices(geometry1, restoredState).length,
                                              GeometryAPI$Wonderjs.getGeometryNormals(geometry1, restoredState).length,
                                              GeometryAPI$Wonderjs.getGeometryTexCoords(geometry1, restoredState).length,
                                              GeometryAPI$Wonderjs.getGeometryIndices16(geometry1, restoredState).length,
                                              GeometryAPI$Wonderjs.getGeometryVertices(match$1[1], restoredState).length,
                                              GeometryAPI$Wonderjs.getGeometryNormals(match$1[2], restoredState).length
                                            ]), /* tuple */[
                                          6,
                                          6,
                                          4,
                                          3,
                                          0,
                                          0
                                        ]);
                            }));
                      Wonder_jest.test("test set point after restore", (function (param) {
                              var match = _prepare(/* () */0);
                              var geometry3 = match[1][2];
                              var match$1 = match[0];
                              var restoredState = MainStateTool$Wonderjs.restore(match$1[0], match$1[1]);
                              var vertices3 = new Float32Array(/* array */[
                                    3,
                                    4,
                                    11
                                  ]);
                              var restoredState$1 = GeometryAPI$Wonderjs.setGeometryVertices(geometry3, vertices3, restoredState);
                              var vertices = GeometryAPI$Wonderjs.getGeometryVertices(geometry3, restoredState$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](vertices), vertices3);
                            }));
                      Wonder_jest.test("test create geometry and set point after restore", (function (param) {
                              var match = _prepare(/* () */0);
                              var match$1 = match[0];
                              var restoredState = MainStateTool$Wonderjs.restore(match$1[0], match$1[1]);
                              var match$2 = GeometryAPI$Wonderjs.createGeometry(restoredState);
                              var geometry4 = match$2[1];
                              var vertices = new Float32Array(/* array */[
                                    0,
                                    0.5,
                                    1.0
                                  ]);
                              var indices32 = new Uint32Array(/* array */[
                                    1,
                                    3,
                                    2
                                  ]);
                              var restoredState$1 = GeometryAPI$Wonderjs.setGeometryIndices32(geometry4, indices32, GeometryAPI$Wonderjs.setGeometryVertices(geometry4, vertices, match$2[0]));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              GeometryAPI$Wonderjs.getGeometryVertices(geometry4, restoredState$1),
                                              GeometryAPI$Wonderjs.getGeometryIndices16(geometry4, restoredState$1),
                                              GeometryAPI$Wonderjs.getGeometryIndices32(geometry4, restoredState$1)
                                            ]), /* tuple */[
                                          vertices,
                                          new Uint16Array(/* array */[
                                                0,
                                                1,
                                                2
                                              ]),
                                          indices32
                                        ]);
                            }));
                      return Wonder_jest.describe("test reallocate geometry", (function (param) {
                                    Wonder_jest.test("test restore after reallocate", (function (param) {
                                            var match = _prepare(/* () */0);
                                            var match$1 = match[2];
                                            var match$2 = match[1];
                                            var geometry1 = match$2[0];
                                            var match$3 = match[0];
                                            var currentState = match$3[0];
                                            var gameObject1 = ArrayService$Wonderjs.unsafeGetFirst(GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(geometry1, currentState));
                                            var currentState$1 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate(gameObject1, geometry1, currentState);
                                            var currentState$2 = ReallocateGeometryCPUMemoryTool$Wonderjs.reAllocateGeometryToNewBuffer(currentState$1);
                                            var restoredState = MainStateTool$Wonderjs.restore(currentState$2, match$3[1]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            GeometryAPI$Wonderjs.getGeometryVertices(geometry1, restoredState),
                                                            GeometryAPI$Wonderjs.getGeometryNormals(geometry1, restoredState),
                                                            GeometryAPI$Wonderjs.getGeometryTexCoords(geometry1, restoredState),
                                                            GeometryAPI$Wonderjs.getGeometryIndices16(geometry1, restoredState),
                                                            GeometryAPI$Wonderjs.getGeometryIndices32(geometry1, restoredState),
                                                            GeometryAPI$Wonderjs.hasGeometryVertices(match$2[1], restoredState),
                                                            GeometryAPI$Wonderjs.hasGeometryNormals(match$2[2], restoredState)
                                                          ]), /* tuple */[
                                                        match$1[0],
                                                        match$1[2],
                                                        match$1[1],
                                                        match$1[3],
                                                        match$1[4],
                                                        false,
                                                        false
                                                      ]);
                                          }));
                                    return Wonder_jest.test("\n          1.create 3 geometrys g1,g2,g3;\n          2.set g1 points data p1;\n          3.copy state to copiedState1;\n          4.set g2,g3 points data p2;\n          5.dispose g1 with state;\n          6.reallocate geometry with state;\n          7.copy state to copiedState2;\n          8.restore state to copiedState1 to be restoreState1;\n          9.restore restoreState1 to copiedState2 to be restoreState2;\n\n          get g2,g3 points data with restoreState2 should be p2.\n          ", (function (param) {
                                                  var match = _prepare(/* () */0);
                                                  var match$1 = match[3];
                                                  var match$2 = match[1];
                                                  var geometry2 = match$2[1];
                                                  var geometry1 = match$2[0];
                                                  var match$3 = match[0];
                                                  var currentState = match$3[0];
                                                  var gameObject1 = ArrayService$Wonderjs.unsafeGetFirst(GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(geometry1, currentState));
                                                  var currentState$1 = GameObjectTool$Wonderjs.disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate(gameObject1, geometry1, currentState);
                                                  var currentState$2 = ReallocateGeometryCPUMemoryTool$Wonderjs.reAllocateGeometryToNewBuffer(currentState$1);
                                                  var copiedState2 = MainStateTool$Wonderjs.deepCopyForRestore(currentState$2);
                                                  var restoredState = MainStateTool$Wonderjs.restore(currentState$2, match$3[1]);
                                                  var restoredState2 = MainStateTool$Wonderjs.restore(restoredState, copiedState2);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  GeometryAPI$Wonderjs.getGeometryVertices(geometry2, restoredState2),
                                                                  GeometryAPI$Wonderjs.getGeometryIndices16(geometry2, restoredState2),
                                                                  GeometryAPI$Wonderjs.getGeometryIndices32(geometry2, restoredState2),
                                                                  GeometryAPI$Wonderjs.getGeometryNormals(match$2[2], restoredState2)
                                                                ]), /* tuple */[
                                                              match$1[0],
                                                              match$1[3],
                                                              match$1[4],
                                                              match$1[2]
                                                            ]);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
