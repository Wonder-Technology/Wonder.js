

import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as BatchOperateSystem$Wonderjs from "./BatchOperateSystem.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as BatchOperateWholeGeometrySystem$Wonderjs from "./BatchOperateWholeGeometrySystem.js";
import * as BatchSetCubemapTextureAllDataSystem$Wonderjs from "./BatchSetCubemapTextureAllDataSystem.js";
import * as BatchAddGameObjectComponentMainService$Wonderjs from "../../service/state/main/gameObject/BatchAddGameObjectComponentMainService.js";
import * as BatchSetBasicSourceTextureAllDataSystem$Wonderjs from "./BatchSetBasicSourceTextureAllDataSystem.js";
import * as BatchSetWholeCubemapTextureAllDataSystem$Wonderjs from "./BatchSetWholeCubemapTextureAllDataSystem.js";
import * as BatchSetWholeBasicSourceTextureAllDataSystem$Wonderjs from "./BatchSetWholeBasicSourceTextureAllDataSystem.js";

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
              }), state, wd[/* geometrys */18]);
}

function getBatchAllTypeBasicSourceTextureData(lightMaterialArr, textureArr, imageArr, param) {
  var indices = param[/* indices */2];
  return /* tuple */[
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(lightMaterialArr, indices[/* materialIndices */1][/* diffuseMapMaterialIndices */0][/* materialIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* materialIndices */1][/* diffuseMapMaterialIndices */0][/* mapIndices */1])
          ],
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* samplerTextureIndices */4][/* textureIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(param[/* samplers */7], indices[/* samplerTextureIndices */4][/* samplerIndices */1])
          ],
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* imageBasicSourceTextureIndices */2][/* textureIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(imageArr, indices[/* imageBasicSourceTextureIndices */2][/* imageIndices */1])
          ]
        ];
}

function getBatchAllTypeCubemapTextureData(textureArr, imageArr, param) {
  var indices = param[/* indices */2];
  return /* tuple */[
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* samplerCubemapTextureIndices */5][/* cubemapTextureIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(param[/* samplers */7], indices[/* samplerCubemapTextureIndices */5][/* samplerIndices */1])
          ],
          /* tuple */[
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(textureArr, indices[/* imageCubemapTextureIndices */3][/* cubemapTextureIndices */0]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(imageArr, indices[/* imageCubemapTextureIndices */3][/* pxImageIndices */1]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(imageArr, indices[/* imageCubemapTextureIndices */3][/* nxImageIndices */2]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(imageArr, indices[/* imageCubemapTextureIndices */3][/* pyImageIndices */3]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(imageArr, indices[/* imageCubemapTextureIndices */3][/* nyImageIndices */4]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(imageArr, indices[/* imageCubemapTextureIndices */3][/* pzImageIndices */5]),
            BatchOperateSystem$Wonderjs.getBatchArrByIndices(imageArr, indices[/* imageCubemapTextureIndices */3][/* nzImageIndices */6])
          ]
        ];
}

function batchOperate(wd, param, bufferArr, param$1, param$2) {
  var match = param$2[3];
  var cubemapTextureArr = match[1];
  var basicSourceTextureArr = match[0];
  var match$1 = param$2[2];
  var scriptArr = match$1[11];
  var pointLightArr = match$1[10];
  var directionLightArr = match$1[9];
  var lightMaterialArr = match$1[8];
  var basicMaterialArr = match$1[7];
  var arcballCameraControllerArr = match$1[6];
  var flyCameraControllerArr = match$1[5];
  var perspectiveCameraProjectionArr = match$1[4];
  var basicCameraViewArr = match$1[3];
  var meshRendererArr = match$1[2];
  var geometryArr = match$1[1];
  var transformArr = match$1[0];
  var gameObjectArr = param$2[1];
  var imageUint8ArrayDataMap = param[1];
  var blobObjectUrlImageArr = param[0];
  var indices = wd[/* indices */2];
  var state = BatchOperateSystem$Wonderjs.batchSetNamesAndGameObjectIsActiveAndIsRoot(wd, /* tuple */[
        param$2[0],
        gameObjectArr,
        /* tuple */[
          transformArr,
          geometryArr
        ],
        /* tuple */[
          basicSourceTextureArr,
          cubemapTextureArr
        ]
      ]);
  var match$2 = BatchOperateSystem$Wonderjs.getBatchComponentGameObjectData(/* tuple */[
        gameObjectArr,
        transformArr,
        geometryArr,
        meshRendererArr,
        basicCameraViewArr,
        perspectiveCameraProjectionArr,
        flyCameraControllerArr,
        arcballCameraControllerArr,
        basicMaterialArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr,
        scriptArr
      ], indices, wd, state);
  var match$3 = match$2[0];
  var gameObjectGeometrys = match$3[5];
  var geometryGameObjects = match$3[4];
  var gameObjectTransforms = match$3[3];
  var state$1 = BatchSetCubemapTextureAllDataSystem$Wonderjs.batchSetFormatAndTypeAndFlipY(cubemapTextureArr, wd[/* cubemapTextures */6], BatchSetBasicSourceTextureAllDataSystem$Wonderjs.batchSetFormatAndTypeAndFlipY(basicSourceTextureArr, wd[/* basicSourceTextures */5], match$2[1]));
  var basicSourceTextureData = getBatchAllTypeBasicSourceTextureData(lightMaterialArr, basicSourceTextureArr, blobObjectUrlImageArr, wd);
  var cubemapTextureData = getBatchAllTypeCubemapTextureData(cubemapTextureArr, blobObjectUrlImageArr, wd);
  var basicSourceTextureImageUint8ArrayDataMap = BatchSetWholeBasicSourceTextureAllDataSystem$Wonderjs.convertKeyFromImageIndexToBasicSourceTexture(indices[/* imageBasicSourceTextureIndices */2], basicSourceTextureArr, MutableSparseMapService$WonderCommonlib.copy(imageUint8ArrayDataMap));
  var cubemapTextureImageUint8ArrayDataMap = BatchSetWholeCubemapTextureAllDataSystem$Wonderjs.convertKeyFromImageIndexToCubemapTexture(indices[/* imageCubemapTextureIndices */3], cubemapTextureArr, MutableSparseMapService$WonderCommonlib.copy(imageUint8ArrayDataMap));
  return /* tuple */[
          BatchSetWholeCubemapTextureAllDataSystem$Wonderjs.batchSet(cubemapTextureData, BatchSetWholeBasicSourceTextureAllDataSystem$Wonderjs.batchSet(basicSourceTextureData, _batchSetGeometryData(wd, geometryArr, bufferArr, BatchOperateSystem$Wonderjs.batchSetComponentData(wd, /* tuple */[
                            param$1[0],
                            param$1[1]
                          ], /* tuple */[
                            transformArr,
                            geometryArr,
                            meshRendererArr,
                            basicCameraViewArr,
                            perspectiveCameraProjectionArr,
                            flyCameraControllerArr,
                            arcballCameraControllerArr,
                            basicMaterialArr,
                            lightMaterialArr,
                            directionLightArr,
                            pointLightArr,
                            scriptArr
                          ], /* tuple */[
                            match$3[0],
                            match$3[1],
                            gameObjectTransforms
                          ], BatchAddGameObjectComponentMainService$Wonderjs.batchAddGeometryComponentForCreate(geometryGameObjects, gameObjectGeometrys, BatchOperateSystem$Wonderjs.batchAddComponent(wd, /* tuple */[
                                    match$3[2],
                                    gameObjectTransforms,
                                    geometryGameObjects,
                                    gameObjectGeometrys,
                                    match$3[6],
                                    match$3[7],
                                    match$3[8],
                                    match$3[9],
                                    match$3[10],
                                    match$3[11],
                                    match$3[12],
                                    match$3[13],
                                    match$3[14],
                                    match$3[15],
                                    match$3[16],
                                    match$3[17],
                                    match$3[18],
                                    match$3[19],
                                    match$3[20],
                                    match$3[21],
                                    match$3[22],
                                    match$3[23],
                                    match$3[24],
                                    match$3[25]
                                  ], state$1)))))),
          /* tuple */[
            basicSourceTextureImageUint8ArrayDataMap,
            cubemapTextureImageUint8ArrayDataMap
          ],
          gameObjectArr,
          cubemapTextureArr
        ];
}

export {
  _batchSetGeometryData ,
  getBatchAllTypeBasicSourceTextureData ,
  getBatchAllTypeCubemapTextureData ,
  batchOperate ,
  
}
/* OptionService-Wonderjs Not a pure module */
