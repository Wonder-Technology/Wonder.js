

import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as BatchOperateSystem$Wonderjs from "./BatchOperateSystem.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BatchSetTextureAllDataSystem$Wonderjs from "./BatchSetTextureAllDataSystem.js";
import * as BatchOperateWholeGeometrySystem$Wonderjs from "./BatchOperateWholeGeometrySystem.js";
import * as BatchSetWholeTextureAllDataSystem$Wonderjs from "./BatchSetWholeTextureAllDataSystem.js";
import * as BatchAddGameObjectComponentMainService$Wonderjs from "../../service/state/main/gameObject/BatchAddGameObjectComponentMainService.js";

function _batchSetGeometryData(wd, geometryArr, bufferArr, state) {
  var dataViewArr = bufferArr.map(DataViewCommon$Wonderjs.create);
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, geometryData, geometryIndex) {
                var match = OptionService$Wonderjs.isJsonSerializedValueNone(geometryData);
                if (match) {
                  return state;
                } else {
                  var geometryData$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(geometryData);
                  var geometry = geometryArr[geometryIndex];
                  return BatchOperateWholeGeometrySystem$Wonderjs.setGeometryData(geometry, wd, dataViewArr, geometryData$1, state);
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

var getBatchAllTypeTextureData = _getBatchTextureData;

function batchOperate(wd, param, bufferArr, param$1, param$2) {
  var basicSourceTextureArr = param$2[3];
  var match = param$2[2];
  var scriptArr = match[10];
  var pointLightArr = match[9];
  var directionLightArr = match[8];
  var lightMaterialArr = match[7];
  var basicMaterialArr = match[6];
  var arcballCameraControllerArr = match[5];
  var perspectiveCameraProjectionArr = match[4];
  var basicCameraViewArr = match[3];
  var meshRendererArr = match[2];
  var geometryArr = match[1];
  var transformArr = match[0];
  var gameObjectArr = param$2[1];
  var indices = wd[/* indices */2];
  var state = BatchOperateSystem$Wonderjs.batchSetNamesAndGameObjectIsActiveAndIsRoot(wd, /* tuple */[
        param$2[0],
        gameObjectArr,
        /* tuple */[
          transformArr,
          geometryArr
        ],
        basicSourceTextureArr
      ]);
  var match$1 = BatchOperateSystem$Wonderjs.getBatchComponentGameObjectData(/* tuple */[
        gameObjectArr,
        transformArr,
        geometryArr,
        meshRendererArr,
        basicCameraViewArr,
        perspectiveCameraProjectionArr,
        arcballCameraControllerArr,
        basicMaterialArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr,
        scriptArr
      ], indices, wd, state);
  var match$2 = match$1[0];
  var gameObjectGeometrys = match$2[5];
  var geometryGameObjects = match$2[4];
  var gameObjectTransforms = match$2[3];
  var state$1 = BatchSetTextureAllDataSystem$Wonderjs.batchSetFormatAndFlipY(basicSourceTextureArr, wd[/* basicSourceTextures */5], match$1[1]);
  var basicSourceTextureData = getBatchAllTypeTextureData(lightMaterialArr, basicSourceTextureArr, param[0], wd);
  var imageUint8ArrayDataMap = BatchSetWholeTextureAllDataSystem$Wonderjs.convertKeyFromImageIndexToBasicSourceTexture(indices[/* imageTextureIndices */2], basicSourceTextureArr, param[1]);
  return /* tuple */[
          BatchSetWholeTextureAllDataSystem$Wonderjs.batchSet(basicSourceTextureData, BatchAddGameObjectComponentMainService$Wonderjs.batchAddGeometryComponentForCreate(geometryGameObjects, gameObjectGeometrys, BatchOperateSystem$Wonderjs.batchAddComponent(wd, /* tuple */[
                        match$2[2],
                        gameObjectTransforms,
                        geometryGameObjects,
                        gameObjectGeometrys,
                        match$2[6],
                        match$2[7],
                        match$2[8],
                        match$2[9],
                        match$2[10],
                        match$2[11],
                        match$2[12],
                        match$2[13],
                        match$2[14],
                        match$2[15],
                        match$2[16],
                        match$2[17],
                        match$2[18],
                        match$2[19],
                        match$2[20],
                        match$2[21],
                        match$2[22],
                        match$2[23]
                      ], _batchSetGeometryData(wd, geometryArr, bufferArr, BatchOperateSystem$Wonderjs.batchSetComponentData(wd, /* tuple */[
                                param$1[0],
                                param$1[1]
                              ], /* tuple */[
                                transformArr,
                                geometryArr,
                                meshRendererArr,
                                basicCameraViewArr,
                                perspectiveCameraProjectionArr,
                                arcballCameraControllerArr,
                                basicMaterialArr,
                                lightMaterialArr,
                                directionLightArr,
                                pointLightArr,
                                scriptArr
                              ], /* tuple */[
                                match$2[0],
                                match$2[1],
                                gameObjectTransforms
                              ], state$1))))),
          imageUint8ArrayDataMap,
          gameObjectArr
        ];
}

export {
  _batchSetGeometryData ,
  _getBatchTextureData ,
  getBatchAllTypeTextureData ,
  batchOperate ,
  
}
/* OptionService-Wonderjs Not a pure module */
