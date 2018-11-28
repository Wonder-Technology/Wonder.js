

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../service/record/main/setting/BufferSettingService.js";
import * as EmptyMapUnitArrayMapService$Wonderjs from "../../service/record/main/material/EmptyMapUnitArrayMapService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";
import * as OperateTypeArrayLightMaterialService$Wonderjs from "../../service/record/all/material/light/OperateTypeArrayLightMaterialService.js";

function _batchSetNewMap(param, param$1, param$2) {
  var textureCountPerMaterial = param$2[0];
  var setTextureIndexFunc = param$1[1];
  var setMapUnitFunc = param$1[0];
  var textureArr = param[1];
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, material, index) {
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
              param$2[1],
              param$2[2],
              param$2[3]
            ], param[0]);
}

function batchSetNewDiffueMaps(diffuseMapLightMaterials, lightMaterialDiffuseMaps, state) {
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var match = _batchSetNewMap(/* tuple */[
        diffuseMapLightMaterials,
        lightMaterialDiffuseMaps,
        0
      ], /* tuple */[
        OperateTypeArrayLightMaterialService$Wonderjs.setDiffuseMapUnit,
        OperateTypeArrayLightMaterialService$Wonderjs.setTextureIndex
      ], /* tuple */[
        BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]),
        lightMaterialRecord[/* textureIndices */6],
        lightMaterialRecord[/* diffuseMapUnits */7],
        lightMaterialRecord[/* emptyMapUnitArrayMap */9]
      ]);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */lightMaterialRecord[/* index */0],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* textureIndices */match[0],
    /* diffuseMapUnits */match[1],
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

function batchSetBasicSourceTextureData(samplerBasicSourceTextures, arrayBufferViewSourceTextureSamplers, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, arrayBufferViewSourceTexture, index) {
                var match = arrayBufferViewSourceTextureSamplers[index];
                return OperateBasicSourceTextureMainService$Wonderjs.setMinFilter(arrayBufferViewSourceTexture, match[/* minFilter */1], OperateBasicSourceTextureMainService$Wonderjs.setMagFilter(arrayBufferViewSourceTexture, match[/* magFilter */0], OperateBasicSourceTextureMainService$Wonderjs.setWrapT(arrayBufferViewSourceTexture, match[/* wrapT */3], OperateBasicSourceTextureMainService$Wonderjs.setWrapS(arrayBufferViewSourceTexture, match[/* wrapS */2], state))));
              }), state, samplerBasicSourceTextures);
}

function batchSetFormat(basicSourceTextureArr, basicSourceTextures, state) {
  return ArrayService$Wonderjs.reduceOneParamValidi((function (state, basicSourceTexture, index) {
                return OperateBasicSourceTextureMainService$Wonderjs.setFormat(basicSourceTexture, basicSourceTextures[index][/* format */1], state);
              }), state, basicSourceTextureArr);
}

export {
  _batchSetNewMap ,
  batchSetNewDiffueMaps ,
  batchSetBasicSourceTextureData ,
  batchSetFormat ,
  
}
/* ArrayService-Wonderjs Not a pure module */
