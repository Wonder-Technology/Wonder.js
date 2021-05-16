'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var DisposeJob$Wonderjs = require("../../../../../src/job/no_worker/loop/DisposeJob.js");
var ScriptTool$Wonderjs = require("../../../../tool/service/script/ScriptTool.js");
var GeometryTool$Wonderjs = require("../../../../tool/service/geometry/GeometryTool.js");
var TransformAPI$Wonderjs = require("../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var VboBufferTool$Wonderjs = require("../../../../tool/service/vboBuffer/VboBufferTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var PointLightTool$Wonderjs = require("../../../../tool/service/light/PointLightTool.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var MeshRendererTool$Wonderjs = require("../../../../tool/service/meshRenderer/MeshRendererTool.js");
var LightMaterialTool$Wonderjs = require("../../../../tool/service/material/LightMaterialTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var DirectionLightTool$Wonderjs = require("../../../../tool/service/light/DirectionLightTool.js");
var ObjectInstanceTool$Wonderjs = require("../../../../tool/service/instance/ObjectInstanceTool.js");
var ArcballCameraControllerTool$Wonderjs = require("../../../../tool/service/camera_controller/ArcballCameraControllerTool.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");
var RenderBasicHardwareInstanceTool$Wonderjs = require("../../../../tool/render/instance/RenderBasicHardwareInstanceTool.js");
var DisposeForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../tool/job/DisposeForNoWorkerAndWorkerJobTool.js");

Wonder_jest.describe("test dispose job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("actually do the dispose work", (function (param) {
                Wonder_jest.describe("dispose components", (function (param) {
                        Wonder_jest.describe("test disposeGameObjectBasicCameraViewComponent", (function (param) {
                                var _prepare = function (state) {
                                  var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                  var basicCameraView1 = match[3][0];
                                  var gameObject1 = match[1];
                                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                  var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                  var basicCameraView3 = match$2[3][0];
                                  var gameObject3 = match$2[1];
                                  var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectBasicCameraViewComponent(gameObject3, basicCameraView3, GameObjectAPI$Wonderjs.disposeGameObjectBasicCameraViewComponent(gameObject1, basicCameraView1, match$2[0]));
                                  return /* tuple */[
                                          state$1,
                                          /* tuple */[
                                            gameObject1,
                                            match$1[1],
                                            gameObject3
                                          ],
                                          /* tuple */[
                                            basicCameraView1,
                                            match$1[3][0],
                                            basicCameraView3
                                          ]
                                        ];
                                };
                                Wonder_jest.test("shouldn't dispose data", (function (param) {
                                        var match = _prepare(state);
                                        var match$1 = match[2];
                                        var match$2 = match[0][/* basicCameraViewRecord */13];
                                        var disposedIndexArray = match$2[/* disposedIndexArray */3];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        disposedIndexArray.includes(match$1[0]),
                                                        disposedIndexArray.includes(match$1[1]),
                                                        disposedIndexArray.includes(match$1[2])
                                                      ]), /* tuple */[
                                                    false,
                                                    false,
                                                    false
                                                  ]);
                                      }));
                                return Wonder_jest.test("dispose data in dispose job", (function (param) {
                                              var match = _prepare(state);
                                              var match$1 = match[2];
                                              var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                              var match$2 = state$1[/* basicCameraViewRecord */13];
                                              var disposedIndexArray = match$2[/* disposedIndexArray */3];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              disposedIndexArray.includes(match$1[0]),
                                                              disposedIndexArray.includes(match$1[1]),
                                                              disposedIndexArray.includes(match$1[2])
                                                            ]), /* tuple */[
                                                          true,
                                                          false,
                                                          true
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.describe("test disposeGameObjectPerspectiveCameraProjectionComponent", (function (param) {
                                var _prepare = function (state) {
                                  var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
                                  var perspectiveCameraProjection1 = match[3][1];
                                  var gameObject1 = match[1];
                                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                  var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(gameObject1, perspectiveCameraProjection1, match$1[0]);
                                  return /* tuple */[
                                          state$1,
                                          /* tuple */[
                                            gameObject1,
                                            match$1[1]
                                          ],
                                          /* tuple */[
                                            perspectiveCameraProjection1,
                                            match$1[3][1]
                                          ]
                                        ];
                                };
                                Wonder_jest.test("shouldn't dispose data", (function (param) {
                                        var match = _prepare(state);
                                        var match$1 = match[2];
                                        var match$2 = match[0][/* perspectiveCameraProjectionRecord */14];
                                        var disposedIndexArray = match$2[/* disposedIndexArray */8];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        disposedIndexArray.includes(match$1[0]),
                                                        disposedIndexArray.includes(match$1[1])
                                                      ]), /* tuple */[
                                                    false,
                                                    false
                                                  ]);
                                      }));
                                return Wonder_jest.test("dispose data in dispose job", (function (param) {
                                              var match = _prepare(state);
                                              var match$1 = match[2];
                                              var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                              var match$2 = state$1[/* perspectiveCameraProjectionRecord */14];
                                              var disposedIndexArray = match$2[/* disposedIndexArray */8];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              disposedIndexArray.includes(match$1[0]),
                                                              disposedIndexArray.includes(match$1[1])
                                                            ]), /* tuple */[
                                                          true,
                                                          false
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.describe("test disposeGameObjectArcballCameraControllerComponent", (function (param) {
                                var _prepare = function (state) {
                                  var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state[0]);
                                  var cameraController1 = match[3][0];
                                  var gameObject1 = match[1];
                                  var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                  var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectArcballCameraControllerComponent(gameObject1, cameraController1, match$1[0]);
                                  return /* tuple */[
                                          state$1,
                                          /* tuple */[
                                            gameObject1,
                                            match$1[1]
                                          ],
                                          /* tuple */[
                                            cameraController1,
                                            match$1[3][0]
                                          ]
                                        ];
                                };
                                Wonder_jest.test("shouldn't dispose data", (function (param) {
                                        var match = _prepare(state);
                                        var match$1 = match[2];
                                        var match$2 = match[0][/* arcballCameraControllerRecord */25];
                                        var disposedIndexArray = match$2[/* disposedIndexArray */19];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        disposedIndexArray.includes(match$1[0]),
                                                        disposedIndexArray.includes(match$1[1])
                                                      ]), /* tuple */[
                                                    false,
                                                    false
                                                  ]);
                                      }));
                                return Wonder_jest.test("dispose data in dispose job", (function (param) {
                                              var match = _prepare(state);
                                              var match$1 = match[2];
                                              var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                              var match$2 = state$1[/* arcballCameraControllerRecord */25];
                                              var disposedIndexArray = match$2[/* disposedIndexArray */19];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              disposedIndexArray.includes(match$1[0]),
                                                              disposedIndexArray.includes(match$1[1])
                                                            ]), /* tuple */[
                                                          true,
                                                          false
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.describe("test disposeGameObjectTransformComponent", (function (param) {
                                var _prepare = function (isKeepOrder, state) {
                                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                  var gameObject1 = match[1];
                                  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                                  var gameObject2 = match$1[1];
                                  var state$1 = match$1[0];
                                  var transform1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject1, state$1);
                                  var transform2 = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject2, state$1);
                                  var state$2 = TransformAPI$Wonderjs.setTransformParent(transform1, transform2, state$1);
                                  var pos1 = /* tuple */[
                                    1,
                                    2,
                                    3
                                  ];
                                  var pos2 = /* tuple */[
                                    2,
                                    3,
                                    4
                                  ];
                                  var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, pos2, TransformAPI$Wonderjs.setTransformLocalPosition(transform1, pos1, state$2));
                                  var state$4 = GameObjectAPI$Wonderjs.disposeGameObjectTransformComponent(gameObject1, transform1, isKeepOrder, state$3);
                                  return /* tuple */[
                                          state$4,
                                          /* tuple */[
                                            gameObject1,
                                            gameObject2
                                          ],
                                          /* tuple */[
                                            pos1,
                                            pos2
                                          ],
                                          /* tuple */[
                                            transform1,
                                            transform2
                                          ]
                                        ];
                                };
                                var _prepareForTestChildrenOrder = function (isKeepOrder, state) {
                                  var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                  var parent = match[1];
                                  var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                  var child1 = match$1[1];
                                  var match$2 = TransformAPI$Wonderjs.createTransform(match$1[0]);
                                  var match$3 = TransformAPI$Wonderjs.createTransform(match$2[0]);
                                  var state$1 = TransformAPI$Wonderjs.setTransformParent(parent, match$3[1], TransformAPI$Wonderjs.setTransformParent(parent, match$2[1], TransformAPI$Wonderjs.setTransformParent(parent, child1, match$3[0])));
                                  TestTool$Wonderjs.closeContractCheck(/* () */0);
                                  var state$2 = GameObjectAPI$Wonderjs.disposeGameObjectTransformComponent(-1, child1, isKeepOrder, state$1);
                                  var state$3 = DisposeJob$Wonderjs.execJob(undefined, state$2);
                                  return /* tuple */[
                                          state$3,
                                          parent
                                        ];
                                };
                                Wonder_jest.describe("test not keep order", (function (param) {
                                        Wonder_jest.test("shouldn't dispose data", (function (param) {
                                                var match = _prepare(false, state);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(match[3][1], match[0])), /* tuple */[
                                                            3,
                                                            5,
                                                            7
                                                          ]);
                                              }));
                                        return Wonder_jest.describe("test dispose job", (function (param) {
                                                      Wonder_jest.test("dispose data", (function (param) {
                                                              var match = _prepare(false, state);
                                                              var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(match[3][1], state$1)), match[2][1]);
                                                            }));
                                                      return Wonder_jest.test("change its current parent's children order", (function (param) {
                                                                    var match = _prepareForTestChildrenOrder(false, state);
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(match[1], match[0])), /* array */[
                                                                                4,
                                                                                3
                                                                              ]);
                                                                  }));
                                                    }));
                                      }));
                                return Wonder_jest.describe("test keep order", (function (param) {
                                              Wonder_jest.test("shouldn't dispose data", (function (param) {
                                                      var match = _prepare(true, state);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(match[3][1], match[0])), /* tuple */[
                                                                  3,
                                                                  5,
                                                                  7
                                                                ]);
                                                    }));
                                              return Wonder_jest.describe("test dispose job", (function (param) {
                                                            Wonder_jest.test("dispose data", (function (param) {
                                                                    var match = _prepare(true, state);
                                                                    var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(match[3][1], state$1)), match[2][1]);
                                                                  }));
                                                            return Wonder_jest.test("not change its current parent's children order", (function (param) {
                                                                          var match = _prepareForTestChildrenOrder(true, state);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(match[1], match[0])), /* array */[
                                                                                      3,
                                                                                      4
                                                                                    ]);
                                                                        }));
                                                          }));
                                            }));
                              }));
                        Wonder_jest.describe("test disposeGameObjectMeshRendererComponent", (function (param) {
                                var _prepare = function (state) {
                                  var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                  var meshRenderer1 = match[2];
                                  var gameObject1 = match[1];
                                  var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match[0]);
                                  var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectMeshRendererComponent(gameObject1, meshRenderer1, match$1[0]);
                                  return /* tuple */[
                                          state$1,
                                          /* tuple */[
                                            gameObject1,
                                            match$1[1]
                                          ],
                                          /* tuple */[
                                            meshRenderer1,
                                            match$1[2]
                                          ]
                                        ];
                                };
                                Wonder_jest.test("shouldn't dispose data", (function (param) {
                                        var match = _prepare(state);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(match[0]).length), 2);
                                      }));
                                return Wonder_jest.test("dispose data in dispose job", (function (param) {
                                              var match = _prepare(state);
                                              var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$1)), /* array */[match[1][1]]);
                                            }));
                              }));
                        Wonder_jest.describe("test disposeGameObjectBoxGeometryComponent", (function (param) {
                                return Wonder_jest.describe("dispose data in dispose job", (function (param) {
                                              return Wonder_jest.describe("dispose vbo buffer data", (function (param) {
                                                            Wonder_jest.test("add buffer to pool", (function (param) {
                                                                    var match = DisposeForNoWorkerAndWorkerJobTool$Wonderjs.prepareForDisposeGeometryVboBuffer(state);
                                                                    var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                                                    var match$1 = VboBufferTool$Wonderjs.getVboBufferRecord(state$1);
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    MutableSparseMapService$WonderCommonlib.length(match$1[/* vertexArrayBufferPool */5]),
                                                                                    MutableSparseMapService$WonderCommonlib.length(match$1[/* elementArrayBufferPool */6])
                                                                                  ]), /* tuple */[
                                                                                3,
                                                                                1
                                                                              ]);
                                                                  }));
                                                            return Wonder_jest.test("remove from buffer map", (function (param) {
                                                                          var match = DisposeForNoWorkerAndWorkerJobTool$Wonderjs.prepareForDisposeGeometryVboBuffer(state);
                                                                          var geometry1 = match[2];
                                                                          var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                                                          var match$1 = VboBufferTool$Wonderjs.getVboBufferRecord(state$1);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                          MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryVertexBufferMap */0]),
                                                                                          MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryTexCoordBufferMap */1]),
                                                                                          MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryNormalBufferMap */2]),
                                                                                          MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryElementArrayBufferMap */3])
                                                                                        ]), /* tuple */[
                                                                                      false,
                                                                                      false,
                                                                                      false,
                                                                                      false
                                                                                    ]);
                                                                        }));
                                                          }));
                                            }));
                              }));
                        Wonder_jest.describe("test disposeGameObjectGeometryComponent", (function (param) {
                                return Wonder_jest.describe("dispose data in dispose job", (function (param) {
                                              return Wonder_jest.describe("dispose vbo buffer data", (function (param) {
                                                            var _prepare = function (state) {
                                                              var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                                              var geometry1 = match[2];
                                                              var gameObject1 = match[1];
                                                              var state$1 = VboBufferTool$Wonderjs.addVboBufferToGeometryBufferMap(geometry1, match[0]);
                                                              var state$2 = GameObjectAPI$Wonderjs.disposeGameObject(gameObject1, state$1);
                                                              return /* tuple */[
                                                                      state$2,
                                                                      gameObject1,
                                                                      geometry1
                                                                    ];
                                                            };
                                                            Wonder_jest.test("add buffer to pool", (function (param) {
                                                                    var match = _prepare(state);
                                                                    var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                                                    var match$1 = VboBufferTool$Wonderjs.getVboBufferRecord(state$1);
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    MutableSparseMapService$WonderCommonlib.length(match$1[/* vertexArrayBufferPool */5]),
                                                                                    MutableSparseMapService$WonderCommonlib.length(match$1[/* elementArrayBufferPool */6])
                                                                                  ]), /* tuple */[
                                                                                3,
                                                                                1
                                                                              ]);
                                                                  }));
                                                            return Wonder_jest.test("remove from buffer map", (function (param) {
                                                                          var match = _prepare(state);
                                                                          var geometry1 = match[2];
                                                                          var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                                                          var match$1 = VboBufferTool$Wonderjs.getVboBufferRecord(state$1);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                          MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryVertexBufferMap */0]),
                                                                                          MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryTexCoordBufferMap */1]),
                                                                                          MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryNormalBufferMap */2]),
                                                                                          MutableSparseMapService$WonderCommonlib.has(geometry1, match$1[/* geometryElementArrayBufferMap */3])
                                                                                        ]), /* tuple */[
                                                                                      false,
                                                                                      false,
                                                                                      false,
                                                                                      false
                                                                                    ]);
                                                                        }));
                                                          }));
                                            }));
                              }));
                        Wonder_jest.describe("test disposeGameObjectSourceInstanceComponent", (function (param) {
                                return Wonder_jest.describe("dispose data in dispose job", (function (param) {
                                              return Wonder_jest.describe("dispose vbo buffer data", (function (param) {
                                                            var _prepare = function (state) {
                                                              var match = RenderBasicHardwareInstanceTool$Wonderjs.createSourceInstanceGameObject(sandbox, state[0]);
                                                              var sourceInstance1 = match[2][3];
                                                              var gameObject1 = match[1];
                                                              var state$1 = VboBufferTool$Wonderjs.addVboBufferToSourceInstanceBufferMap(sourceInstance1, match[0]);
                                                              var state$2 = GameObjectAPI$Wonderjs.disposeGameObject(gameObject1, state$1);
                                                              return /* tuple */[
                                                                      state$2,
                                                                      gameObject1,
                                                                      sourceInstance1
                                                                    ];
                                                            };
                                                            Wonder_jest.test("add buffer to pool", (function (param) {
                                                                    var match = _prepare(state);
                                                                    var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                                                    var match$1 = VboBufferTool$Wonderjs.getVboBufferRecord(state$1);
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.length(match$1[/* matrixInstanceBufferPool */7])), 1);
                                                                  }));
                                                            return Wonder_jest.test("remove from buffer map", (function (param) {
                                                                          var match = _prepare(state);
                                                                          var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                                                          var match$1 = VboBufferTool$Wonderjs.getVboBufferRecord(state$1);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.has(match[2], match$1[/* matrixInstanceBufferMap */4])), false);
                                                                        }));
                                                          }));
                                            }));
                              }));
                        Wonder_jest.describe("test disposeGameObjectObjectInstanceComponent", (function (param) {
                                var _prepare = function (state) {
                                  var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state[0]);
                                  var objectInstance1 = match[4];
                                  var gameObject1 = match[3];
                                  var match$1 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(match[0]);
                                  var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectObjectInstanceComponent(gameObject1, objectInstance1, match$1[0]);
                                  return /* tuple */[
                                          state$1,
                                          /* tuple */[
                                            gameObject1,
                                            match$1[3]
                                          ],
                                          /* tuple */[
                                            objectInstance1,
                                            match$1[4]
                                          ]
                                        ];
                                };
                                Wonder_jest.test("shouldn't dispose data", (function (param) {
                                        var match = _prepare(state);
                                        var match$1 = match[2];
                                        var match$2 = match[0][/* objectInstanceRecord */7];
                                        var disposedIndexArray = match$2[/* disposedIndexArray */2];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        disposedIndexArray.includes(match$1[0]),
                                                        disposedIndexArray.includes(match$1[1])
                                                      ]), /* tuple */[
                                                    false,
                                                    false
                                                  ]);
                                      }));
                                return Wonder_jest.test("dispose data in dispose job", (function (param) {
                                              var match = _prepare(state);
                                              var match$1 = match[2];
                                              var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                              var match$2 = state$1[/* objectInstanceRecord */7];
                                              var disposedIndexArray = match$2[/* disposedIndexArray */2];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              disposedIndexArray.includes(match$1[0]),
                                                              disposedIndexArray.includes(match$1[1])
                                                            ]), /* tuple */[
                                                          true,
                                                          false
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.describe("test disposeGameObjectDirectionLightComponent", (function (param) {
                                var _prepare = function (state) {
                                  var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                  var directionLight1 = match[2];
                                  var gameObject1 = match[1];
                                  var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                  var match$2 = DirectionLightTool$Wonderjs.createGameObject(match$1[0]);
                                  var directionLight3 = match$2[2];
                                  var gameObject3 = match$2[1];
                                  var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectDirectionLightComponent(gameObject3, directionLight3, GameObjectAPI$Wonderjs.disposeGameObjectDirectionLightComponent(gameObject1, directionLight1, match$2[0]));
                                  return /* tuple */[
                                          state$1,
                                          /* tuple */[
                                            gameObject1,
                                            match$1[1],
                                            gameObject3
                                          ],
                                          /* tuple */[
                                            directionLight1,
                                            match$1[2],
                                            directionLight3
                                          ]
                                        ];
                                };
                                Wonder_jest.test("shouldn't dispose data", (function (param) {
                                        var match = _prepare(state);
                                        var match$1 = match[1];
                                        var match$2 = DirectionLightTool$Wonderjs.getRecord(match[0]);
                                        var gameObjectMap = match$2[/* gameObjectMap */5];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        MutableSparseMapService$WonderCommonlib.includes(match$1[0], gameObjectMap),
                                                        MutableSparseMapService$WonderCommonlib.includes(match$1[1], gameObjectMap),
                                                        MutableSparseMapService$WonderCommonlib.includes(match$1[2], gameObjectMap)
                                                      ]), /* tuple */[
                                                    true,
                                                    true,
                                                    true
                                                  ]);
                                      }));
                                return Wonder_jest.test("dispose data in dispose job", (function (param) {
                                              var match = _prepare(state);
                                              var match$1 = match[1];
                                              var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                              var match$2 = DirectionLightTool$Wonderjs.getRecord(state$1);
                                              var gameObjectMap = match$2[/* gameObjectMap */5];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              MutableSparseMapService$WonderCommonlib.includes(match$1[0], gameObjectMap),
                                                              MutableSparseMapService$WonderCommonlib.includes(match$1[1], gameObjectMap),
                                                              MutableSparseMapService$WonderCommonlib.includes(match$1[2], gameObjectMap)
                                                            ]), /* tuple */[
                                                          false,
                                                          true,
                                                          false
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.describe("test disposeGameObjectPointLightComponent", (function (param) {
                                      var _prepare = function (state) {
                                        var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                        var pointLight1 = match[2];
                                        var gameObject1 = match[1];
                                        var match$1 = PointLightTool$Wonderjs.createGameObject(match[0]);
                                        var match$2 = PointLightTool$Wonderjs.createGameObject(match$1[0]);
                                        var pointLight3 = match$2[2];
                                        var gameObject3 = match$2[1];
                                        var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectPointLightComponent(gameObject3, pointLight3, GameObjectAPI$Wonderjs.disposeGameObjectPointLightComponent(gameObject1, pointLight1, match$2[0]));
                                        return /* tuple */[
                                                state$1,
                                                /* tuple */[
                                                  gameObject1,
                                                  match$1[1],
                                                  gameObject3
                                                ],
                                                /* tuple */[
                                                  pointLight1,
                                                  match$1[2],
                                                  pointLight3
                                                ]
                                              ];
                                      };
                                      Wonder_jest.test("shouldn't dispose data", (function (param) {
                                              var match = _prepare(state);
                                              var match$1 = match[1];
                                              var match$2 = PointLightTool$Wonderjs.getRecord(match[0]);
                                              var gameObjectMap = match$2[/* gameObjectMap */10];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              MutableSparseMapService$WonderCommonlib.includes(match$1[0], gameObjectMap),
                                                              MutableSparseMapService$WonderCommonlib.includes(match$1[1], gameObjectMap),
                                                              MutableSparseMapService$WonderCommonlib.includes(match$1[2], gameObjectMap)
                                                            ]), /* tuple */[
                                                          true,
                                                          true,
                                                          true
                                                        ]);
                                            }));
                                      return Wonder_jest.test("dispose data in dispose job", (function (param) {
                                                    var match = _prepare(state);
                                                    var match$1 = match[1];
                                                    var state$1 = DisposeJob$Wonderjs.execJob(undefined, match[0]);
                                                    var match$2 = PointLightTool$Wonderjs.getRecord(state$1);
                                                    var gameObjectMap = match$2[/* gameObjectMap */10];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    MutableSparseMapService$WonderCommonlib.includes(match$1[0], gameObjectMap),
                                                                    MutableSparseMapService$WonderCommonlib.includes(match$1[1], gameObjectMap),
                                                                    MutableSparseMapService$WonderCommonlib.includes(match$1[2], gameObjectMap)
                                                                  ]), /* tuple */[
                                                                false,
                                                                true,
                                                                false
                                                              ]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("dispose gameObjects", (function (param) {
                              Wonder_jest.describe("test batchDisposeGameObject", (function (param) {
                                      Wonder_jest.test("shouldn't dispose data", (function (param) {
                                              var match = DisposeForNoWorkerAndWorkerJobTool$Wonderjs.prepareForDisposeGameObjects(state);
                                              var state$1 = GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[
                                                    match[1],
                                                    match[2]
                                                  ], match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* == */0], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$1).length), 2);
                                            }));
                                      return Wonder_jest.test("dispose data in dispose job", (function (param) {
                                                    var match = DisposeForNoWorkerAndWorkerJobTool$Wonderjs.prepareForDisposeGameObjects(state);
                                                    var state$1 = GameObjectAPI$Wonderjs.batchDisposeGameObject(/* array */[
                                                          match[1],
                                                          match[2]
                                                        ], match[0]);
                                                    var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* == */0], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$2).length), 0);
                                                  }));
                                    }));
                              Wonder_jest.describe("test disposeGameObject", (function (param) {
                                      Wonder_jest.test("shouldn't dispose data", (function (param) {
                                              var match = DisposeForNoWorkerAndWorkerJobTool$Wonderjs.prepareForDisposeGameObjects(state);
                                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match[1], match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* == */0], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$1).length), 2);
                                            }));
                                      return Wonder_jest.test("dispose data in dispose job", (function (param) {
                                                    var match = DisposeForNoWorkerAndWorkerJobTool$Wonderjs.prepareForDisposeGameObjects(state);
                                                    var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match[1], match[0]);
                                                    var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* == */0], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$2).length), 1);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test disposeGameObjectKeepOrder", (function (param) {
                                            var _prepare = function (state) {
                                              var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                              var transform1 = match[2];
                                              var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                              var transform2 = match$1[2];
                                              var match$2 = GameObjectTool$Wonderjs.createGameObject(match$1[0]);
                                              var transform3 = match$2[2];
                                              var match$3 = GameObjectTool$Wonderjs.createGameObject(match$2[0]);
                                              var transform4 = match$3[2];
                                              var pos3 = /* tuple */[
                                                1,
                                                2,
                                                3
                                              ];
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform3, pos3, TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                                        10,
                                                        20,
                                                        30
                                                      ], match$3[0]));
                                              var state$2 = TransformAPI$Wonderjs.setTransformParent(transform1, transform4, TransformAPI$Wonderjs.setTransformParent(transform1, transform3, TransformAPI$Wonderjs.setTransformParent(transform1, transform2, state$1)));
                                              return /* tuple */[
                                                      state$2,
                                                      /* tuple */[
                                                        match[1],
                                                        match$1[1],
                                                        match$2[1],
                                                        match$3[1]
                                                      ],
                                                      /* tuple */[
                                                        transform1,
                                                        transform2,
                                                        transform3,
                                                        transform4
                                                      ],
                                                      pos3
                                                    ];
                                            };
                                            Wonder_jest.test("shouldn't dispose data", (function (param) {
                                                    var match = _prepare(state);
                                                    var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrder(match[1][0], match[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(match[2][2], state$1)), /* tuple */[
                                                                11,
                                                                22,
                                                                33
                                                              ]);
                                                  }));
                                            return Wonder_jest.describe("dispose data in dispose job", (function (param) {
                                                          Wonder_jest.test("test dispose data", (function (param) {
                                                                  var match = _prepare(state);
                                                                  var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrder(match[1][0], match[0]);
                                                                  var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformPosition(match[2][2], state$2)), match[3]);
                                                                }));
                                                          return Wonder_jest.test("dispose data in dispose job that not change its current parent's children order", (function (param) {
                                                                        var match = _prepare(state);
                                                                        var match$1 = match[2];
                                                                        var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrder(match[1][1], match[0]);
                                                                        var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(match$1[0], state$2)), /* array */[
                                                                                    match$1[2],
                                                                                    match$1[3]
                                                                                  ]);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("clear all defer disposed data(not dispose the same one again in the second job execution)", (function (param) {
                      Wonder_jest.test("test dispose gameObject", (function (param) {
                              TestTool$Wonderjs.closeContractCheck(/* () */0);
                              var match = BoxGeometryTool$Wonderjs.createGameObject(state[0]);
                              var match$1 = BoxGeometryTool$Wonderjs.createGameObject(match[0]);
                              var match$2 = BoxGeometryTool$Wonderjs.createGameObject(match$1[0]);
                              var match$3 = BoxGeometryTool$Wonderjs.createGameObject(match$2[0]);
                              var state$1 = GameObjectAPI$Wonderjs.disposeGameObject(match[1], match$3[0]);
                              var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                              var match$4 = GameObjectTool$Wonderjs.getGameObjectRecord(state$2);
                              var disposedUidArrayForKeepOrder = match$4[/* disposedUidArrayForKeepOrder */7];
                              var disposedUidArrayForKeepOrderRemoveGeometry = match$4[/* disposedUidArrayForKeepOrderRemoveGeometry */8];
                              var disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial = match$4[/* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */9];
                              var disposedUidArrayForDisposeGeometryRemoveMaterial = match$4[/* disposedUidArrayForDisposeGeometryRemoveMaterial */10];
                              var disposedUidArrayForRemoveTexture = match$4[/* disposedUidArrayForRemoveTexture */11];
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              disposedUidArrayForKeepOrder,
                                              disposedUidArrayForKeepOrderRemoveGeometry,
                                              disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,
                                              disposedUidArrayForDisposeGeometryRemoveMaterial,
                                              disposedUidArrayForRemoveTexture
                                            ]), /* tuple */[
                                          /* array */[],
                                          /* array */[],
                                          /* array */[],
                                          /* array */[],
                                          /* array */[]
                                        ]);
                            }));
                      return Wonder_jest.describe("test dispose component", (function (param) {
                                    Wonder_jest.test("test dispose script component", (function (param) {
                                            var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                            var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectScriptComponent(match[1], match[2], match[0]);
                                            var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                                            var match$1 = GameObjectTool$Wonderjs.getGameObjectRecord(state$2);
                                            var disposedScriptArray = match$1[/* disposedScriptArray */27];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](disposedScriptArray), /* array */[]);
                                          }));
                                    return Wonder_jest.test("test dispose light component", (function (param) {
                                                  var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                                  var match$1 = LightMaterialTool$Wonderjs.createGameObjectWithMap(match[0]);
                                                  var state$1 = GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponentRemoveTexture(match$1[1], match$1[2][0], GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent(match[1], match[2], match$1[0]));
                                                  var state$2 = DisposeJob$Wonderjs.execJob(undefined, state$1);
                                                  var match$2 = GameObjectTool$Wonderjs.getGameObjectRecord(state$2);
                                                  var disposedLightMaterialDataMap = match$2[/* disposedLightMaterialDataMap */19];
                                                  var disposedLightMaterialRemoveTextureDataMap = match$2[/* disposedLightMaterialRemoveTextureDataMap */20];
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  disposedLightMaterialDataMap,
                                                                  disposedLightMaterialRemoveTextureDataMap
                                                                ]), /* tuple */[
                                                              /* array */[],
                                                              /* array */[]
                                                            ]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
