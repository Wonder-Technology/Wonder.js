

import * as Most from "most";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as GLBTool$Wonderjs from "./GLBTool.js";
import * as BufferUtils$Wonderjs from "../../../../../src/asset/utils/BufferUtils.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as GeometryTool$Wonderjs from "../../../../tool/service/geometry/GeometryTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as PointLightAPI$Wonderjs from "../../../../../src/api/light/PointLightAPI.js";
import * as ConvertGLBTool$Wonderjs from "./ConvertGLBTool.js";
import * as ConvertGLBSystem$Wonderjs from "../../../../../src/asset/converter/ConvertGLBSystem.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as BatchCreateSystem$Wonderjs from "../../../../../src/asset/assemble/BatchCreateSystem.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../src/api/light/DirectionLightAPI.js";
import * as AssembleWholeWDBSystem$Wonderjs from "../../../../../src/asset/assemble/AssembleWholeWDBSystem.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function buildGLTFJsonOfMultiSceneGameObjects(param) {
  return ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, "\n        [\n            {\n                \"nodes\": [0,1]\n            }\n        ]\n        ", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.0,\n                20.0,\n                30.0,\n                1.0\n            ],\n            \"mesh\": 0\n        },\n        {\n            \"mesh\": 0\n        }\n    ]\n\n    ", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function testGLTF(sandbox, embeddedGLTFJsonStr, testFunc, state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var binBuffer = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : GLBTool$Wonderjs.buildBinBuffer(/* () */0);
  var isHandleIMGUI = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  var isBindEvent = $staropt$star$2 !== undefined ? $staropt$star$2 : true;
  var isActiveCamera = $staropt$star$3 !== undefined ? $staropt$star$3 : true;
  var isRenderLight = $staropt$star$4 !== undefined ? $staropt$star$4 : true;
  var isLoadImage = $staropt$star$5 !== undefined ? $staropt$star$5 : true;
  var result = /* record */[/* contents */1];
  GLBTool$Wonderjs.prepare(sandbox);
  return Most.forEach((function (data) {
                  result[0] = data;
                  return /* () */0;
                }), AssembleWholeWDBSystem$Wonderjs.assemble(ConvertGLBSystem$Wonderjs.convertGLBData(JSON.parse(embeddedGLTFJsonStr), binBuffer), /* tuple */[
                    isHandleIMGUI,
                    isBindEvent,
                    isActiveCamera,
                    isRenderLight,
                    isLoadImage
                  ], state[0])).then((function (param) {
                return Promise.resolve(Curry._1(testFunc, result[0]));
              }));
}

function testGLBWithConfig(sandbox, glbFilePath, testFunc, state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var isHandleIMGUI = $staropt$star !== undefined ? $staropt$star : true;
  var isBindEvent = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  var isActiveCamera = $staropt$star$2 !== undefined ? $staropt$star$2 : true;
  var isRenderLight = $staropt$star$3 !== undefined ? $staropt$star$3 : true;
  var isLoadImage = $staropt$star$4 !== undefined ? $staropt$star$4 : true;
  var result = /* record */[/* contents */1];
  return ConvertGLBTool$Wonderjs.testResult(sandbox, glbFilePath, (function (param) {
                return Most.forEach((function (data) {
                                result[0] = data;
                                return /* () */0;
                              }), AssembleWholeWDBSystem$Wonderjs.assembleWDBData(param[0], param[1], /* tuple */[
                                  isHandleIMGUI,
                                  isBindEvent,
                                  isActiveCamera,
                                  isRenderLight,
                                  isLoadImage
                                ], state)).then((function (param) {
                              return Promise.resolve(Curry._1(testFunc, result[0]));
                            }));
              }));
}

function testWDB(sandbox, wdbArrayBuffer, testFunc, state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var isHandleIMGUI = $staropt$star !== undefined ? $staropt$star : true;
  var isBindEvent = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  var isActiveCamera = $staropt$star$2 !== undefined ? $staropt$star$2 : true;
  var isRenderLight = $staropt$star$3 !== undefined ? $staropt$star$3 : true;
  var isLoadImage = $staropt$star$4 !== undefined ? $staropt$star$4 : true;
  var result = /* record */[/* contents */1];
  GLBTool$Wonderjs.prepare(sandbox);
  var match = BufferUtils$Wonderjs.decodeWDB(wdbArrayBuffer, AssembleWholeWDBSystem$Wonderjs.checkWDB);
  return Most.forEach((function (data) {
                  result[0] = data;
                  return /* () */0;
                }), AssembleWholeWDBSystem$Wonderjs.assembleWDBData(JSON.parse(match[0]), match[2], /* tuple */[
                    isHandleIMGUI,
                    isBindEvent,
                    isActiveCamera,
                    isRenderLight,
                    isLoadImage
                  ], state)).then((function (param) {
                return Promise.resolve(Curry._1(testFunc, result[0]));
              }));
}

function testGLB(sandbox, glbFilePath, testFunc, state) {
  return testGLBWithConfig(sandbox, glbFilePath, testFunc, state, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

var getAllChildrenTransform = GameObjectAPI$Wonderjs.getAllChildrenTransform;

function getAllSortedTransforms(rootGameObject, state) {
  var allTransformChildren = GameObjectAPI$Wonderjs.getAllChildrenTransform(rootGameObject, state);
  var allTransformChildren$1 = allTransformChildren.sort();
  return /* array */[GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state)].concat(allTransformChildren$1);
}

var getAllGameObjects = GameObjectAPI$Wonderjs.getAllGameObjects;

function getAllChildrenData(allGameObjectData) {
  return allGameObjectData.slice(1);
}

function getAllGameObjectsIsActive(rootGameObject, state) {
  return GameObjectAPI$Wonderjs.getAllGameObjects(rootGameObject, state).map((function (gameObject) {
                return GameObjectAPI$Wonderjs.unsafeGetGameObjectIsActive(gameObject, state);
              }));
}

function getAllGameObjectsIsRoot(rootGameObject, state) {
  return GameObjectAPI$Wonderjs.getAllGameObjects(rootGameObject, state).map((function (gameObject) {
                return GameObjectAPI$Wonderjs.unsafeGetGameObjectIsRoot(gameObject, state);
              }));
}

function getAllMeshRenderers(rootGameObject, state) {
  return GameObjectAPI$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                  return GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent(gameObject, state);
                })).map((function (gameObject) {
                return GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(gameObject, state);
              }));
}

function getAllDirectionLights(rootGameObject, state) {
  return GameObjectAPI$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                  return GameObjectAPI$Wonderjs.hasGameObjectDirectionLightComponent(gameObject, state);
                })).map((function (gameObject) {
                return GameObjectAPI$Wonderjs.unsafeGetGameObjectDirectionLightComponent(gameObject, state);
              }));
}

function getAllDirectionLightData(rootGameObject, state) {
  return getAllDirectionLights(rootGameObject, state).map((function (light) {
                return /* tuple */[
                        DirectionLightAPI$Wonderjs.getDirectionLightColor(light, state),
                        DirectionLightAPI$Wonderjs.getDirectionLightIntensity(light, state)
                      ];
              }));
}

function getAllPointLights(rootGameObject, state) {
  return GameObjectAPI$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                  return GameObjectAPI$Wonderjs.hasGameObjectPointLightComponent(gameObject, state);
                })).map((function (gameObject) {
                return GameObjectAPI$Wonderjs.unsafeGetGameObjectPointLightComponent(gameObject, state);
              }));
}

function getAllPointLightData(rootGameObject, state) {
  return getAllPointLights(rootGameObject, state).map((function (light) {
                return /* tuple */[
                        PointLightAPI$Wonderjs.getPointLightColor(light, state),
                        PointLightAPI$Wonderjs.getPointLightIntensity(light, state),
                        PointLightAPI$Wonderjs.getPointLightConstant(light, state),
                        PointLightAPI$Wonderjs.getPointLightLinear(light, state),
                        PointLightAPI$Wonderjs.getPointLightQuadratic(light, state),
                        PointLightAPI$Wonderjs.getPointLightRange(light, state)
                      ];
              }));
}

function getAllGeometrys(rootGameObject, state) {
  return GameObjectAPI$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                  return GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent(gameObject, state);
                })).map((function (gameObject) {
                return GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(gameObject, state);
              }));
}

function getAllGeometryData(rootGameObject, state) {
  return getAllGeometrys(rootGameObject, state).map((function (geometry) {
                return /* tuple */[
                        GeometryAPI$Wonderjs.unsafeGetGeometryName(geometry, state),
                        /* tuple */[
                          GeometryTool$Wonderjs.getMainVertices(geometry, state),
                          GeometryTool$Wonderjs.getMainNormals(geometry, state),
                          GeometryTool$Wonderjs.getMainTexCoords(geometry, state),
                          GeometryTool$Wonderjs.getMainIndices16(geometry, state),
                          GeometryTool$Wonderjs.getMainIndices32(geometry, state)
                        ]
                      ];
              }));
}

function getAllScripts(rootGameObject, state) {
  return GameObjectAPI$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                  return GameObjectAPI$Wonderjs.hasGameObjectScriptComponent(gameObject, state);
                })).map((function (gameObject) {
                return GameObjectAPI$Wonderjs.unsafeGetGameObjectScriptComponent(gameObject, state);
              }));
}

function getAllBasicMaterials(rootGameObject, state) {
  return GameObjectAPI$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                  return GameObjectAPI$Wonderjs.hasGameObjectBasicMaterialComponent(gameObject, state);
                })).map((function (gameObject) {
                return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(gameObject, state);
              }));
}

function getAllLightMaterials(rootGameObject, state) {
  return GameObjectAPI$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                  return GameObjectAPI$Wonderjs.hasGameObjectLightMaterialComponent(gameObject, state);
                })).map((function (gameObject) {
                return GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(gameObject, state);
              }));
}

function getAllDiffuseMaps(rootGameObject, state) {
  return getAllLightMaterials(rootGameObject, state).filter((function (lightMaterial) {
                  return LightMaterialAPI$Wonderjs.hasLightMaterialDiffuseMap(lightMaterial, state);
                })).map((function (lightMaterial) {
                return LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(lightMaterial, state);
              }));
}

function isImageUint8ArrayMapEqual(sourceImageUint8ArrayMap, targetImageUint8ArrayMap) {
  return Caml_obj.caml_equal(MutableSparseMapService$WonderCommonlib.mapValid((function (param) {
                    return /* tuple */[
                            param[0],
                            param[1].byteLength
                          ];
                  }), sourceImageUint8ArrayMap), MutableSparseMapService$WonderCommonlib.mapValid((function (param) {
                    return /* tuple */[
                            param[0],
                            param[1]
                          ];
                  }), targetImageUint8ArrayMap));
}

function isCubemapTextureImageUint8ArrayMapEqual(sourceImageUint8ArrayMap, targetImageUint8ArrayMap) {
  return Caml_obj.caml_equal(MutableSparseMapService$WonderCommonlib.mapValid((function (param) {
                    var match = param[/* nzImageUint8ArrayData */5];
                    var match$1 = param[/* pzImageUint8ArrayData */4];
                    var match$2 = param[/* nyImageUint8ArrayData */3];
                    var match$3 = param[/* pyImageUint8ArrayData */2];
                    var match$4 = param[/* nxImageUint8ArrayData */1];
                    var match$5 = param[/* pxImageUint8ArrayData */0];
                    return /* record */[
                            /* pxImageUint8ArrayData : tuple */[
                              match$5[0],
                              match$5[1].byteLength
                            ],
                            /* nxImageUint8ArrayData : tuple */[
                              match$4[0],
                              match$4[1].byteLength
                            ],
                            /* pyImageUint8ArrayData : tuple */[
                              match$3[0],
                              match$3[1].byteLength
                            ],
                            /* nyImageUint8ArrayData : tuple */[
                              match$2[0],
                              match$2[1].byteLength
                            ],
                            /* pzImageUint8ArrayData : tuple */[
                              match$1[0],
                              match$1[1].byteLength
                            ],
                            /* nzImageUint8ArrayData : tuple */[
                              match[0],
                              match[1].byteLength
                            ]
                          ];
                  }), sourceImageUint8ArrayMap), MutableSparseMapService$WonderCommonlib.mapValid((function (data) {
                    return data;
                  }), targetImageUint8ArrayMap));
}

var batchCreate = BatchCreateSystem$Wonderjs.batchCreate;

export {
  buildGLTFJsonOfMultiSceneGameObjects ,
  testGLTF ,
  testGLBWithConfig ,
  testWDB ,
  testGLB ,
  getAllChildrenTransform ,
  getAllSortedTransforms ,
  getAllGameObjects ,
  getAllChildrenData ,
  getAllGameObjectsIsActive ,
  getAllGameObjectsIsRoot ,
  getAllMeshRenderers ,
  getAllDirectionLights ,
  getAllDirectionLightData ,
  getAllPointLights ,
  getAllPointLightData ,
  getAllGeometrys ,
  getAllGeometryData ,
  getAllScripts ,
  batchCreate ,
  getAllBasicMaterials ,
  getAllLightMaterials ,
  getAllDiffuseMaps ,
  isImageUint8ArrayMapEqual ,
  isCubemapTextureImageUint8ArrayMapEqual ,
  
}
/* most Not a pure module */
