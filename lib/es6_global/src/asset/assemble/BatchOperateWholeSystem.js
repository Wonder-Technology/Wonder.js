

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_int32 from "../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as BatchOperateSystem$Wonderjs from "./BatchOperateSystem.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BatchOperateLightSystem$Wonderjs from "./BatchOperateLightSystem.js";
import * as IndicesGeometryMainService$Wonderjs from "../../service/state/main/geometry/IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "../../service/state/main/geometry/NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "../../service/state/main/geometry/VerticesGeometryMainService.js";
import * as BatchSetTextureAllDataSystem$Wonderjs from "./BatchSetTextureAllDataSystem.js";
import * as TexCoordsGeometryMainService$Wonderjs from "../../service/state/main/geometry/TexCoordsGeometryMainService.js";
import * as BatchSetWholeTextureAllDataSystem$Wonderjs from "./BatchSetWholeTextureAllDataSystem.js";
import * as BatchAddGameObjectComponentMainService$Wonderjs from "../../service/state/main/gameObject/BatchAddGameObjectComponentMainService.js";

function _getAccessorComponentType(param, accessorIndex) {
  return param[/* accessors */9][accessorIndex][/* componentType */3];
}

function _getBufferData(param, param$1) {
  var bytes_per_element = param$1[2];
  var accessorIndex = param$1[0];
  var accessors = param[/* accessors */9];
  var bufferViews = param[/* bufferViews */8];
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("not support interleaved buffer data", "is interleaved"), (function () {
                        var accessor = accessors[accessorIndex];
                        var match = bufferViews[accessor[/* bufferView */0]];
                        var byteStride = match[/* byteStride */3];
                        var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(byteStride);
                        if (match$1) {
                          return Contract$WonderLog.assertPass(/* () */0);
                        } else {
                          return Contract$WonderLog.Operators[/* = */0](OptionService$Wonderjs.unsafeGetJsonSerializedValue(byteStride), Caml_int32.imul(BufferUtils$Wonderjs.getAccessorTypeSize(accessor[/* type_ */4]), bytes_per_element));
                        }
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var accessor = accessors[accessorIndex];
  var bufferView = bufferViews[accessor[/* bufferView */0]];
  var dataView = param$1[1][bufferView[/* buffer */0]];
  var offset = accessor[/* byteOffset */1] + bufferView[/* byteOffset */1] | 0;
  return /* tuple */[
          dataView.buffer,
          offset,
          BufferUtils$Wonderjs.computeTypeArrayLengthByAccessorData(accessor[/* count */2], accessor[/* type_ */4])
        ];
}

function _getBufferPointData(param, fromBufferRangeFunc) {
  var match = _getBufferData(param[3], /* tuple */[
        param[0],
        param[2],
        param[1]
      ]);
  return Curry._3(fromBufferRangeFunc, match[0], match[1], match[2]);
}

function _getBufferAttributeData(accessorIndex, dataViewArr, wd) {
  return _getBufferPointData(/* tuple */[
              accessorIndex,
              Float32Array.BYTES_PER_ELEMENT,
              dataViewArr,
              wd
            ], (function (prim, prim$1, prim$2) {
                return new Float32Array(prim, prim$1, prim$2);
              }));
}

function _getBufferIndex16Data(componentType, accessorIndex, dataViewArr, wd) {
  var switcher = componentType - 1 | 0;
  if (switcher > 2 || switcher < 0) {
    return undefined;
  } else {
    switch (switcher) {
      case 0 : 
          return Js_primitive.some(Uint16Array.from(_getBufferPointData(/* tuple */[
                              accessorIndex,
                              Uint8Array.BYTES_PER_ELEMENT,
                              dataViewArr,
                              wd
                            ], (function (prim, prim$1, prim$2) {
                                return new Uint8Array(prim, prim$1, prim$2);
                              }))));
      case 1 : 
          return undefined;
      case 2 : 
          return Js_primitive.some(_getBufferPointData(/* tuple */[
                          accessorIndex,
                          Uint16Array.BYTES_PER_ELEMENT,
                          dataViewArr,
                          wd
                        ], (function (prim, prim$1, prim$2) {
                            return new Uint16Array(prim, prim$1, prim$2);
                          })));
      
    }
  }
}

function _getBufferIndex32Data(componentType, accessorIndex, dataViewArr, wd) {
  if (componentType !== 4) {
    return undefined;
  } else {
    return Js_primitive.some(_getBufferPointData(/* tuple */[
                    accessorIndex,
                    Uint32Array.BYTES_PER_ELEMENT,
                    dataViewArr,
                    wd
                  ], (function (prim, prim$1, prim$2) {
                      return new Uint32Array(prim, prim$1, prim$2);
                    })));
  }
}

function _batchSetGeometryData(wd, geometryArr, bufferArr, state) {
  var dataViewArr = bufferArr.map(DataViewCommon$Wonderjs.create);
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, geometryData, geometryIndex) {
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(geometryData);
                if (match) {
                  return state;
                } else {
                  var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(geometryData);
                  var index = match$1[/* index */4];
                  var texCoord = match$1[/* texCoord */3];
                  var normal = match$1[/* normal */2];
                  var geometry = geometryArr[geometryIndex];
                  var state$1 = VerticesGeometryMainService$Wonderjs.setVerticesByTypeArray(geometry, _getBufferAttributeData(match$1[/* position */1], dataViewArr, wd), state);
                  var match$2 = OptionService$Wonderjs.isJsonSerializedValueNone(normal);
                  var state$2 = match$2 ? state$1 : NormalsGeometryMainService$Wonderjs.setNormalsByTypeArray(geometry, _getBufferAttributeData(OptionService$Wonderjs.unsafeGetJsonSerializedValue(normal), dataViewArr, wd), state$1);
                  var match$3 = OptionService$Wonderjs.isJsonSerializedValueNone(texCoord);
                  var state$3 = match$3 ? state$2 : TexCoordsGeometryMainService$Wonderjs.setTexCoordsByTypeArray(geometry, _getBufferAttributeData(OptionService$Wonderjs.unsafeGetJsonSerializedValue(texCoord), dataViewArr, wd), state$2);
                  var componentType = _getAccessorComponentType(wd, index);
                  var match$4 = _getBufferIndex16Data(componentType, index, dataViewArr, wd);
                  if (match$4 !== undefined) {
                    return IndicesGeometryMainService$Wonderjs.setIndicesByUint16Array(geometry, Js_primitive.valFromOption(match$4), state$3);
                  } else {
                    var match$5 = _getBufferIndex32Data(componentType, index, dataViewArr, wd);
                    if (match$5 !== undefined) {
                      return IndicesGeometryMainService$Wonderjs.setIndicesByUint32Array(geometry, Js_primitive.valFromOption(match$5), state$3);
                    } else {
                      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_batchSetGeometryData", "unknown componentType: " + (String(componentType) + ""), "", "", ""));
                    }
                  }
                }
              }), state, wd[/* geometrys */16]);
}

function _getBatchTextureData(lightMaterialArr, textureArr, imageArr, param) {
  var indices = param[/* indices */2];
  return /* tuple */[
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(lightMaterialArr, indices[/* materialIndices */1][/* diffuseMapMaterialIndices */0][/* materialIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* materialIndices */1][/* diffuseMapMaterialIndices */0][/* mapIndices */1])
          ],
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* samplerTextureIndices */3][/* textureIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(param[/* samplers */6], indices[/* samplerTextureIndices */3][/* samplerIndices */1])
          ],
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* imageTextureIndices */2][/* textureIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(imageArr, indices[/* imageTextureIndices */2][/* imageIndices */1])
          ]
        ];
}

var _getBatchAllTypeTextureData = _getBatchTextureData;

function batchOperate(wd, param, bufferArr, param$1, param$2) {
  var basicSourceTextureArr = param$2[3];
  var match = param$2[2];
  var pointLightArr = match[9];
  var directionLightArr = match[8];
  var lightMaterialArr = match[7];
  var basicMaterialArr = match[6];
  var arcballCameraControllerArr = match[5];
  var perspectiveCameraProjectionArr = match[4];
  var basicCameraViewArr = match[3];
  var meshRendererArr = match[2];
  var geometryArr = match[1];
  var gameObjectArr = param$2[1];
  var basicSourceTextures = wd[/* basicSourceTextures */5];
  var gameObjects = wd[/* gameObjects */3];
  var indices = wd[/* indices */2];
  var state = BatchOperateSystem$Wonderjs.batchSetIsRoot(gameObjectArr, gameObjects, BatchOperateSystem$Wonderjs.batchSetNames(/* tuple */[
            gameObjectArr,
            basicSourceTextureArr
          ], /* tuple */[
            gameObjects,
            basicSourceTextures
          ], /* tuple */[
            wd[/* geometrys */16],
            geometryArr
          ], param$2[0]));
  var match$1 = BatchOperateSystem$Wonderjs.getBatchComponentGameObjectData(/* tuple */[
        gameObjectArr,
        match[0],
        geometryArr,
        meshRendererArr,
        basicCameraViewArr,
        perspectiveCameraProjectionArr,
        arcballCameraControllerArr,
        basicMaterialArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr
      ], indices, wd, state);
  var match$2 = match$1[0];
  var gameObjectTransforms = match$2[3];
  var state$1 = BatchSetTextureAllDataSystem$Wonderjs.batchSetFormat(basicSourceTextureArr, basicSourceTextures, match$1[1]);
  var basicSourceTextureData = _getBatchAllTypeTextureData(lightMaterialArr, basicSourceTextureArr, param[0], wd);
  var imageUint8ArrayDataMap = BatchSetWholeTextureAllDataSystem$Wonderjs.convertKeyFromImageIndexToBasicSourceTexture(indices[/* imageTextureIndices */2], basicSourceTextureArr, param[1]);
  return /* tuple */[
          BatchSetWholeTextureAllDataSystem$Wonderjs.batchSet(basicSourceTextureData, BatchAddGameObjectComponentMainService$Wonderjs.batchAddPointLightComponentForCreate(match$2[20], match$2[21], BatchAddGameObjectComponentMainService$Wonderjs.batchAddDirectionLightComponentForCreate(match$2[18], match$2[19], BatchAddGameObjectComponentMainService$Wonderjs.batchAddMeshRendererComponentForCreate(match$2[16], match$2[17], BatchAddGameObjectComponentMainService$Wonderjs.batchAddLightMaterialComponentForCreate(match$2[14], match$2[15], BatchAddGameObjectComponentMainService$Wonderjs.batchAddBasicMaterialComponentForCreate(match$2[12], match$2[13], BatchAddGameObjectComponentMainService$Wonderjs.batchAddArcballCameraControllerComponentForCreate(match$2[10], match$2[11], BatchAddGameObjectComponentMainService$Wonderjs.batchAddPerspectiveCameraProjectionComponentForCreate(match$2[8], match$2[9], BatchAddGameObjectComponentMainService$Wonderjs.batchAddBasicCameraViewComponentForCreate(match$2[6], match$2[7], BatchAddGameObjectComponentMainService$Wonderjs.batchAddGeometryComponentForCreate(match$2[4], match$2[5], BatchAddGameObjectComponentMainService$Wonderjs.batchAddTransformComponentForCreate(match$2[2], gameObjectTransforms, BatchOperateLightSystem$Wonderjs.setAmbientLightData(wd, BatchOperateLightSystem$Wonderjs.batchSetPointLightData(wd, pointLightArr, BatchOperateLightSystem$Wonderjs.batchSetDirectionLightData(wd, directionLightArr, BatchOperateSystem$Wonderjs.batchSetLightMaterialData(wd, lightMaterialArr, BatchOperateSystem$Wonderjs.batchSetBasicMaterialData(wd, basicMaterialArr, BatchOperateSystem$Wonderjs.batchSetMeshRendererData(wd, meshRendererArr, BatchOperateSystem$Wonderjs.batchSetArcballCameraControllerData(wd, arcballCameraControllerArr, param$1[0], BatchOperateSystem$Wonderjs.batchSetPerspectiveCameraProjectionData(wd, perspectiveCameraProjectionArr, BatchOperateSystem$Wonderjs.batchSetBasicCameraViewData(wd, basicCameraViewArr, param$1[1], _batchSetGeometryData(wd, geometryArr, bufferArr, BatchOperateSystem$Wonderjs.batchSetTransformParent(match$2[0], match$2[1], BatchOperateSystem$Wonderjs.batchSetTransformData(wd, gameObjectTransforms, state$1))))))))))))))))))))))),
          imageUint8ArrayDataMap,
          gameObjectArr
        ];
}

export {
  _getAccessorComponentType ,
  _getBufferData ,
  _getBufferPointData ,
  _getBufferAttributeData ,
  _getBufferIndex16Data ,
  _getBufferIndex32Data ,
  _batchSetGeometryData ,
  _getBatchTextureData ,
  _getBatchAllTypeTextureData ,
  batchOperate ,
  
}
/* Log-WonderLog Not a pure module */
