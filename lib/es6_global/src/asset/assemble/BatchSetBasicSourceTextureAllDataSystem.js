

import * as Caml_array from "./../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GroupTextureMainService$Wonderjs from "../../service/state/main/texture/GroupTextureMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/RecordLightMaterialMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../service/state/main/texture/source/basic_source/OperateBasicSourceTextureMainService.js";
import * as OperateTypeArrayAllLightMaterialService$Wonderjs from "../../service/record/all/material/light/OperateTypeArrayAllLightMaterialService.js";

function _batchAddMaterialToTextureGroup(materialArr, textureArr, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, material, index) {
                var texture = textureArr[index];
                return GroupTextureMainService$Wonderjs.addMaterial(/* tuple */[
                            material,
                            /* LightMaterial */1
                          ], texture, state);
              }), state, materialArr);
}

function _batchSetMaterialMap(param, setTextureIndexFunc, state) {
  var textureArr = param[1];
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return ArrayService$WonderCommonlib.reduceOneParami((function (diffuseTextureIndices, material, index) {
                var texture = textureArr[index];
                return setTextureIndexFunc(material, texture, diffuseTextureIndices);
              }), lightMaterialRecord[/* diffuseTextureIndices */6], param[0]);
}

function _batchSetNewMap(param, setTextureIndexFunc, state) {
  var textureArr = param[1];
  var materialArr = param[0];
  var state$1 = _batchAddMaterialToTextureGroup(materialArr, textureArr, state);
  var diffuseTextureIndices = _batchSetMaterialMap(/* tuple */[
        materialArr,
        textureArr
      ], setTextureIndexFunc, state$1);
  var newrecord = Caml_array.caml_array_dup(state$1);
  var init = RecordLightMaterialMainService$Wonderjs.getRecord(state$1);
  newrecord[/* lightMaterialRecord */16] = /* record */[
    /* index */init[/* index */0],
    /* buffer */init[/* buffer */1],
    /* shaderIndices */init[/* shaderIndices */2],
    /* diffuseColors */init[/* diffuseColors */3],
    /* specularColors */init[/* specularColors */4],
    /* shininess */init[/* shininess */5],
    /* diffuseTextureIndices */diffuseTextureIndices,
    /* specularTextureIndices */init[/* specularTextureIndices */7],
    /* defaultDiffuseColor */init[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */init[/* defaultSpecularColor */9],
    /* defaultShininess */init[/* defaultShininess */10],
    /* gameObjectsMap */init[/* gameObjectsMap */11],
    /* disposedIndexArray */init[/* disposedIndexArray */12],
    /* nameMap */init[/* nameMap */13],
    /* materialArrayForWorkerInit */init[/* materialArrayForWorkerInit */14]
  ];
  return newrecord;
}

function batchSetNewDiffueMaps(diffuseMapLightMaterials, lightMaterialDiffuseMaps, state) {
  return _batchSetNewMap(/* tuple */[
              diffuseMapLightMaterials,
              lightMaterialDiffuseMaps,
              0
            ], OperateTypeArrayAllLightMaterialService$Wonderjs.setTextureIndex, state);
}

function batchSetBasicSourceTextureData(samplerBasicSourceTextures, basicSourceTextureSamplers, state) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (state, basicSourceTexture, index) {
                var match = basicSourceTextureSamplers[index];
                return OperateBasicSourceTextureMainService$Wonderjs.setMinFilter(basicSourceTexture, match[/* minFilter */1], OperateBasicSourceTextureMainService$Wonderjs.setMagFilter(basicSourceTexture, match[/* magFilter */0], OperateBasicSourceTextureMainService$Wonderjs.setWrapT(basicSourceTexture, match[/* wrapT */3], OperateBasicSourceTextureMainService$Wonderjs.setWrapS(basicSourceTexture, match[/* wrapS */2], state))));
              }), state, samplerBasicSourceTextures);
}

function batchSetFormatAndTypeAndFlipY(basicSourceTextureArr, basicSourceTextures, state) {
  return ArrayService$Wonderjs.reduceOneParamValidi((function (state, basicSourceTexture, index) {
                var match = basicSourceTextures[index];
                return OperateBasicSourceTextureMainService$Wonderjs.setFlipY(basicSourceTexture, match[/* flipY */3], OperateBasicSourceTextureMainService$Wonderjs.setType(basicSourceTexture, match[/* type_ */2], OperateBasicSourceTextureMainService$Wonderjs.setFormat(basicSourceTexture, match[/* format */1], state)));
              }), state, basicSourceTextureArr);
}

export {
  _batchAddMaterialToTextureGroup ,
  _batchSetMaterialMap ,
  _batchSetNewMap ,
  batchSetNewDiffueMaps ,
  batchSetBasicSourceTextureData ,
  batchSetFormatAndTypeAndFlipY ,
  
}
/* ArrayService-Wonderjs Not a pure module */
