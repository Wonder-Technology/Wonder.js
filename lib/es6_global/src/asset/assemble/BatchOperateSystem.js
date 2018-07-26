

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as AssembleCommon$Wonderjs from "./AssembleCommon.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BatchOperateLightSystem$Wonderjs from "./BatchOperateLightSystem.js";
import * as NameGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/NameGameObjectMainService.js";
import * as RecordTransformMainService$Wonderjs from "../../service/state/main/transform/RecordTransformMainService.js";
import * as BatchSetTextureAllDataSystem$Wonderjs from "./BatchSetTextureAllDataSystem.js";
import * as NameLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/NameLightMaterialMainService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/OperateLightMaterialMainService.js";
import * as IndicesCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/IndicesCustomGeometryMainService.js";
import * as NormalsCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/NormalsCustomGeometryMainService.js";
import * as OperateTypeArrayTransformService$Wonderjs from "../../service/record/main/transform/OperateTypeArrayTransformService.js";
import * as NameBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/NameBasicSourceTextureMainService.js";
import * as VerticesCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/VerticesCustomGeometryMainService.js";
import * as TexCoordsCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/TexCoordsCustomGeometryMainService.js";
import * as OperateArcballCameraControllerService$Wonderjs from "../../service/record/main/camera_controller/arcball/OperateArcballCameraControllerService.js";
import * as BatchAddGameObjectComponentMainService$Wonderjs from "../../service/state/main/gameObject/BatchAddGameObjectComponentMainService.js";
import * as FrustumPerspectiveCameraProjectionService$Wonderjs from "../../service/record/main/perspective_camera_projection/FrustumPerspectiveCameraProjectionService.js";

function _getBatchArrByIndices(sourceArr, indices) {
  return indices.map((function (index) {
                return sourceArr[index];
              }));
}

function _batchCreateMeshRendererArr(lightMaterialGameObjects, _, state) {
  var meshRendererRecord = state[/* meshRendererRecord */24];
  AssembleCommon$Wonderjs.checkNotDisposedBefore(meshRendererRecord[/* disposedIndexArray */4]);
  var index = meshRendererRecord[/* index */0];
  var newIndex = index + lightMaterialGameObjects.length | 0;
  var indexArr = ArrayService$Wonderjs.range(index, newIndex - 1 | 0);
  state[/* meshRendererRecord */24] = /* record */[
    /* index */newIndex,
    /* basicMaterialRenderGameObjectMap */meshRendererRecord[/* basicMaterialRenderGameObjectMap */1],
    /* lightMaterialRenderGameObjectMap */meshRendererRecord[/* lightMaterialRenderGameObjectMap */2],
    /* gameObjectMap */meshRendererRecord[/* gameObjectMap */3],
    /* disposedIndexArray */meshRendererRecord[/* disposedIndexArray */4]
  ];
  return /* tuple */[
          state,
          indexArr
        ];
}

function _getBatchComponentGameObjectData(param, indices, wd, state) {
  var transformArr = param[1];
  var gameObjectArr = param[0];
  var parentTransforms = _getBatchArrByIndices(transformArr, indices[/* gameObjectIndices */0][/* childrenTransformIndexData */0][/* parentTransformIndices */0]);
  var childrenTransforms = indices[/* gameObjectIndices */0][/* childrenTransformIndexData */0][/* childrenTransformIndices */1].map((function (childrenIndices) {
          return childrenIndices.map((function (index) {
                        return transformArr[index];
                      }));
        }));
  var transformGameObjects = _getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* transformGameObjectIndexData */1][/* gameObjectIndices */0]);
  var gameObjectTransforms = _getBatchArrByIndices(transformArr, indices[/* gameObjectIndices */0][/* transformGameObjectIndexData */1][/* componentIndices */1]);
  var customGeometryGameObjects = _getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* customGeometryGameObjectIndexData */8][/* gameObjectIndices */0]);
  var gameObjectCustomGeometrys = _getBatchArrByIndices(param[2], indices[/* gameObjectIndices */0][/* customGeometryGameObjectIndexData */8][/* componentIndices */1]);
  var lightMaterialGameObjects = _getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */5][/* gameObjectIndices */0]);
  var gameObjectLightMaterials = _getBatchArrByIndices(param[6], indices[/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */5][/* componentIndices */1]);
  var match = _batchCreateMeshRendererArr(lightMaterialGameObjects, wd, state);
  return /* tuple */[
          /* tuple */[
            parentTransforms,
            childrenTransforms,
            transformGameObjects,
            gameObjectTransforms,
            customGeometryGameObjects,
            gameObjectCustomGeometrys,
            _getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* basicCameraViewGameObjectIndexData */2][/* gameObjectIndices */0]),
            _getBatchArrByIndices(param[3], indices[/* gameObjectIndices */0][/* basicCameraViewGameObjectIndexData */2][/* componentIndices */1]),
            _getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* perspectiveCameraProjectionGameObjectIndexData */3][/* gameObjectIndices */0]),
            _getBatchArrByIndices(param[4], indices[/* gameObjectIndices */0][/* perspectiveCameraProjectionGameObjectIndexData */3][/* componentIndices */1]),
            _getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* arcballCameraControllerGameObjectIndexData */4][/* gameObjectIndices */0]),
            _getBatchArrByIndices(param[5], indices[/* gameObjectIndices */0][/* arcballCameraControllerGameObjectIndexData */4][/* componentIndices */1]),
            lightMaterialGameObjects,
            gameObjectLightMaterials,
            lightMaterialGameObjects,
            match[1],
            _getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* directionLightGameObjectIndexData */6][/* gameObjectIndices */0]),
            _getBatchArrByIndices(param[7], indices[/* gameObjectIndices */0][/* directionLightGameObjectIndexData */6][/* componentIndices */1]),
            _getBatchArrByIndices(gameObjectArr, indices[/* gameObjectIndices */0][/* pointLightGameObjectIndexData */7][/* gameObjectIndices */0]),
            _getBatchArrByIndices(param[8], indices[/* gameObjectIndices */0][/* pointLightGameObjectIndexData */7][/* componentIndices */1])
          ],
          match[0]
        ];
}

function _getBatchTextureData(lightMaterialArr, textureArr, imageArr, param) {
  var indices = param[/* indices */2];
  return /* tuple */[
          /* tuple */[
            _getBatchArrByIndices(lightMaterialArr, indices[/* materialIndices */1][/* diffuseMapMaterialIndices */0][/* materialIndices */0]),
            _getBatchArrByIndices(textureArr, indices[/* materialIndices */1][/* diffuseMapMaterialIndices */0][/* mapIndices */1])
          ],
          /* tuple */[
            _getBatchArrByIndices(textureArr, indices[/* samplerTextureIndices */3][/* textureIndices */0]),
            _getBatchArrByIndices(param[/* samplers */6], indices[/* samplerTextureIndices */3][/* samplerIndices */1])
          ],
          /* tuple */[
            _getBatchArrByIndices(textureArr, indices[/* imageTextureIndices */2][/* textureIndices */0]),
            _getBatchArrByIndices(imageArr, indices[/* imageTextureIndices */2][/* imageIndices */1])
          ]
        ];
}

var _getBatchAllTypeTextureData = _getBatchTextureData;

function _getAccessorTypeSize(param) {
  switch (param[/* type_ */4]) {
    case 0 : 
        return 1;
    case 1 : 
        return 2;
    case 2 : 
        return 3;
    case 3 : 
    case 4 : 
        return 4;
    case 5 : 
        return 9;
    case 6 : 
        return 16;
    
  }
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
                          return /* () */0;
                        } else {
                          return Contract$WonderLog.Operators[/* = */0](OptionService$Wonderjs.unsafeGetJsonSerializedValue(byteStride), Caml_int32.imul(_getAccessorTypeSize(accessor), bytes_per_element));
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
          Caml_int32.imul(accessor[/* count */2], _getAccessorTypeSize(accessor))
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

function _getBufferIndexData(accessorIndex, dataViewArr, wd) {
  return _getBufferPointData(/* tuple */[
              accessorIndex,
              Uint16Array.BYTES_PER_ELEMENT,
              dataViewArr,
              wd
            ], (function (prim, prim$1, prim$2) {
                return new Uint16Array(prim, prim$1, prim$2);
              }));
}

function _batchSetCustomGeometryData(wd, customGeometryArr, bufferArr, state) {
  var dataViewArr = bufferArr.map(DataViewCommon$Wonderjs.create);
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, geometryData, geometryIndex) {
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(geometryData);
                if (match) {
                  return state;
                } else {
                  var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(geometryData);
                  var texCoord = match$1[/* texCoord */2];
                  var normal = match$1[/* normal */1];
                  var customGeometry = customGeometryArr[geometryIndex];
                  var state$1 = VerticesCustomGeometryMainService$Wonderjs.setVerticesByTypeArray(customGeometry, _getBufferAttributeData(match$1[/* position */0], dataViewArr, wd), state);
                  var match$2 = OptionService$Wonderjs.isJsonSerializedValueNone(normal);
                  var state$2 = match$2 ? state$1 : NormalsCustomGeometryMainService$Wonderjs.setNormalsByTypeArray(customGeometry, _getBufferAttributeData(OptionService$Wonderjs.unsafeGetJsonSerializedValue(normal), dataViewArr, wd), state$1);
                  var match$3 = OptionService$Wonderjs.isJsonSerializedValueNone(texCoord);
                  var state$3 = match$3 ? state$2 : TexCoordsCustomGeometryMainService$Wonderjs.setTexCoordsByTypeArray(customGeometry, _getBufferAttributeData(OptionService$Wonderjs.unsafeGetJsonSerializedValue(texCoord), dataViewArr, wd), state$2);
                  return IndicesCustomGeometryMainService$Wonderjs.setIndicesByTypeArray(customGeometry, _getBufferIndexData(match$1[/* index */3], dataViewArr, wd), state$3);
                }
              }), state, wd[/* customGeometrys */16]);
}

function _batchSetTransformParent(parentTransforms, childrenTransforms, state) {
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var parentMap = transformRecord[/* parentMap */15];
  var childMap = transformRecord[/* childMap */16];
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (hierachyDataTuple, parentTransform, index) {
          return AssembleCommon$Wonderjs.addChildrenToParent(parentTransform, childrenTransforms[index], hierachyDataTuple);
        }), /* tuple */[
        parentMap,
        childMap
      ], parentTransforms);
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(transformRecord);
  newrecord[/* transformRecord */11] = (newrecord$1[/* parentMap */15] = match[0], newrecord$1[/* childMap */16] = match[1], newrecord$1);
  return newrecord;
}

function _batchSetTransformData(param, gameObjectTransforms, state) {
  var transforms = param[/* transforms */15];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var localPositions = transformRecord[/* localPositions */3];
  var localRotations = transformRecord[/* localRotations */4];
  var localScales = transformRecord[/* localScales */5];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(transformRecord);
  newrecord[/* transformRecord */11] = (newrecord$1[/* localPositions */3] = ArrayService$WonderCommonlib.reduceOneParami((function (localPositions, param, index) {
            var translation = param[/* translation */0];
            var match = OptionService$Wonderjs.isJsonSerializedValueNone(translation);
            if (match) {
              return localPositions;
            } else {
              var transform = Caml_array.caml_array_get(gameObjectTransforms, index);
              return OperateTypeArrayTransformService$Wonderjs.setLocalPositionByTuple(transform, OptionService$Wonderjs.unsafeGetJsonSerializedValue(translation), localPositions);
            }
          }), localPositions, transforms), newrecord$1[/* localRotations */4] = ArrayService$WonderCommonlib.reduceOneParami((function (localRotations, param, index) {
            var rotation = param[/* rotation */1];
            var match = OptionService$Wonderjs.isJsonSerializedValueNone(rotation);
            if (match) {
              return localRotations;
            } else {
              var transform = Caml_array.caml_array_get(gameObjectTransforms, index);
              return OperateTypeArrayTransformService$Wonderjs.setLocalRotationByTuple(transform, OptionService$Wonderjs.unsafeGetJsonSerializedValue(rotation), localRotations);
            }
          }), localRotations, transforms), newrecord$1[/* localScales */5] = ArrayService$WonderCommonlib.reduceOneParami((function (localScales, param, index) {
            var scale = param[/* scale */2];
            var match = OptionService$Wonderjs.isJsonSerializedValueNone(scale);
            if (match) {
              return localScales;
            } else {
              var transform = Caml_array.caml_array_get(gameObjectTransforms, index);
              return OperateTypeArrayTransformService$Wonderjs.setLocalScaleByTuple(transform, OptionService$Wonderjs.unsafeGetJsonSerializedValue(scale), localScales);
            }
          }), localScales, transforms), newrecord$1);
  return newrecord;
}

function _batchSetPerspectiveCameraProjectionData(param, perspectiveCameraProjectionArr, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  ArrayService$WonderCommonlib.reduceOneParami((function (perspectiveCameraProjectionRecord, param, index) {
          var aspect = param[/* aspect */3];
          var far = param[/* far */1];
          var cameraProjection = Caml_array.caml_array_get(perspectiveCameraProjectionArr, index);
          var perspectiveCameraProjectionRecord$1 = FrustumPerspectiveCameraProjectionService$Wonderjs.setNear(cameraProjection, param[/* near */0], perspectiveCameraProjectionRecord);
          var match = OptionService$Wonderjs.isJsonSerializedValueNone(far);
          var perspectiveCameraProjectionRecord$2 = match ? FrustumPerspectiveCameraProjectionService$Wonderjs.setFar(cameraProjection, FrustumPerspectiveCameraProjectionService$Wonderjs.getInfiniteFar(/* () */0), perspectiveCameraProjectionRecord$1) : FrustumPerspectiveCameraProjectionService$Wonderjs.setFar(cameraProjection, OptionService$Wonderjs.unsafeGetJsonSerializedValue(far), perspectiveCameraProjectionRecord$1);
          var perspectiveCameraProjectionRecord$3 = FrustumPerspectiveCameraProjectionService$Wonderjs.setFovy(cameraProjection, param[/* fovy */2], perspectiveCameraProjectionRecord$2);
          var match$1 = OptionService$Wonderjs.isJsonSerializedValueNone(aspect);
          if (match$1) {
            return perspectiveCameraProjectionRecord$3;
          } else {
            return FrustumPerspectiveCameraProjectionService$Wonderjs.setAspect(cameraProjection, OptionService$Wonderjs.unsafeGetJsonSerializedValue(aspect), perspectiveCameraProjectionRecord$3);
          }
        }), perspectiveCameraProjectionRecord, param[/* perspectiveCameraProjections */13]);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = perspectiveCameraProjectionRecord;
  return newrecord;
}

function _batchSetArcballCameraControllerData(param, arcballCameraControllerArr, state) {
  var arcballCameraControllerRecord = state[/* arcballCameraControllerRecord */25];
  ArrayService$WonderCommonlib.reduceOneParami((function (arcballCameraControllerRecord, param, index) {
          var cameraController = Caml_array.caml_array_get(arcballCameraControllerArr, index);
          return OperateArcballCameraControllerService$Wonderjs.setWheelSpeed(cameraController, param[/* wheelSpeed */9], OperateArcballCameraControllerService$Wonderjs.setRotateSpeed(cameraController, param[/* rotateSpeed */8], OperateArcballCameraControllerService$Wonderjs.setMoveSpeedY(cameraController, param[/* moveSpeedY */7], OperateArcballCameraControllerService$Wonderjs.setMoveSpeedX(cameraController, param[/* moveSpeedX */6], OperateArcballCameraControllerService$Wonderjs.setTarget(cameraController, param[/* target */5], OperateArcballCameraControllerService$Wonderjs.setThetaMargin(cameraController, param[/* thetaMargin */4], OperateArcballCameraControllerService$Wonderjs.setTheta(cameraController, param[/* theta */3], OperateArcballCameraControllerService$Wonderjs.setPhi(cameraController, param[/* phi */2], OperateArcballCameraControllerService$Wonderjs.setDistance(cameraController, param[/* distance */0], OperateArcballCameraControllerService$Wonderjs.setMinDistance(cameraController, param[/* minDistance */1], arcballCameraControllerRecord))))))))));
        }), arcballCameraControllerRecord, param[/* arcballCameraControllers */14]);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arcballCameraControllerRecord */25] = arcballCameraControllerRecord;
  return newrecord;
}

function _batchSetLightMaterialData(param, lightMaterialArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, param, index) {
                var material = Caml_array.caml_array_get(lightMaterialArr, index);
                return NameLightMaterialMainService$Wonderjs.setName(material, param[/* name */1], OperateLightMaterialMainService$Wonderjs.setDiffuseColor(material, param[/* diffuseColor */0], state));
              }), state, param[/* lightMaterials */17]);
}

function _batchSetGameObjectName(targets, names, setNameFunc, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, target, index) {
                return setNameFunc(target, names[index], state);
              }), state, targets);
}

function _batchSetTextureName(basicSourceTextureArr, basicSourceTextures, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, basicSourceTexture, index) {
                return NameBasicSourceTextureMainService$Wonderjs.setName(basicSourceTexture, basicSourceTextures[index][/* name */0], state);
              }), state, basicSourceTextureArr);
}

function _batchSetNames(param, param$1, state) {
  return _batchSetTextureName(param[1], param$1[1], _batchSetGameObjectName(param[0], param$1[0][/* names */1], NameGameObjectMainService$Wonderjs.setName, state));
}

function batchOperate(wd, blobObjectUrlImageArr, bufferArr, param) {
  var basicSourceTextureArr = param[3];
  var match = param[2];
  var pointLightArr = match[7];
  var directionLightArr = match[6];
  var lightMaterialArr = match[5];
  var arcballCameraControllerArr = match[4];
  var perspectiveCameraProjectionArr = match[3];
  var customGeometryArr = match[1];
  var gameObjectArr = param[1];
  var basicSourceTextures = wd[/* basicSourceTextures */5];
  var state = _batchSetNames(/* tuple */[
        gameObjectArr,
        basicSourceTextureArr
      ], /* tuple */[
        wd[/* gameObjects */3],
        basicSourceTextures
      ], param[0]);
  var match$1 = _getBatchComponentGameObjectData(/* tuple */[
        gameObjectArr,
        match[0],
        customGeometryArr,
        match[2],
        perspectiveCameraProjectionArr,
        arcballCameraControllerArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr
      ], wd[/* indices */2], wd, state);
  var match$2 = match$1[0];
  var gameObjectTransforms = match$2[3];
  var state$1 = BatchSetTextureAllDataSystem$Wonderjs.batchSetFormat(basicSourceTextureArr, basicSourceTextures, match$1[1]);
  var basicSourceTextureData = _getBatchAllTypeTextureData(lightMaterialArr, basicSourceTextureArr, blobObjectUrlImageArr, wd);
  return /* tuple */[
          BatchSetTextureAllDataSystem$Wonderjs.batchSet(basicSourceTextureData, BatchAddGameObjectComponentMainService$Wonderjs.batchAddPointLightComponentForCreate(match$2[18], match$2[19], BatchAddGameObjectComponentMainService$Wonderjs.batchAddDirectionLightComponentForCreate(match$2[16], match$2[17], BatchAddGameObjectComponentMainService$Wonderjs.batchAddMeshRendererComponentForCreate(match$2[14], match$2[15], BatchAddGameObjectComponentMainService$Wonderjs.batchAddLightMaterialComponentForCreate(match$2[12], match$2[13], BatchAddGameObjectComponentMainService$Wonderjs.batchAddArcballCameraControllerComponentForCreate(match$2[10], match$2[11], BatchAddGameObjectComponentMainService$Wonderjs.batchAddPerspectiveCameraProjectionComponentForCreate(match$2[8], match$2[9], BatchAddGameObjectComponentMainService$Wonderjs.batchAddBasicCameraViewComponentForCreate(match$2[6], match$2[7], BatchAddGameObjectComponentMainService$Wonderjs.batchAddCustomGeometryComponentForCreate(match$2[4], match$2[5], BatchAddGameObjectComponentMainService$Wonderjs.batchAddTransformComponentForCreate(match$2[2], gameObjectTransforms, BatchOperateLightSystem$Wonderjs.setAmbientLightData(wd, BatchOperateLightSystem$Wonderjs.batchSetPointLightData(wd, pointLightArr, BatchOperateLightSystem$Wonderjs.batchSetDirectionLightData(wd, directionLightArr, _batchSetLightMaterialData(wd, lightMaterialArr, _batchSetArcballCameraControllerData(wd, arcballCameraControllerArr, _batchSetPerspectiveCameraProjectionData(wd, perspectiveCameraProjectionArr, _batchSetCustomGeometryData(wd, customGeometryArr, bufferArr, _batchSetTransformParent(match$2[0], match$2[1], _batchSetTransformData(wd, gameObjectTransforms, state$1))))))))))))))))))),
          gameObjectArr
        ];
}

export {
  _getBatchArrByIndices ,
  _batchCreateMeshRendererArr ,
  _getBatchComponentGameObjectData ,
  _getBatchTextureData ,
  _getBatchAllTypeTextureData ,
  _getAccessorTypeSize ,
  _getBufferData ,
  _getBufferPointData ,
  _getBufferAttributeData ,
  _getBufferIndexData ,
  _batchSetCustomGeometryData ,
  _batchSetTransformParent ,
  _batchSetTransformData ,
  _batchSetPerspectiveCameraProjectionData ,
  _batchSetArcballCameraControllerData ,
  _batchSetLightMaterialData ,
  _batchSetGameObjectName ,
  _batchSetTextureName ,
  _batchSetNames ,
  batchOperate ,
  
}
/* Log-WonderLog Not a pure module */
