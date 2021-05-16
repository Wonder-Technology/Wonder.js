

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
import * as BufferMaterialService$Wonderjs from "../../../../../src/service/record/main/material/BufferMaterialService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";

Wonder_jest.describe("test redo,undo component data", (function (param) {
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
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("deepCopyForRestore", (function (param) {
                Wonder_jest.describe("deep copy material record", (function (param) {
                        return Wonder_jest.describe("test basic material", (function (param) {
                                      Wonder_jest.test("shadow copy nameMap, aterialArrayForWorkerInit", (function (param) {
                                              return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                            var match = BasicMaterialTool$Wonderjs.getRecord(state);
                                                            var materialArrayForWorkerInit = match[/* materialArrayForWorkerInit */10];
                                                            return /* array */[
                                                                    match[/* nameMap */9],
                                                                    materialArrayForWorkerInit
                                                                  ];
                                                          }), state[0]);
                                            }));
                                      Wonder_jest.test("deep copy gameObjectsMap", (function (param) {
                                              var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                              var basicMaterial1 = match[2];
                                              var state$1 = match[0];
                                              var match$1 = BasicMaterialTool$Wonderjs.getRecord(state$1);
                                              var originGameObjectsArr = /* array */[1];
                                              var copiedOriginGameObjectsArr = originGameObjectsArr.slice();
                                              MutableSparseMapService$WonderCommonlib.set(basicMaterial1, originGameObjectsArr, match$1[/* gameObjectsMap */7]);
                                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                              var match$2 = BasicMaterialTool$Wonderjs.getRecord(copiedState);
                                              var arr = MutableSparseMapService$WonderCommonlib.unsafeGet(basicMaterial1, match$2[/* gameObjectsMap */7]);
                                              arr[0] = 2;
                                              var match$3 = BasicMaterialTool$Wonderjs.getRecord(state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.unsafeGet(basicMaterial1, match$3[/* gameObjectsMap */7])), copiedOriginGameObjectsArr);
                                            }));
                                      Wonder_jest.test("copy colors", (function (param) {
                                              return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                          BasicMaterialTool$Wonderjs.createGameObject,
                                                          (function (material, state) {
                                                              return TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state));
                                                            }),
                                                          BasicMaterialAPI$Wonderjs.setBasicMaterialColor,
                                                          (function (param) {
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
                                      Wonder_jest.test("copy isDepthTests", (function (param) {
                                              return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                          BasicMaterialTool$Wonderjs.createGameObject,
                                                          BasicMaterialAPI$Wonderjs.getBasicMaterialIsDepthTest,
                                                          BasicMaterialAPI$Wonderjs.setBasicMaterialIsDepthTest,
                                                          (function (param) {
                                                              return /* tuple */[
                                                                      false,
                                                                      false
                                                                    ];
                                                            })
                                                        ], state);
                                            }));
                                      return Wonder_jest.test("copy alphas", (function (param) {
                                                    return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                                BasicMaterialTool$Wonderjs.createGameObject,
                                                                BasicMaterialAPI$Wonderjs.getBasicMaterialAlpha,
                                                                BasicMaterialAPI$Wonderjs.setBasicMaterialAlpha,
                                                                (function (param) {
                                                                    return /* tuple */[
                                                                            1.5,
                                                                            0.5
                                                                          ];
                                                                  })
                                                              ], state);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("deep copy light record", (function (param) {
                        Wonder_jest.describe("test direction light", (function (param) {
                                Wonder_jest.describe("copy type array record", (function (param) {
                                        Wonder_jest.test("copy colors", (function (param) {
                                                return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                            DirectionLightTool$Wonderjs.createGameObject,
                                                            DirectionLightAPI$Wonderjs.getDirectionLightColor,
                                                            DirectionLightAPI$Wonderjs.setDirectionLightColor,
                                                            (function (param) {
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
                                        return Wonder_jest.test("copy intensities", (function (param) {
                                                      return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                                  DirectionLightTool$Wonderjs.createGameObject,
                                                                  DirectionLightAPI$Wonderjs.getDirectionLightIntensity,
                                                                  DirectionLightAPI$Wonderjs.setDirectionLightIntensity,
                                                                  (function (param) {
                                                                      return /* tuple */[
                                                                              2,
                                                                              3
                                                                            ];
                                                                    })
                                                                ], state);
                                                    }));
                                      }));
                                return Wonder_jest.test("shadow copy mappedIndexMap, gameObjectMap, renderLightArr", (function (param) {
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
                        return Wonder_jest.describe("test point light", (function (param) {
                                      Wonder_jest.describe("copy type array record", (function (param) {
                                              Wonder_jest.test("copy colors", (function (param) {
                                                      return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                                  PointLightTool$Wonderjs.createGameObject,
                                                                  PointLightAPI$Wonderjs.getPointLightColor,
                                                                  PointLightAPI$Wonderjs.setPointLightColor,
                                                                  (function (param) {
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
                                              Wonder_jest.test("copy intensities", (function (param) {
                                                      return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                                  PointLightTool$Wonderjs.createGameObject,
                                                                  PointLightAPI$Wonderjs.getPointLightIntensity,
                                                                  PointLightAPI$Wonderjs.setPointLightIntensity,
                                                                  (function (param) {
                                                                      return /* tuple */[
                                                                              2,
                                                                              3
                                                                            ];
                                                                    })
                                                                ], state);
                                                    }));
                                              Wonder_jest.test("copy constants", (function (param) {
                                                      return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                                  PointLightTool$Wonderjs.createGameObject,
                                                                  PointLightAPI$Wonderjs.getPointLightConstant,
                                                                  PointLightAPI$Wonderjs.setPointLightConstant,
                                                                  (function (param) {
                                                                      return /* tuple */[
                                                                              2,
                                                                              3
                                                                            ];
                                                                    })
                                                                ], state);
                                                    }));
                                              Wonder_jest.test("copy linears", (function (param) {
                                                      return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                                  PointLightTool$Wonderjs.createGameObject,
                                                                  PointLightAPI$Wonderjs.getPointLightLinear,
                                                                  PointLightAPI$Wonderjs.setPointLightLinear,
                                                                  (function (param) {
                                                                      return /* tuple */[
                                                                              2,
                                                                              3
                                                                            ];
                                                                    })
                                                                ], state);
                                                    }));
                                              Wonder_jest.test("copy quadratics", (function (param) {
                                                      return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                                  PointLightTool$Wonderjs.createGameObject,
                                                                  PointLightAPI$Wonderjs.getPointLightQuadratic,
                                                                  PointLightAPI$Wonderjs.setPointLightQuadratic,
                                                                  (function (param) {
                                                                      return /* tuple */[
                                                                              2,
                                                                              3
                                                                            ];
                                                                    })
                                                                ], state);
                                                    }));
                                              return Wonder_jest.test("copy ranges", (function (param) {
                                                            return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                                                        PointLightTool$Wonderjs.createGameObject,
                                                                        PointLightAPI$Wonderjs.getPointLightRange,
                                                                        PointLightAPI$Wonderjs.setPointLightRange,
                                                                        (function (param) {
                                                                            return /* tuple */[
                                                                                    2,
                                                                                    3
                                                                                  ];
                                                                          })
                                                                      ], state);
                                                          }));
                                            }));
                                      return Wonder_jest.test("shadow copy mappedIndexMap, gameObjectMap, renderLightArr", (function (param) {
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
                      }));
                Wonder_jest.describe("deep copy sourceInstance record", (function (param) {
                        Wonder_jest.test("deep copy matrixFloat32ArrayMap", (function (param) {
                                var match = SourceInstanceTool$Wonderjs.createSourceInstanceGameObject(state[0]);
                                var sourceInstance1 = match[2];
                                var state$1 = match[0];
                                var match$1 = SourceInstanceTool$Wonderjs.getRecord(state$1);
                                var originMatrixFloat32Array = new Float32Array(/* array */[1]);
                                MutableSparseMapService$WonderCommonlib.set(sourceInstance1, originMatrixFloat32Array, match$1[/* matrixFloat32ArrayMap */6]);
                                var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                var match$2 = SourceInstanceTool$Wonderjs.getRecord(copiedState);
                                var matrixFloat32Array = MutableSparseMapService$WonderCommonlib.unsafeGet(sourceInstance1, match$2[/* matrixFloat32ArrayMap */6]);
                                matrixFloat32Array[0] = 1000;
                                var match$3 = SourceInstanceTool$Wonderjs.getRecord(state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.unsafeGet(sourceInstance1, match$3[/* matrixFloat32ArrayMap */6])), originMatrixFloat32Array);
                              }));
                        return Wonder_jest.test("shadow copy objectInstanceTransformIndexMap, matrixInstanceBufferCapacityMap, gameObjectMap, disposedIndexArray", (function (param) {
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
                Wonder_jest.describe("deep copy gameObject record", (function (param) {
                        return Wonder_jest.test("shadow copy\n          nameMap,\nisActiveMap,\n          isRootMap,\n          disposedUidMap,        disposedUidArray,        disposedUidArrayForKeepOrder,\n\n          disposedUidArrayForKeepOrderRemoveGeometry,\n          disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,\ndisposedUidArrayForRemoveTexture,\n\n\n                  disposedBasicCameraViewArray,        disposedTransformArray,        disposedTransformArrayForKeepOrder,        disposedPerspectiveCameraProjectionArray,\n                  disposedFlyCameraControllerArray,\n                  disposedArcballCameraControllerArray,\n\n                  disposedBasicMaterialDataMap,\n\n                  disposedLightMaterialDataMap,\n                  disposedLightMaterialRemoveTextureDataMap\n\n\n                  disposedGeometryDataMap,        disposedSourceInstanceArray,        disposedObjectInstanceArray,                disposedDirectionLightArray,        disposedPointLightArray,        disposedMeshRendererComponentArray,\n          disposedScriptArray,\n\n          disposedMeshRendererUidArray,                                                aliveUidArray, transformMap, basicCameraViewMap, geometryMap, meshRendererMap, basicMaterialMap, lightMaterialMap, directionLightMap, pointLightMap, sourceInstanceMap, objectInstanceMap, scriptMap", (function (param) {
                                      return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                    var match = GameObjectTool$Wonderjs.getGameObjectRecord(state);
                                                    var nameMap = match[/* nameMap */1];
                                                    var isRootMap = match[/* isRootMap */2];
                                                    var isActiveMap = match[/* isActiveMap */3];
                                                    var disposedUidMap = match[/* disposedUidMap */5];
                                                    var disposedUidArray = match[/* disposedUidArray */6];
                                                    var disposedUidArrayForKeepOrder = match[/* disposedUidArrayForKeepOrder */7];
                                                    var disposedUidArrayForKeepOrderRemoveGeometry = match[/* disposedUidArrayForKeepOrderRemoveGeometry */8];
                                                    var disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial = match[/* disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial */9];
                                                    var disposedUidArrayForRemoveTexture = match[/* disposedUidArrayForRemoveTexture */11];
                                                    var disposedBasicCameraViewArray = match[/* disposedBasicCameraViewArray */12];
                                                    var disposedTransformArray = match[/* disposedTransformArray */13];
                                                    var disposedTransformArrayForKeepOrder = match[/* disposedTransformArrayForKeepOrder */14];
                                                    var disposedPerspectiveCameraProjectionArray = match[/* disposedPerspectiveCameraProjectionArray */15];
                                                    var disposedFlyCameraControllerArray = match[/* disposedFlyCameraControllerArray */16];
                                                    var disposedArcballCameraControllerArray = match[/* disposedArcballCameraControllerArray */17];
                                                    var disposedBasicMaterialDataMap = match[/* disposedBasicMaterialDataMap */18];
                                                    var disposedLightMaterialDataMap = match[/* disposedLightMaterialDataMap */19];
                                                    var disposedLightMaterialRemoveTextureDataMap = match[/* disposedLightMaterialRemoveTextureDataMap */20];
                                                    var disposedGeometryDataMap = match[/* disposedGeometryDataMap */21];
                                                    var disposedSourceInstanceArray = match[/* disposedSourceInstanceArray */22];
                                                    var disposedObjectInstanceArray = match[/* disposedObjectInstanceArray */23];
                                                    var disposedDirectionLightArray = match[/* disposedDirectionLightArray */24];
                                                    var disposedPointLightArray = match[/* disposedPointLightArray */25];
                                                    var disposedMeshRendererComponentArray = match[/* disposedMeshRendererComponentArray */26];
                                                    var disposedScriptArray = match[/* disposedScriptArray */27];
                                                    var aliveUidArray = match[/* aliveUidArray */28];
                                                    var geometryMap = match[/* geometryMap */29];
                                                    var transformMap = match[/* transformMap */30];
                                                    var basicCameraViewMap = match[/* basicCameraViewMap */31];
                                                    var meshRendererMap = match[/* meshRendererMap */35];
                                                    var basicMaterialMap = match[/* basicMaterialMap */36];
                                                    var lightMaterialMap = match[/* lightMaterialMap */37];
                                                    var sourceInstanceMap = match[/* sourceInstanceMap */38];
                                                    var objectInstanceMap = match[/* objectInstanceMap */39];
                                                    var directionLightMap = match[/* directionLightMap */40];
                                                    var pointLightMap = match[/* pointLightMap */41];
                                                    var scriptMap = match[/* scriptMap */42];
                                                    return /* array */[
                                                            nameMap,
                                                            isActiveMap,
                                                            isRootMap,
                                                            disposedUidMap,
                                                            disposedUidArray,
                                                            disposedUidArrayForKeepOrder,
                                                            disposedUidArrayForKeepOrderRemoveGeometry,
                                                            disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,
                                                            disposedUidArrayForRemoveTexture,
                                                            disposedBasicCameraViewArray,
                                                            disposedTransformArray,
                                                            disposedTransformArrayForKeepOrder,
                                                            disposedPerspectiveCameraProjectionArray,
                                                            disposedFlyCameraControllerArray,
                                                            disposedArcballCameraControllerArray,
                                                            disposedBasicMaterialDataMap,
                                                            disposedLightMaterialDataMap,
                                                            disposedLightMaterialRemoveTextureDataMap,
                                                            disposedGeometryDataMap,
                                                            disposedSourceInstanceArray,
                                                            disposedObjectInstanceArray,
                                                            disposedDirectionLightArray,
                                                            disposedPointLightArray,
                                                            disposedMeshRendererComponentArray,
                                                            disposedScriptArray,
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
                                                            objectInstanceMap,
                                                            scriptMap
                                                          ];
                                                  }), state[0]);
                                    }));
                      }));
                Wonder_jest.describe("deep copy objectInstance record", (function (param) {
                        return Wonder_jest.test("shadow copy sourceInstanceMap, gameObjectMap, disposedIndexArray", (function (param) {
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
                Wonder_jest.describe("deep copy basicCameraView record", (function (param) {
                        return Wonder_jest.test("shadow copy isActiveMap, gameObjectMap, disposedIndexArray", (function (param) {
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
                return Wonder_jest.describe("deep copy perspectiveCameraProjection record", (function (param) {
                              Wonder_jest.test("shadow copy dirtyArray, nearMap, farMap, fovyMap, aspectMap, gameObjectMap, disposedIndexArray", (function (param) {
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
                              return Wonder_jest.test("deep copy pMatrixMap", (function (param) {
                                            var match = _preparePerspectiveCameraProjectionData(state);
                                            var state$1 = match[0];
                                            var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                            var record = copiedState[/* perspectiveCameraProjectionRecord */14];
                                            MutableSparseMapService$WonderCommonlib.unsafeGet(0, record[/* pMatrixMap */2])[1] = 10.0;
                                            var oldPMatrix = MutableSparseMapService$WonderCommonlib.unsafeGet(0, state$1[/* perspectiveCameraProjectionRecord */14][/* pMatrixMap */2]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* <> */6], Wonder_jest.Expect[/* expect */0](oldPMatrix[1]), 10.0);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("restore", (function (param) {
                      var _testRestoreStateEqualTargetState = function (state, prepareDataFunc, getDataFunc) {
                        var match = Curry._1(prepareDataFunc, state);
                        var state$1 = match[0];
                        var currentState = MainStateTool$Wonderjs.createNewCompleteStateWithRenderConfig(sandbox);
                        var match$1 = Curry._1(prepareDataFunc, /* record */[/* contents */currentState]);
                        MainStateTool$Wonderjs.restore(match$1[0], state$1);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._1(getDataFunc, MainStateTool$Wonderjs.unsafeGetState(/* () */0))), Curry._1(getDataFunc, state$1));
                      };
                      Wonder_jest.describe("restore material record to target state", (function (param) {
                              return Wonder_jest.describe("test basic material", (function (param) {
                                            return Wonder_jest.test("test restore typeArrays", (function (param) {
                                                          state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                                          var match = _prepareBasicMaterialData(state);
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                          var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                                          var match$1 = BasicMaterialTool$Wonderjs.createGameObject(state$1);
                                                          var material4 = match$1[2];
                                                          var currentState = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material4, /* array */[
                                                                1,
                                                                0.1,
                                                                1
                                                              ], match$1[0]);
                                                          var currentState$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialIsDepthTest(material4, false, currentState);
                                                          var currentState$2 = BasicMaterialAPI$Wonderjs.setBasicMaterialAlpha(material4, 0.5, currentState$1);
                                                          var currentState$3 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState$2);
                                                          MainStateTool$Wonderjs.restore(currentState$3, copiedState);
                                                          var defaultIsDepthTest = BufferMaterialService$Wonderjs.getDefaultIsDepthTest(/* () */0);
                                                          var defaultAlpha = BasicMaterialTool$Wonderjs.getDefaultAlpha(/* () */0);
                                                          var match$2 = BasicMaterialTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          match$2[/* colors */3],
                                                                          match$2[/* isDepthTests */4],
                                                                          match$2[/* alphas */5]
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
                                                                      new Uint8Array(/* array */[
                                                                            defaultIsDepthTest,
                                                                            defaultIsDepthTest,
                                                                            defaultIsDepthTest,
                                                                            defaultIsDepthTest
                                                                          ]),
                                                                      new Float32Array(/* array */[
                                                                            defaultAlpha,
                                                                            defaultAlpha,
                                                                            defaultAlpha,
                                                                            defaultAlpha
                                                                          ])
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("restore light record to target state", (function (param) {
                              var _prepareLightData = function (createGameObjectFunc, state) {
                                var match = Curry._1(createGameObjectFunc, state[0]);
                                var match$1 = Curry._1(createGameObjectFunc, match[0]);
                                var state$1 = AllMaterialTool$Wonderjs.prepareForInit(match$1[0]);
                                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                return /* tuple */[
                                        state$2,
                                        match[1],
                                        match$1[1],
                                        match[2],
                                        match$1[2]
                                      ];
                              };
                              Wonder_jest.describe("test direction light", (function (param) {
                                      return Wonder_jest.test("test restore typeArrays", (function (param) {
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
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                              return Wonder_jest.describe("test point light", (function (param) {
                                            return Wonder_jest.test("test restore typeArrays", (function (param) {
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
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                            }));
                      Wonder_jest.describe("restore sourceInstance record to target state", (function (param) {
                              Wonder_jest.test("test restore typeArrays", (function (param) {
                                      var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, 3, /* () */0), undefined, undefined, /* () */0);
                                      var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObjectArr(2, state);
                                      var sourceInstance1 = match[2];
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var match$1 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObjectArr(3, state$1);
                                      var state$2 = StaticTransformTool$Wonderjs.markModelMatrixIsStatic(match$1[2], false, StaticTransformTool$Wonderjs.markModelMatrixIsStatic(sourceInstance1, true, match$1[0]));
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                      var match$2 = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObjectArr(1, state$2);
                                      var currentState = StaticTransformTool$Wonderjs.markModelMatrixIsStatic(sourceInstance1, false, StaticTransformTool$Wonderjs.markModelMatrixIsStatic(match$2[2], true, match$2[0]));
                                      MainStateTool$Wonderjs.restore(currentState, copiedState);
                                      var match$3 = SourceInstanceTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                              Wonder_jest.test("add current state->sourceInstanceRecord->matrixFloat32ArrayMap typeArr to pool", (function (param) {
                                      var state$1 = state[0];
                                      var currentState = MainStateTool$Wonderjs.createNewCompleteState(sandbox);
                                      var match = SourceInstanceTool$Wonderjs.getRecord(currentState);
                                      var typeArr = new Float32Array(/* array */[1]);
                                      MutableSparseMapService$WonderCommonlib.set(0, typeArr, match[/* matrixFloat32ArrayMap */6]);
                                      MainStateTool$Wonderjs.restore(currentState, state$1);
                                      var match$1 = MainStateTool$Wonderjs.unsafeGetState(/* () */0)[/* typeArrayPoolRecord */38];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.unsafeGet(typeArr.length, match$1[/* float32ArrayPoolMap */0])), /* array */[typeArr]);
                                    }));
                              return Wonder_jest.test("mark is-not-send-modelMatrixData", (function (param) {
                                            var state$1 = state[0];
                                            var match = SourceInstanceTool$Wonderjs.getRecord(state$1);
                                            MutableSparseMapService$WonderCommonlib.set(1, false, MutableSparseMapService$WonderCommonlib.set(0, true, match[/* isSendTransformMatrixDataMap */7]));
                                            MainStateTool$Wonderjs.restore(MainStateTool$Wonderjs.createNewCompleteState(sandbox), state$1);
                                            var match$1 = SourceInstanceTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* isSendTransformMatrixDataMap */7]), /* array */[
                                                        false,
                                                        false
                                                      ]);
                                          }));
                            }));
                      Wonder_jest.test("restore basicCameraView record to target state", (function (param) {
                              return _testRestoreStateEqualTargetState(state, _prepareBasicCameraViewData, (function (state) {
                                            return state[/* basicCameraViewRecord */13];
                                          }));
                            }));
                      return Wonder_jest.test("restore perspectiveCameraProjection record to target state", (function (param) {
                                    return _testRestoreStateEqualTargetState(state, _preparePerspectiveCameraProjectionData, (function (state) {
                                                  return state[/* perspectiveCameraProjectionRecord */14];
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
