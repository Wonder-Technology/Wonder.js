

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as RedoUndoTool$Wonderjs from "./tool/RedoUndoTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as PointLightAPI$Wonderjs from "../../../../../src/api/light/PointLightAPI.js";
import * as TypeArrayTool$Wonderjs from "../../../../tool/service/primitive/TypeArrayTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as PointLightTool$Wonderjs from "../../../../tool/service/light/PointLightTool.js";
import * as AllMaterialTool$Wonderjs from "../../../../tool/service/material/AllMaterialTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as BasicMaterialTool$Wonderjs from "../../../../tool/service/material/BasicMaterialTool.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../src/api/light/DirectionLightAPI.js";
import * as DirectionLightTool$Wonderjs from "../../../../tool/service/light/DirectionLightTool.js";
import * as ObjectInstanceTool$Wonderjs from "../../../../tool/service/instance/ObjectInstanceTool.js";
import * as SourceInstanceTool$Wonderjs from "../../../../tool/service/instance/SourceInstanceTool.js";
import * as StaticTransformTool$Wonderjs from "../../../../tool/service/primitive/StaticTransformTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";
import * as ArrayBufferViewSourceTextureTool$Wonderjs from "../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js";

describe("test redo,undo component data", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _prepareBasicCameraViewData = function (state) {
          var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
          var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
          var basicCameraView3 = match$2[3][0];
          var gameObject3 = match$2[1];
          var state$1 = GameObjectTool$Wonderjs.disposeGameObjectBasicCameraViewComponent(gameObject3, basicCameraView3, match$2[0]);
          return /* tuple */[
                  state$1,
                  match[1],
                  match$1[1],
                  gameObject3,
                  match[3][0],
                  match$1[3][0],
                  basicCameraView3
                ];
        };
        var _preparePerspectiveCameraProjectionData = function (state) {
          var match = CameraTool$Wonderjs.createCameraGameObject(state[0]);
          var perspectiveCameraProjection1 = match[3][1];
          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
          var perspectiveCameraProjection2 = match$1[3][1];
          var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
          var perspectiveCameraProjection3 = match$2[3][1];
          var gameObject3 = match$2[1];
          var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection2, 0.2, match$2[0]);
          var state$2 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(perspectiveCameraProjection2, 100, state$1);
          var state$3 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(perspectiveCameraProjection3, 100, state$2);
          var state$4 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(perspectiveCameraProjection1, 1, state$3);
          var state$5 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(perspectiveCameraProjection2, 2, state$4);
          var state$6 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy(perspectiveCameraProjection2, 60, state$5);
          var state$7 = PerspectiveCameraProjectionTool$Wonderjs.update(state$6);
          var state$8 = GameObjectTool$Wonderjs.disposeGameObjectPerspectiveCameraProjectionComponent(gameObject3, perspectiveCameraProjection3, state$7);
          return /* tuple */[
                  state$8,
                  match[1],
                  match$1[1],
                  gameObject3,
                  perspectiveCameraProjection1,
                  perspectiveCameraProjection2,
                  perspectiveCameraProjection3
                ];
        };
        var _prepareBasicMaterialData = function (state) {
          var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
          var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
          var material2 = match$1[2];
          var match$2 = BasicMaterialTool$Wonderjs.createGameObject(match$1[0]);
          var state$1 = AllMaterialTool$Wonderjs.prepareForInit(match$2[0]);
          var state$2 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material2, /* array */[
                1,
                0.5,
                0.0
              ], state$1);
          return /* tuple */[
                  state$2,
                  match[1],
                  match$1[1],
                  match$2[1],
                  match[2],
                  material2,
                  match$2[2]
                ];
        };
        var _prepareBasicSourceTextureData = function (state) {
          var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
          var texture2 = match$1[1];
          var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$1[0]);
          var state$1 = AllMaterialTool$Wonderjs.prepareForInit(match$2[0]);
          var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapS(texture2, /* Mirrored_repeat */1, state$1);
          var state$3 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapT(texture2, /* Mirrored_repeat */1, state$2);
          var state$4 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(texture2, /* Linear */1, state$3);
          var state$5 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(texture2, /* Linear */1, state$4);
          var state$6 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureType(texture2, 1, state$5);
          var state$7 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFormat(texture2, /* Alpha */2, state$6);
          return /* tuple */[
                  state$7,
                  match[1],
                  texture2,
                  match$2[1]
                ];
        };
        var _prepareArrayBufferViewSourceTextureData = function (state) {
          var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
          var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match[0]);
          var texture2 = match$1[1];
          var match$2 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match$1[0]);
          var state$1 = AllMaterialTool$Wonderjs.prepareForInit(match$2[0]);
          var state$2 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapS(texture2, /* Mirrored_repeat */1, state$1);
          var state$3 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapT(texture2, /* Mirrored_repeat */1, state$2);
          var state$4 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMagFilter(texture2, /* Linear */1, state$3);
          var state$5 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMinFilter(texture2, /* Linear */1, state$4);
          var state$6 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureType(texture2, 1, state$5);
          var state$7 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureFormat(texture2, 2, state$6);
          var state$8 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWidth(texture2, 2, state$7);
          var state$9 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureHeight(texture2, 4, state$8);
          return /* tuple */[
                  state$9,
                  match[1],
                  texture2,
                  match$2[1]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("deepCopyForRestore", (function () {
                describe("deep copy material record", (function () {
                        describe("test basic material", (function () {
                                Wonder_jest.test("shadow copy nameMap, aterialArrayForWorkerInit", (function () {
                                        return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                      var match = BasicMaterialTool$Wonderjs.getRecord(state);
                                                      var materialArrayForWorkerInit = match[/* materialArrayForWorkerInit */11];
                                                      return /* array */[
                                                              match[/* nameMap */10],
                                                              materialArrayForWorkerInit
                                                            ];
                                                    }), state[0]);
                                      }));
                                Wonder_jest.test("deep copy gameObjectsMap, emptyMapUnitArrayMap", (function () {
                                        var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                        var basicMaterial1 = match[2];
                                        var state$1 = match[0];
                                        var match$1 = BasicMaterialTool$Wonderjs.getRecord(state$1);
                                        var originGameObjectsArr = /* array */[1];
                                        var originEmptyMapUnitArrayMap = /* array */[
                                          2,
                                          1,
                                          0
                                        ];
                                        var copiedOriginGameObjectsArr = originGameObjectsArr.slice();
                                        var copiedOriginEmptyMapUnitArrayMap = originEmptyMapUnitArrayMap.slice();
                                        SparseMapService$WonderCommonlib.set(basicMaterial1, originGameObjectsArr, match$1[/* gameObjectsMap */8]);
                                        SparseMapService$WonderCommonlib.set(basicMaterial1, originEmptyMapUnitArrayMap, match$1[/* emptyMapUnitArrayMap */6]);
                                        var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                        var match$2 = BasicMaterialTool$Wonderjs.getRecord(copiedState);
                                        var arr = SparseMapService$WonderCommonlib.unsafeGet(basicMaterial1, match$2[/* gameObjectsMap */8]);
                                        arr[0] = 2;
                                        var arr$1 = SparseMapService$WonderCommonlib.unsafeGet(basicMaterial1, match$2[/* emptyMapUnitArrayMap */6]);
                                        arr$1[0] = 4;
                                        var match$3 = BasicMaterialTool$Wonderjs.getRecord(state$1);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        SparseMapService$WonderCommonlib.unsafeGet(basicMaterial1, match$3[/* gameObjectsMap */8]),
                                                        SparseMapService$WonderCommonlib.unsafeGet(basicMaterial1, match$3[/* emptyMapUnitArrayMap */6])
                                                      ]), /* tuple */[
                                                    copiedOriginGameObjectsArr,
                                                    copiedOriginEmptyMapUnitArrayMap
                                                  ]);
                                      }));
                                Wonder_jest.test("copy colors", (function () {
                                        return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                    BasicMaterialTool$Wonderjs.createGameObject,
                                                    (function (material, state) {
                                                        return TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state));
                                                      }),
                                                    BasicMaterialAPI$Wonderjs.setBasicMaterialColor,
                                                    (function () {
                                                        return /* tuple */[
                                                                /* array */[
                                                                  0.1,
                                                                  0,
                                                                  0
                                                                ],
                                                                /* array */[
                                                                  0.2,
                                                                  0,
                                                                  0
                                                                ]
                                                              ];
                                                      })
                                                  ], state);
                                      }));
                                Wonder_jest.test("copy textureIndices", (function () {
                                        return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                    BasicMaterialTool$Wonderjs.createGameObject,
                                                    BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialMap,
                                                    BasicMaterialAPI$Wonderjs.setBasicMaterialMap,
                                                    (function () {
                                                        return /* tuple */[
                                                                0,
                                                                1
                                                              ];
                                                      })
                                                  ], state);
                                      }));
                                return Wonder_jest.test("copy mapUnits", (function () {
                                              return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                          BasicMaterialTool$Wonderjs.createGameObject,
                                                          BasicMaterialTool$Wonderjs.getMapUnit,
                                                          BasicMaterialTool$Wonderjs.setMapUnit,
                                                          (function () {
                                                              return /* tuple */[
                                                                      1,
                                                                      2
                                                                    ];
                                                            })
                                                        ], state);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("deep copy texture record", (function () {
                        describe("deep copy basic source texture record", (function () {
                                return Wonder_jest.test("shadow copy sourceMap,glTextureMap, \n                    bindTextureUnitCacheMap, disposedIndexArray,needAddedSourceArray,needInitedTextureIndexArray\n                    \n                    ", (function () {
                                              return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                            var match = BasicSourceTextureTool$Wonderjs.getRecord(state);
                                                            return /* array */[
                                                                    match[/* sourceMap */9],
                                                                    match[/* glTextureMap */10],
                                                                    match[/* bindTextureUnitCacheMap */11],
                                                                    match[/* disposedIndexArray */12],
                                                                    match[/* needAddedSourceArray */13],
                                                                    match[/* needInitedTextureIndexArray */14]
                                                                  ];
                                                          }), state[0]);
                                            }));
                              }));
                        describe("deep copy arrayBufferView source texture record", (function () {
                                return Wonder_jest.test("shadow copy sourceMap,glTextureMap, \n                    bindTextureUnitCacheMap, disposedIndexArray,needAddedSourceArray,needInitedTextureIndexArray\n                    \n                    ", (function () {
                                              return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                            var match = ArrayBufferViewSourceTextureTool$Wonderjs.getRecord(state);
                                                            return /* array */[
                                                                    match[/* sourceMap */11],
                                                                    match[/* glTextureMap */12],
                                                                    match[/* bindTextureUnitCacheMap */13],
                                                                    match[/* disposedIndexArray */14],
                                                                    match[/* needAddedSourceArray */15],
                                                                    match[/* needInitedTextureIndexArray */16]
                                                                  ];
                                                          }), state[0]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("deep copy light record", (function () {
                        describe("test direction light", (function () {
                                describe("copy type array record", (function () {
                                        Wonder_jest.test("copy colors", (function () {
                                                return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                            DirectionLightTool$Wonderjs.createGameObject,
                                                            DirectionLightAPI$Wonderjs.getDirectionLightColor,
                                                            DirectionLightAPI$Wonderjs.setDirectionLightColor,
                                                            (function () {
                                                                return /* tuple */[
                                                                        /* array */[
                                                                          1,
                                                                          1,
                                                                          0
                                                                        ],
                                                                        /* array */[
                                                                          0,
                                                                          1,
                                                                          0
                                                                        ]
                                                                      ];
                                                              })
                                                          ], state);
                                              }));
                                        return Wonder_jest.test("copy intensities", (function () {
                                                      return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                                  DirectionLightTool$Wonderjs.createGameObject,
                                                                  DirectionLightAPI$Wonderjs.getDirectionLightIntensity,
                                                                  DirectionLightAPI$Wonderjs.setDirectionLightIntensity,
                                                                  (function () {
                                                                      return /* tuple */[
                                                                              2,
                                                                              3
                                                                            ];
                                                                    })
                                                                ], state);
                                                    }));
                                      }));
                                return Wonder_jest.test("shadow copy mappedIndexMap, gameObjectMap, renderLightArr", (function () {
                                              return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                            var match = DirectionLightTool$Wonderjs.getRecord(state);
                                                            return /* array */[
                                                                    match[/* disposedIndexArray */6],
                                                                    match[/* gameObjectMap */5],
                                                                    match[/* renderLightArr */4]
                                                                  ];
                                                          }), state[0]);
                                            }));
                              }));
                        describe("test point light", (function () {
                                describe("copy type array record", (function () {
                                        Wonder_jest.test("copy colors", (function () {
                                                return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                            PointLightTool$Wonderjs.createGameObject,
                                                            PointLightAPI$Wonderjs.getPointLightColor,
                                                            PointLightAPI$Wonderjs.setPointLightColor,
                                                            (function () {
                                                                return /* tuple */[
                                                                        /* array */[
                                                                          1,
                                                                          1,
                                                                          0
                                                                        ],
                                                                        /* array */[
                                                                          0,
                                                                          1,
                                                                          0
                                                                        ]
                                                                      ];
                                                              })
                                                          ], state);
                                              }));
                                        Wonder_jest.test("copy intensities", (function () {
                                                return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                            PointLightTool$Wonderjs.createGameObject,
                                                            PointLightAPI$Wonderjs.getPointLightIntensity,
                                                            PointLightAPI$Wonderjs.setPointLightIntensity,
                                                            (function () {
                                                                return /* tuple */[
                                                                        2,
                                                                        3
                                                                      ];
                                                              })
                                                          ], state);
                                              }));
                                        Wonder_jest.test("copy constants", (function () {
                                                return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                            PointLightTool$Wonderjs.createGameObject,
                                                            PointLightAPI$Wonderjs.getPointLightConstant,
                                                            PointLightAPI$Wonderjs.setPointLightConstant,
                                                            (function () {
                                                                return /* tuple */[
                                                                        2,
                                                                        3
                                                                      ];
                                                              })
                                                          ], state);
                                              }));
                                        Wonder_jest.test("copy linears", (function () {
                                                return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                            PointLightTool$Wonderjs.createGameObject,
                                                            PointLightAPI$Wonderjs.getPointLightLinear,
                                                            PointLightAPI$Wonderjs.setPointLightLinear,
                                                            (function () {
                                                                return /* tuple */[
                                                                        2,
                                                                        3
                                                                      ];
                                                              })
                                                          ], state);
                                              }));
                                        Wonder_jest.test("copy quadratics", (function () {
                                                return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                            PointLightTool$Wonderjs.createGameObject,
                                                            PointLightAPI$Wonderjs.getPointLightQuadratic,
                                                            PointLightAPI$Wonderjs.setPointLightQuadratic,
                                                            (function () {
                                                                return /* tuple */[
                                                                        2,
                                                                        3
                                                                      ];
                                                              })
                                                          ], state);
                                              }));
                                        return Wonder_jest.test("copy ranges", (function () {
                                                      return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                                  PointLightTool$Wonderjs.createGameObject,
                                                                  PointLightAPI$Wonderjs.getPointLightRange,
                                                                  PointLightAPI$Wonderjs.setPointLightRange,
                                                                  (function () {
                                                                      return /* tuple */[
                                                                              2,
                                                                              3
                                                                            ];
                                                                    })
                                                                ], state);
                                                    }));
                                      }));
                                return Wonder_jest.test("shadow copy mappedIndexMap, gameObjectMap, renderLightArr", (function () {
                                              return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                            var match = PointLightTool$Wonderjs.getRecord(state);
                                                            return /* array */[
                                                                    match[/* disposedIndexArray */9],
                                                                    match[/* gameObjectMap */10],
                                                                    match[/* renderLightArr */8]
                                                                  ];
                                                          }), state[0]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("deep copy sourceInstance record", (function () {
                        Wonder_jest.test("deep copy matrixFloat32ArrayMap", (function () {
                                var match = SourceInstanceTool$Wonderjs.createSourceInstanceGameObject(state[0]);
                                var sourceInstance1 = match[2];
                                var state$1 = match[0];
                                var match$1 = SourceInstanceTool$Wonderjs.getRecord(state$1);
                                var originMatrixFloat32Array = new Float32Array(/* array */[1]);
                                SparseMapService$WonderCommonlib.set(sourceInstance1, originMatrixFloat32Array, match$1[/* matrixFloat32ArrayMap */6]);
                                var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                var match$2 = SourceInstanceTool$Wonderjs.getRecord(copiedState);
                                var matrixFloat32Array = SparseMapService$WonderCommonlib.unsafeGet(sourceInstance1, match$2[/* matrixFloat32ArrayMap */6]);
                                matrixFloat32Array[0] = 1000;
                                var match$3 = SourceInstanceTool$Wonderjs.getRecord(state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$WonderCommonlib.unsafeGet(sourceInstance1, match$3[/* matrixFloat32ArrayMap */6])), originMatrixFloat32Array);
                              }));
                        return Wonder_jest.test("shadow copy objectInstanceTransformIndexMap, matrixInstanceBufferCapacityMap, gameObjectMap, disposedIndexArray", (function () {
                                      return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                    var match = SourceInstanceTool$Wonderjs.getRecord(state);
                                                    return /* array */[
                                                            match[/* objectInstanceTransformIndexMap */1],
                                                            match[/* matrixInstanceBufferCapacityMap */5],
                                                            match[/* gameObjectMap */9],
                                                            match[/* disposedIndexArray */8]
                                                          ];
                                                  }), state[0]);
                                    }));
                      }));
                describe("deep copy gameObject record", (function () {
                        return Wonder_jest.test("shadow copy disposedUidMap,\n\n        disposedUidArray,\n        disposedUidArrayForKeepOrder,\n\n          disposedUidArrayForKeepOrderRemoveGeometry,\n          disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,\n          \n        disposedBasicCameraViewArray,\n        disposedTransformArray,\n        disposedTransformArrayForKeepOrder,\n        disposedPerspectiveCameraProjectionArray,\n        disposedBasicMaterialDataArray,\n        disposedLightMaterialDataArray,\n                disposedGeometryArray,\n        disposedSourceInstanceArray,\n        disposedObjectInstanceArray,\n                disposedDirectionLightArray,\n        disposedPointLightArray,\n        disposedMeshRendererComponentArray,\n        disposedMeshRendererUidArray,\n                \n                \n                aliveUidArray, transformMap, basicCameraViewMap, geometryMap, meshRendererMap, basicMaterialMap, lightMaterialMap, directionLightMap, pointLightMap, sourceInstanceMap, objectInstanceMap", (function () {
                                      return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                    var match = GameObjectTool$Wonderjs.getGameObjectRecord(state);
                                                    var disposedUidMap = match[/* disposedUidMap */3];
                                                    var disposedUidArray = match[/* disposedUidArray */4];
                                                    var disposedUidArrayForKeepOrder = match[/* disposedUidArrayForKeepOrder */5];
                                                    var disposedUidArrayForKeepOrderRemoveGeometry = match[/* disposedUidArrayForKeepOrderRemoveGeometry */6];
                                                    var disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial = match[/* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */7];
                                                    var disposedBasicCameraViewArray = match[/* disposedBasicCameraViewArray */9];
                                                    var disposedTransformArray = match[/* disposedTransformArray */10];
                                                    var disposedTransformArrayForKeepOrder = match[/* disposedTransformArrayForKeepOrder */11];
                                                    var disposedPerspectiveCameraProjectionArray = match[/* disposedPerspectiveCameraProjectionArray */12];
                                                    var disposedBasicMaterialDataArray = match[/* disposedBasicMaterialDataArray */14];
                                                    var disposedLightMaterialDataArray = match[/* disposedLightMaterialDataArray */15];
                                                    var disposedGeometryDataArray = match[/* disposedGeometryDataArray */16];
                                                    var disposedSourceInstanceArray = match[/* disposedSourceInstanceArray */17];
                                                    var disposedObjectInstanceArray = match[/* disposedObjectInstanceArray */18];
                                                    var disposedDirectionLightArray = match[/* disposedDirectionLightArray */19];
                                                    var disposedPointLightArray = match[/* disposedPointLightArray */20];
                                                    var disposedMeshRendererComponentArray = match[/* disposedMeshRendererComponentArray */21];
                                                    var aliveUidArray = match[/* aliveUidArray */22];
                                                    var geometryMap = match[/* geometryMap */23];
                                                    var transformMap = match[/* transformMap */24];
                                                    var basicCameraViewMap = match[/* basicCameraViewMap */25];
                                                    var meshRendererMap = match[/* meshRendererMap */28];
                                                    var basicMaterialMap = match[/* basicMaterialMap */29];
                                                    var lightMaterialMap = match[/* lightMaterialMap */30];
                                                    var sourceInstanceMap = match[/* sourceInstanceMap */31];
                                                    var objectInstanceMap = match[/* objectInstanceMap */32];
                                                    var directionLightMap = match[/* directionLightMap */33];
                                                    var pointLightMap = match[/* pointLightMap */34];
                                                    return /* array */[
                                                            disposedUidMap,
                                                            disposedUidArray,
                                                            disposedUidArrayForKeepOrder,
                                                            disposedUidArrayForKeepOrderRemoveGeometry,
                                                            disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,
                                                            disposedBasicCameraViewArray,
                                                            disposedTransformArray,
                                                            disposedTransformArrayForKeepOrder,
                                                            disposedPerspectiveCameraProjectionArray,
                                                            disposedBasicMaterialDataArray,
                                                            disposedLightMaterialDataArray,
                                                            disposedGeometryDataArray,
                                                            disposedSourceInstanceArray,
                                                            disposedObjectInstanceArray,
                                                            disposedDirectionLightArray,
                                                            disposedPointLightArray,
                                                            disposedMeshRendererComponentArray,
                                                            aliveUidArray,
                                                            transformMap,
                                                            basicCameraViewMap,
                                                            geometryMap,
                                                            meshRendererMap,
                                                            basicMaterialMap,
                                                            lightMaterialMap,
                                                            directionLightMap,
                                                            pointLightMap,
                                                            sourceInstanceMap,
                                                            objectInstanceMap
                                                          ];
                                                  }), state[0]);
                                    }));
                      }));
                describe("deep copy objectInstance record", (function () {
                        return Wonder_jest.test("shadow copy sourceInstanceMap, gameObjectMap, disposedIndexArray", (function () {
                                      return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                    var match = ObjectInstanceTool$Wonderjs.getObjectInstanceRecord(state);
                                                    return /* array */[
                                                            match[/* sourceInstanceMap */1],
                                                            match[/* gameObjectMap */3],
                                                            match[/* disposedIndexArray */2]
                                                          ];
                                                  }), state[0]);
                                    }));
                      }));
                describe("deep copy basicCameraView record", (function () {
                        return Wonder_jest.test("shadow copy isActiveMap, gameObjectMap, disposedIndexArray", (function () {
                                      return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                    var match = state[/* basicCameraViewRecord */13];
                                                    return /* array */[
                                                            match[/* isActiveMap */1],
                                                            match[/* gameObjectMap */2],
                                                            match[/* disposedIndexArray */3]
                                                          ];
                                                  }), state[0]);
                                    }));
                      }));
                describe("deep copy perspectiveCameraProjection record", (function () {
                        Wonder_jest.test("shadow copy dirtyArray, nearMap, farMap, fovyMap, aspectMap, gameObjectMap, disposedIndexArray", (function () {
                                return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                              var match = state[/* perspectiveCameraProjectionRecord */14];
                                              return /* array */[
                                                      match[/* dirtyArray */1],
                                                      match[/* nearMap */3],
                                                      match[/* farMap */4],
                                                      match[/* fovyMap */5],
                                                      match[/* aspectMap */6],
                                                      match[/* gameObjectMap */7],
                                                      match[/* disposedIndexArray */8]
                                                    ];
                                            }), state[0]);
                              }));
                        return Wonder_jest.test("deep copy pMatrixMap", (function () {
                                      var match = _preparePerspectiveCameraProjectionData(state);
                                      var state$1 = match[0];
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                      var record = copiedState[/* perspectiveCameraProjectionRecord */14];
                                      SparseMapService$WonderCommonlib.unsafeGet(0, record[/* pMatrixMap */2])[1] = 10.0;
                                      var oldPMatrix = SparseMapService$WonderCommonlib.unsafeGet(0, state$1[/* perspectiveCameraProjectionRecord */14][/* pMatrixMap */2]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* <> */6], Wonder_jest.Expect[/* expect */0](oldPMatrix[1]), 10.0);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("restore", (function () {
                var _testRestoreStateEqualTargetState = function (state, prepareDataFunc, getDataFunc) {
                  var match = Curry._1(prepareDataFunc, state);
                  var state$1 = match[0];
                  var currentState = MainStateTool$Wonderjs.createNewCompleteStateWithRenderConfig(sandbox);
                  var match$1 = Curry._1(prepareDataFunc, /* record */[/* contents */currentState]);
                  MainStateTool$Wonderjs.restore(match$1[0], state$1);
                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._1(getDataFunc, MainStateTool$Wonderjs.unsafeGetState(/* () */0))), Curry._1(getDataFunc, state$1));
                };
                describe("restore material record to target state", (function () {
                        describe("test basic material", (function () {
                                return Wonder_jest.test("test restore typeArrays", (function () {
                                              state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                              var match = _prepareBasicMaterialData(state);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                              var match$1 = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                              var material4 = match$1[2];
                                              var currentState = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material4, /* array */[
                                                    1,
                                                    0.1,
                                                    1
                                                  ], match$1[0]);
                                              var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(currentState);
                                              var match$3 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$2[0]);
                                              var currentState$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material4, match$3[1], match$3[0]);
                                              var currentState$2 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState$1);
                                              MainStateTool$Wonderjs.restore(currentState$2, copiedState);
                                              var defaultUnit = BasicSourceTextureTool$Wonderjs.getDefaultUnit(/* () */0);
                                              var match$4 = BasicMaterialTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              match$4[/* colors */3],
                                                              match$4[/* textureIndices */4],
                                                              match$4[/* mapUnits */5]
                                                            ]), /* tuple */[
                                                          new Float32Array(/* array */[
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                0.5,
                                                                0,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1
                                                              ]),
                                                          new Uint32Array(/* array */[
                                                                0,
                                                                0,
                                                                0,
                                                                0
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultUnit,
                                                                defaultUnit,
                                                                defaultUnit,
                                                                defaultUnit
                                                              ])
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("restore light record to target state", (function () {
                        var _prepareLightData = function (createGameObjectFunc, state) {
                          var match = Curry._1(createGameObjectFunc, state[0]);
                          var match$1 = Curry._1(createGameObjectFunc, match[0]);
                          var state$1 = AllMaterialTool$Wonderjs.prepareForInit(match$1[0]);
                          var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                          return /* tuple */[
                                  state$2,
                                  match[1],
                                  match$1[1],
                                  match[2],
                                  match$1[2]
                                ];
                        };
                        describe("test direction light", (function () {
                                return Wonder_jest.test("test restore typeArrays", (function () {
                                              var match = _prepareLightData(DirectionLightTool$Wonderjs.createGameObject, state);
                                              var light2 = match[4];
                                              var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightColor(light2, /* array */[
                                                    0,
                                                    0.5,
                                                    0
                                                  ], match[0]);
                                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                              var match$1 = DirectionLightTool$Wonderjs.createGameObject(state$1);
                                              var match$2 = DirectionLightTool$Wonderjs.createGameObject(state$1);
                                              var light4 = match$2[2];
                                              var currentState = DirectionLightAPI$Wonderjs.setDirectionLightColor(match$1[2], /* array */[
                                                    1,
                                                    0.1,
                                                    0
                                                  ], match$2[0]);
                                              var currentState$1 = DirectionLightAPI$Wonderjs.setDirectionLightColor(light4, /* array */[
                                                    0,
                                                    0.5,
                                                    0.5
                                                  ], currentState);
                                              var currentState$2 = DirectionLightAPI$Wonderjs.setDirectionLightColor(match[3], /* array */[
                                                    0,
                                                    0.5,
                                                    1
                                                  ], currentState$1);
                                              var currentState$3 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light2, 0.2, currentState$2);
                                              var currentState$4 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light4, 0.5, currentState$3);
                                              var currentState$5 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState$4);
                                              MainStateTool$Wonderjs.restore(currentState$5, copiedState);
                                              var match$3 = DirectionLightTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              match$3[/* colors */2].slice(0, 12),
                                                              match$3[/* intensities */3].slice(0, 4)
                                                            ]), /* tuple */[
                                                          new Float32Array(/* array */[
                                                                1,
                                                                1,
                                                                1,
                                                                0,
                                                                0.5,
                                                                0,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1
                                                              ]),
                                                          new Float32Array(/* array */[
                                                                1,
                                                                1,
                                                                1,
                                                                1
                                                              ])
                                                        ]);
                                            }));
                              }));
                        describe("test point light", (function () {
                                return Wonder_jest.test("test restore typeArrays", (function () {
                                              var match = _prepareLightData(PointLightTool$Wonderjs.createGameObject, state);
                                              var light2 = match[4];
                                              var state$1 = PointLightAPI$Wonderjs.setPointLightColor(light2, /* array */[
                                                    0,
                                                    0.5,
                                                    0
                                                  ], match[0]);
                                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                              var match$1 = PointLightTool$Wonderjs.createGameObject(state$1);
                                              var light3 = match$1[2];
                                              var match$2 = PointLightTool$Wonderjs.createGameObject(match$1[0]);
                                              var currentState = PointLightAPI$Wonderjs.setPointLightColor(light3, /* array */[
                                                    1,
                                                    0.1,
                                                    1
                                                  ], match$2[0]);
                                              var currentState$1 = PointLightAPI$Wonderjs.setPointLightColor(match$2[2], /* array */[
                                                    1,
                                                    0.2,
                                                    1
                                                  ], currentState);
                                              var currentState$2 = PointLightAPI$Wonderjs.setPointLightColor(match[3], /* array */[
                                                    0,
                                                    0,
                                                    1
                                                  ], currentState$1);
                                              var currentState$3 = PointLightAPI$Wonderjs.setPointLightRange(light2, 0.2, currentState$2);
                                              var currentState$4 = PointLightAPI$Wonderjs.setPointLightRange(light3, 0.5, currentState$3);
                                              var currentState$5 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState$4);
                                              MainStateTool$Wonderjs.restore(currentState$5, copiedState);
                                              var match$3 = PointLightTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              match$3[/* colors */2].slice(0, 12),
                                                              match$3[/* ranges */7].slice(0, 4)
                                                            ]), /* tuple */[
                                                          new Float32Array(/* array */[
                                                                1,
                                                                1,
                                                                1,
                                                                0,
                                                                0.5,
                                                                0,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1
                                                              ]),
                                                          new Float32Array(/* array */[
                                                                65,
                                                                65,
                                                                65,
                                                                65
                                                              ])
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("restore texture record to target state", (function () {
                        describe("test restore basic source texture record", (function () {
                                return Wonder_jest.test("test restore typeArrays", (function () {
                                              state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                              var match = _prepareBasicSourceTextureData(state[0]);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                              var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state$1);
                                              var currentState = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapT(match$1[1], /* Mirrored_repeat */1, match$1[0]);
                                              var currentState$1 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState);
                                              MainStateTool$Wonderjs.restore(currentState$1, copiedState);
                                              var defaultWrapS = BasicSourceTextureTool$Wonderjs.getDefaultWrapS(/* () */0);
                                              var defaultWrapT = BasicSourceTextureTool$Wonderjs.getDefaultWrapT(/* () */0);
                                              var defaultMagFilter = BasicSourceTextureTool$Wonderjs.getDefaultMagFilter(/* () */0);
                                              var defaultMinFilter = BasicSourceTextureTool$Wonderjs.getDefaultMinFilter(/* () */0);
                                              var defaultFormat = BasicSourceTextureTool$Wonderjs.getDefaultFormat(/* () */0);
                                              var defaultType = BasicSourceTextureTool$Wonderjs.getDefaultType(/* () */0);
                                              var defaultIsNeedUpdate = BasicSourceTextureTool$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
                                              var match$2 = BasicSourceTextureTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              match$2[/* wrapSs */1],
                                                              match$2[/* wrapTs */2],
                                                              match$2[/* magFilters */3],
                                                              match$2[/* minFilters */4],
                                                              match$2[/* formats */5],
                                                              match$2[/* types */6],
                                                              match$2[/* isNeedUpdates */7]
                                                            ]), /* tuple */[
                                                          new Uint8Array(/* array */[
                                                                defaultWrapS,
                                                                1,
                                                                defaultWrapS,
                                                                defaultWrapS
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultWrapT,
                                                                1,
                                                                defaultWrapT,
                                                                defaultWrapT
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultMagFilter,
                                                                1,
                                                                defaultMagFilter,
                                                                defaultMagFilter
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultMinFilter,
                                                                1,
                                                                defaultMinFilter,
                                                                defaultMinFilter
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultFormat,
                                                                2,
                                                                defaultFormat,
                                                                defaultFormat
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultType,
                                                                1,
                                                                defaultType,
                                                                defaultType
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultIsNeedUpdate,
                                                                defaultIsNeedUpdate,
                                                                defaultIsNeedUpdate,
                                                                defaultIsNeedUpdate
                                                              ])
                                                        ]);
                                            }));
                              }));
                        describe("test restore arrayBufferView source texture record", (function () {
                                return Wonder_jest.test("test restore typeArrays", (function () {
                                              state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 4, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                              var match = _prepareArrayBufferViewSourceTextureData(state[0]);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                              var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state$1);
                                              var currentState = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapT(match$1[1], /* Mirrored_repeat */1, match$1[0]);
                                              var currentState$1 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState);
                                              MainStateTool$Wonderjs.restore(currentState$1, copiedState);
                                              var defaultWrapS = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultWrapS(/* () */0);
                                              var defaultWrapT = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultWrapT(/* () */0);
                                              var defaultMagFilter = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultMagFilter(/* () */0);
                                              var defaultMinFilter = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultMinFilter(/* () */0);
                                              var defaultFormat = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultFormat(/* () */0);
                                              var defaultType = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultType(/* () */0);
                                              var defaultIsNeedUpdate = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
                                              var defaultWidth = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultWidth(/* () */0);
                                              var defaultHeight = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultHeight(/* () */0);
                                              var match$2 = ArrayBufferViewSourceTextureTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              match$2[/* wrapSs */1],
                                                              match$2[/* wrapTs */2],
                                                              match$2[/* magFilters */3],
                                                              match$2[/* minFilters */4],
                                                              match$2[/* formats */5],
                                                              match$2[/* types */6],
                                                              match$2[/* isNeedUpdates */7],
                                                              match$2[/* widths */9],
                                                              match$2[/* heights */10]
                                                            ]), /* tuple */[
                                                          new Uint8Array(/* array */[
                                                                defaultWrapS,
                                                                1,
                                                                defaultWrapS,
                                                                defaultWrapS
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultWrapT,
                                                                1,
                                                                defaultWrapT,
                                                                defaultWrapT
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultMagFilter,
                                                                1,
                                                                defaultMagFilter,
                                                                defaultMagFilter
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultMinFilter,
                                                                1,
                                                                defaultMinFilter,
                                                                defaultMinFilter
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultFormat,
                                                                2,
                                                                defaultFormat,
                                                                defaultFormat
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultType,
                                                                1,
                                                                defaultType,
                                                                defaultType
                                                              ]),
                                                          new Uint8Array(/* array */[
                                                                defaultIsNeedUpdate,
                                                                defaultIsNeedUpdate,
                                                                defaultIsNeedUpdate,
                                                                defaultIsNeedUpdate
                                                              ]),
                                                          new Uint16Array(/* array */[
                                                                defaultWidth,
                                                                2,
                                                                defaultWidth,
                                                                defaultWidth
                                                              ]),
                                                          new Uint16Array(/* array */[
                                                                defaultHeight,
                                                                4,
                                                                defaultHeight,
                                                                defaultHeight
                                                              ])
                                                        ]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("restore sourceInstance record to target state", (function () {
                        Wonder_jest.test("test restore typeArrays", (function () {
                                var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, 3, /* () */0), undefined, undefined, /* () */0);
                                var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObjectArr(2, state);
                                var sourceInstance1 = match[2];
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                var match$1 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObjectArr(3, state$1);
                                var state$2 = StaticTransformTool$Wonderjs.markModelMatrixIsStatic(match$1[2], false, StaticTransformTool$Wonderjs.markModelMatrixIsStatic(sourceInstance1, true, match$1[0]));
                                var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                var match$2 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObjectArr(1, state$2);
                                var currentState = StaticTransformTool$Wonderjs.markModelMatrixIsStatic(sourceInstance1, false, StaticTransformTool$Wonderjs.markModelMatrixIsStatic(match$2[2], true, match$2[0]));
                                MainStateTool$Wonderjs.restore(currentState, copiedState);
                                var match$3 = SourceInstanceTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                match$3[/* isTransformStatics */3],
                                                match$3[/* objectInstanceTransformCollections */4]
                                              ]), /* tuple */[
                                            new Uint8Array(/* array */[
                                                  1,
                                                  0,
                                                  1
                                                ]),
                                            new Uint32Array(/* array */[
                                                  2,
                                                  3,
                                                  0,
                                                  5,
                                                  6,
                                                  7,
                                                  0,
                                                  0,
                                                  0
                                                ])
                                          ]);
                              }));
                        Wonder_jest.test("add current state->sourceInstanceRecord->matrixFloat32ArrayMap typeArr to pool", (function () {
                                var state$1 = state[0];
                                var currentState = MainStateTool$Wonderjs.createNewCompleteState(sandbox);
                                var match = SourceInstanceTool$Wonderjs.getRecord(currentState);
                                var typeArr = new Float32Array(/* array */[1]);
                                SparseMapService$WonderCommonlib.set(0, typeArr, match[/* matrixFloat32ArrayMap */6]);
                                MainStateTool$Wonderjs.restore(currentState, state$1);
                                var match$1 = MainStateTool$Wonderjs.unsafeGetState(/* () */0)[/* typeArrayPoolRecord */35];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$WonderCommonlib.unsafeGet(typeArr.length, match$1[/* float32ArrayPoolMap */0])), /* array */[typeArr]);
                              }));
                        return Wonder_jest.test("mark is-not-send-modelMatrixData", (function () {
                                      var state$1 = state[0];
                                      var match = SourceInstanceTool$Wonderjs.getRecord(state$1);
                                      SparseMapService$WonderCommonlib.set(1, false, SparseMapService$WonderCommonlib.set(0, true, match[/* isSendTransformMatrixDataMap */7]));
                                      MainStateTool$Wonderjs.restore(MainStateTool$Wonderjs.createNewCompleteState(sandbox), state$1);
                                      var match$1 = SourceInstanceTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* isSendTransformMatrixDataMap */7]), /* array */[
                                                  false,
                                                  false
                                                ]);
                                    }));
                      }));
                Wonder_jest.test("restore basicCameraView record to target state", (function () {
                        return _testRestoreStateEqualTargetState(state, _prepareBasicCameraViewData, (function (state) {
                                      return state[/* basicCameraViewRecord */13];
                                    }));
                      }));
                return Wonder_jest.test("restore perspectiveCameraProjection record to target state", (function () {
                              return _testRestoreStateEqualTargetState(state, _preparePerspectiveCameraProjectionData, (function (state) {
                                            return state[/* perspectiveCameraProjectionRecord */14];
                                          }));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
