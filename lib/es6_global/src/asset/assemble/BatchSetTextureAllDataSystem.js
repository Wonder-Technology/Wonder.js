

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../service/record/main/setting/BufferSettingService.js";
import * as GroupTextureMainService$Wonderjs from "../../service/state/main/texture/GroupTextureMainService.js";
import * as EmptyMapUnitArrayMapService$Wonderjs from "../../service/record/main/material/EmptyMapUnitArrayMapService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";
import * as OperateTypeArrayLightMaterialService$Wonderjs from "../../service/record/all/material/light/OperateTypeArrayLightMaterialService.js";

function _batchAddMaterialToTextureGroup(materialArr, textureArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, material, index) {
                var texture = textureArr[index];
                return GroupTextureMainService$Wonderjs.addMaterial(/* tuple */[
                            material,
                            /* LightMaterial */1
                          ], texture, state);
              }), state, materialArr);
}

function _batchSetMaterialMap(param, param$1, textureCountPerMaterial, state) {
  var setTextureIndexFunc = param$1[1];
  var setMapUnitFunc = param$1[0];
  var textureArr = param[1];
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
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
              lightMaterialRecord[/* textureIndices */6],
              lightMaterialRecord[/* diffuseMapUnits */7],
              lightMaterialRecord[/* emptyMapUnitArrayMap */9]
            ], param[0]);
}

function _batchSetNewMap(param, param$1, textureCountPerMaterial, state) {
  var textureArr = param[1];
  var materialArr = param[0];
  var state$1 = _batchAddMaterialToTextureGroup(materialArr, textureArr, state);
  var match = _batchSetMaterialMap(/* tuple */[
        materialArr,
        textureArr
      ], /* tuple */[
        param$1[0],
        param$1[1]
      ], textureCountPerMaterial, state$1);
  var newrecord = Caml_array.caml_array_dup(state$1);
  var init = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */init[/* index */0],
    /* buffer */init[/* buffer */1],
    /* shaderIndices */init[/* shaderIndices */2],
    /* diffuseColors */init[/* diffuseColors */3],
    /* specularColors */init[/* specularColors */4],
    /* shininess */init[/* shininess */5],
    /* textureIndices */match[0],
    /* diffuseMapUnits */match[1],
    /* specularMapUnits */init[/* specularMapUnits */8],
    /* emptyMapUnitArrayMap */match[2],
    /* defaultDiffuseColor */init[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */init[/* defaultSpecularColor */11],
    /* defaultShininess */init[/* defaultShininess */12],
    /* gameObjectsMap */init[/* gameObjectsMap */13],
    /* disposedIndexArray */init[/* disposedIndexArray */14],
    /* nameMap */init[/* nameMap */15],
    /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */16]
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
  _batchAddMaterialToTextureGroup ,
  _batchSetMaterialMap ,
  _batchSetNewMap ,
  batchSetNewDiffueMaps ,
  batchSetBasicSourceTextureData ,
  batchSetFormatAndFlipY ,
  
}
/* ArrayService-Wonderjs Not a pure module */
