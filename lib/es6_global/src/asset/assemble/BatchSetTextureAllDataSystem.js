

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../service/record/main/setting/BufferSettingService.js";
import * as GroupTextureMainService$Wonderjs from "../../service/state/main/texture/GroupTextureMainService.js";
import * as EmptyMapUnitArrayMapService$Wonderjs from "../../service/record/main/material/EmptyMapUnitArrayMapService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";
import * as OperateTypeArrayLightMaterialService$Wonderjs from "../../service/record/all/material/light/OperateTypeArrayLightMaterialService.js";

function _batchSetNewMap(param, param$1, textureCountPerMaterial, state) {
  var setTextureIndexFunc = param$1[1];
  var setMapUnitFunc = param$1[0];
  var textureArr = param[1];
  var materialArr = param[0];
  var state$1 = ArrayService$WonderCommonlib.reduceOneParami((function (state, material, index) {
          var texture = textureArr[index];
          return GroupTextureMainService$Wonderjs.addMaterial(/* tuple */[
                      material,
                      /* LightMaterial */1
                    ], texture, state);
        }), state, materialArr);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  var diffuseMapUnits = lightMaterialRecord[/* diffuseMapUnits */7];
  var match = ArrayService$WonderCommonlib.reduceOneParami((function (param, material, index) {
          var texture = textureArr[index];
          var match = EmptyMapUnitArrayMapService$Wonderjs.unsafeGetEmptyMapUnitAndPop(material, param[2]);
          var mapUnit = match[0];
          return /* tuple */[
                  setTextureIndexFunc(/* tuple */[
                        material,
                        mapUnit,
                        textureCountPerMaterial
                      ], texture, param[0]),
                  setMapUnitFunc(material, mapUnit, param[1]),
                  match[1]
                ];
        }), /* tuple */[
        lightMaterialRecord[/* textureIndices */6],
        diffuseMapUnits,
        lightMaterialRecord[/* emptyMapUnitArrayMap */9]
      ], materialArr);
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* textureIndices */match[0],
    /* diffuseMapUnits */diffuseMapUnits,
    /* specularMapUnits */lightMaterialRecord[/* specularMapUnits */8],
    /* emptyMapUnitArrayMap */match[2],
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */13],
    /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */14],
    /* nameMap */lightMaterialRecord[/* nameMap */15],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */16]
  ];
  return newrecord;
}

function batchSetNewDiffueMaps(diffuseMapLightMaterials, lightMaterialDiffuseMaps, state) {
  return _batchSetNewMap(/* tuple */[
              diffuseMapLightMaterials,
              lightMaterialDiffuseMaps,
              0
            ], /* tuple */[
              OperateTypeArrayLightMaterialService$Wonderjs.setDiffuseMapUnit,
              OperateTypeArrayLightMaterialService$Wonderjs.setTextureIndex
            ], BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]), state);
}

function batchSetBasicSourceTextureData(samplerBasicSourceTextures, arrayBufferViewSourceTextureSamplers, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, arrayBufferViewSourceTexture, index) {
                var match = arrayBufferViewSourceTextureSamplers[index];
                return OperateBasicSourceTextureMainService$Wonderjs.setMinFilter(arrayBufferViewSourceTexture, match[/* minFilter */1], OperateBasicSourceTextureMainService$Wonderjs.setMagFilter(arrayBufferViewSourceTexture, match[/* magFilter */0], OperateBasicSourceTextureMainService$Wonderjs.setWrapT(arrayBufferViewSourceTexture, match[/* wrapT */3], OperateBasicSourceTextureMainService$Wonderjs.setWrapS(arrayBufferViewSourceTexture, match[/* wrapS */2], state))));
              }), state, samplerBasicSourceTextures);
}

function batchSetFormatAndFlipY(basicSourceTextureArr, basicSourceTextures, state) {
  return ArrayService$Wonderjs.reduceOneParamValidi((function (state, basicSourceTexture, index) {
                var match = basicSourceTextures[index];
                return OperateBasicSourceTextureMainService$Wonderjs.setFlipY(basicSourceTexture, match[/* flipY */2], OperateBasicSourceTextureMainService$Wonderjs.setFormat(basicSourceTexture, match[/* format */1], state));
              }), state, basicSourceTextureArr);
}

export {
  _batchSetNewMap ,
  batchSetNewDiffueMaps ,
  batchSetBasicSourceTextureData ,
  batchSetFormatAndFlipY ,
  
}
/* ArrayService-Wonderjs Not a pure module */
