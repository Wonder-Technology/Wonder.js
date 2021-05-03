'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var GLBTool$Wonderjs = require("./GLBTool.js");
var BufferUtils$Wonderjs = require("../../../../../src/asset/utils/BufferUtils.js");
var GeometryAPI$Wonderjs = require("../../../../../src/api/geometry/GeometryAPI.js");
var GeometryTool$Wonderjs = require("../../../../tool/service/geometry/GeometryTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var PointLightAPI$Wonderjs = require("../../../../../src/api/light/PointLightAPI.js");
var ConvertGLBTool$Wonderjs = require("./ConvertGLBTool.js");
var ConvertGLBSystem$Wonderjs = require("../../../../../src/asset/converter/ConvertGLBSystem.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var BatchCreateSystem$Wonderjs = require("../../../../../src/asset/assemble/BatchCreateSystem.js");
var DirectionLightAPI$Wonderjs = require("../../../../../src/api/light/DirectionLightAPI.js");
var AssembleWholeWDBSystem$Wonderjs = require("../../../../../src/asset/assemble/AssembleWholeWDBSystem.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");

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

exports.buildGLTFJsonOfMultiSceneGameObjects = buildGLTFJsonOfMultiSceneGameObjects;
exports.testGLTF = testGLTF;
exports.testGLBWithConfig = testGLBWithConfig;
exports.testWDB = testWDB;
exports.testGLB = testGLB;
exports.getAllChildrenTransform = getAllChildrenTransform;
exports.getAllSortedTransforms = getAllSortedTransforms;
exports.getAllGameObjects = getAllGameObjects;
exports.getAllChildrenData = getAllChildrenData;
exports.getAllGameObjectsIsActive = getAllGameObjectsIsActive;
exports.getAllGameObjectsIsRoot = getAllGameObjectsIsRoot;
exports.getAllMeshRenderers = getAllMeshRenderers;
exports.getAllDirectionLights = getAllDirectionLights;
exports.getAllDirectionLightData = getAllDirectionLightData;
exports.getAllPointLights = getAllPointLights;
exports.getAllPointLightData = getAllPointLightData;
exports.getAllGeometrys = getAllGeometrys;
exports.getAllGeometryData = getAllGeometryData;
exports.getAllScripts = getAllScripts;
exports.batchCreate = batchCreate;
exports.getAllBasicMaterials = getAllBasicMaterials;
exports.getAllLightMaterials = getAllLightMaterials;
exports.getAllDiffuseMaps = getAllDiffuseMaps;
exports.isImageUint8ArrayMapEqual = isImageUint8ArrayMapEqual;
exports.isCubemapTextureImageUint8ArrayMapEqual = isCubemapTextureImageUint8ArrayMapEqual;
/* most Not a pure module */
