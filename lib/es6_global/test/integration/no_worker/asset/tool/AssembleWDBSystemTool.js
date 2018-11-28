

import * as Most from "most";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as GLBTool$Wonderjs from "./GLBTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as GeometryTool$Wonderjs from "../../../../tool/service/geometry/GeometryTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as PointLightAPI$Wonderjs from "../../../../../src/api/light/PointLightAPI.js";
import * as ConvertGLBTool$Wonderjs from "./ConvertGLBTool.js";
import * as ConvertGLBSystem$Wonderjs from "../../../../../src/asset/converter/ConvertGLBSystem.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as SparseMapService$Wonderjs from "../../../../../src/service/atom/SparseMapService.js";
import * as BatchCreateSystem$Wonderjs from "../../../../../src/asset/assemble/BatchCreateSystem.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../src/api/light/DirectionLightAPI.js";
import * as AssembleWholeWDBSystem$Wonderjs from "../../../../../src/asset/assemble/AssembleWholeWDBSystem.js";

function buildGLTFJsonOfMultiSceneGameObjects() {
  return ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, "\n        [\n            {\n                \"nodes\": [0,1]\n            }\n        ]\n        ", undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.0,\n                20.0,\n                30.0,\n                1.0\n            ],\n            \"mesh\": 0\n        },\n        {\n            \"mesh\": 0\n        }\n    ]\n\n    ", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function testGLTF(sandbox, embeddedGLTFJsonStr, testFunc, state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, _) {
  var binBuffer = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : GLBTool$Wonderjs.buildBinBuffer(/* () */0);
  var isSetIMGUIFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
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
                    isSetIMGUIFunc,
                    isBindEvent,
                    isActiveCamera,
                    isRenderLight,
                    isLoadImage
                  ], state[0])).then((function () {
                return Promise.resolve(Curry._1(testFunc, result[0]));
              }));
}

function testGLBWithConfig(sandbox, glbFilePath, testFunc, state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, _) {
  var isSetIMGUIFunc = $staropt$star !== undefined ? $staropt$star : true;
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
                                  isSetIMGUIFunc,
                                  isBindEvent,
                                  isActiveCamera,
                                  isRenderLight,
                                  isLoadImage
                                ], state)).then((function () {
                              return Promise.resolve(Curry._1(testFunc, result[0]));
                            }));
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
  return Caml_obj.caml_equal(SparseMapService$Wonderjs.mapValid((function (param) {
                    return /* tuple */[
                            param[0],
                            param[1].byteLength
                          ];
                  }), sourceImageUint8ArrayMap), SparseMapService$Wonderjs.mapValid((function (param) {
                    return /* tuple */[
                            param[0],
                            param[1]
                          ];
                  }), targetImageUint8ArrayMap));
}

var batchCreate = BatchCreateSystem$Wonderjs.batchCreate;

export {
  buildGLTFJsonOfMultiSceneGameObjects ,
  testGLTF ,
  testGLBWithConfig ,
  testGLB ,
  getAllChildrenTransform ,
  getAllSortedTransforms ,
  getAllGameObjects ,
  getAllMeshRenderers ,
  getAllDirectionLights ,
  getAllDirectionLightData ,
  getAllPointLights ,
  getAllPointLightData ,
  getAllGeometrys ,
  getAllGeometryData ,
  batchCreate ,
  getAllBasicMaterials ,
  getAllLightMaterials ,
  getAllDiffuseMaps ,
  isImageUint8ArrayMapEqual ,
  
}
/* most Not a pure module */
