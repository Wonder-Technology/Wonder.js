

import * as BufferService$Wonderjs from "../../../../primitive/buffer/BufferService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as EmptyMapUnitArrayMapService$Wonderjs from "../../../../record/main/material/EmptyMapUnitArrayMapService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";

function _initDataWhenCreate(index, textureCountPerMaterial, lightMaterialRecord) {
  return /* record */[
          /* index */lightMaterialRecord[/* index */0],
          /* buffer */lightMaterialRecord[/* buffer */1],
          /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
          /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
          /* specularColors */lightMaterialRecord[/* specularColors */4],
          /* shininess */lightMaterialRecord[/* shininess */5],
          /* textureIndices */lightMaterialRecord[/* textureIndices */6],
          /* diffuseMapUnits */lightMaterialRecord[/* diffuseMapUnits */7],
          /* specularMapUnits */lightMaterialRecord[/* specularMapUnits */8],
          /* emptyMapUnitArrayMap */EmptyMapUnitArrayMapService$Wonderjs.initEmptyMapUnitArray(index, textureCountPerMaterial, lightMaterialRecord[/* emptyMapUnitArrayMap */9]),
          /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */10],
          /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */11],
          /* defaultShininess */lightMaterialRecord[/* defaultShininess */12],
          /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */13],
          /* disposedIndexArray */lightMaterialRecord[/* disposedIndexArray */14],
          /* nameMap */lightMaterialRecord[/* nameMap */15],
          /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */16]
        ];
}

function create(state) {
  var settingRecord = state[/* settingRecord */0];
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var match = IndexComponentService$Wonderjs.generateIndex(lightMaterialRecord[/* index */0], lightMaterialRecord[/* disposedIndexArray */14]);
  var index = match[0];
  var lightMaterialRecord$1 = _initDataWhenCreate(index, BufferSettingService$Wonderjs.getTextureCountPerMaterial(settingRecord), lightMaterialRecord);
  state[/* lightMaterialRecord */16] = /* record */[
    /* index */match[1],
    /* buffer */lightMaterialRecord$1[/* buffer */1],
    /* shaderIndices */lightMaterialRecord$1[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord$1[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord$1[/* specularColors */4],
    /* shininess */lightMaterialRecord$1[/* shininess */5],
    /* textureIndices */lightMaterialRecord$1[/* textureIndices */6],
    /* diffuseMapUnits */lightMaterialRecord$1[/* diffuseMapUnits */7],
    /* specularMapUnits */lightMaterialRecord$1[/* specularMapUnits */8],
    /* emptyMapUnitArrayMap */lightMaterialRecord$1[/* emptyMapUnitArrayMap */9],
    /* defaultDiffuseColor */lightMaterialRecord$1[/* defaultDiffuseColor */10],
    /* defaultSpecularColor */lightMaterialRecord$1[/* defaultSpecularColor */11],
    /* defaultShininess */lightMaterialRecord$1[/* defaultShininess */12],
    /* gameObjectsMap */lightMaterialRecord$1[/* gameObjectsMap */13],
    /* disposedIndexArray */match[2],
    /* nameMap */lightMaterialRecord$1[/* nameMap */15],
    /* materialArrayForWorkerInit */lightMaterialRecord$1[/* materialArrayForWorkerInit */16]
  ];
  return BufferService$Wonderjs.checkNotExceedMaxCount(BufferSettingService$Wonderjs.getBasicMaterialCount(settingRecord), /* tuple */[
              state,
              index
            ]);
}

export {
  _initDataWhenCreate ,
  create ,
  
}
/* BufferService-Wonderjs Not a pure module */
