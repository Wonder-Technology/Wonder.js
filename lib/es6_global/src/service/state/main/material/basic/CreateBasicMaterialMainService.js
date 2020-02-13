

import * as BufferService$Wonderjs from "../../../../primitive/buffer/BufferService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as EmptyMapUnitArrayMapService$Wonderjs from "../../../../record/main/material/EmptyMapUnitArrayMapService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";

function _initDataWhenCreate(index, textureCountPerMaterial, basicMaterialRecord) {
  return /* record */[
          /* index */basicMaterialRecord[/* index */0],
          /* buffer */basicMaterialRecord[/* buffer */1],
          /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
          /* colors */basicMaterialRecord[/* colors */3],
          /* textureIndices */basicMaterialRecord[/* textureIndices */4],
          /* mapUnits */basicMaterialRecord[/* mapUnits */5],
          /* isDepthTests */basicMaterialRecord[/* isDepthTests */6],
          /* alphas */basicMaterialRecord[/* alphas */7],
          /* emptyMapUnitArrayMap */EmptyMapUnitArrayMapService$Wonderjs.initEmptyMapUnitArray(index, textureCountPerMaterial, basicMaterialRecord[/* emptyMapUnitArrayMap */8]),
          /* defaultColor */basicMaterialRecord[/* defaultColor */9],
          /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */10],
          /* disposedIndexArray */basicMaterialRecord[/* disposedIndexArray */11],
          /* nameMap */basicMaterialRecord[/* nameMap */12],
          /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */13]
        ];
}

function create(state) {
  var settingRecord = state[/* settingRecord */0];
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var match = IndexComponentService$Wonderjs.generateIndex(basicMaterialRecord[/* index */0], basicMaterialRecord[/* disposedIndexArray */11]);
  var index = match[0];
  var basicMaterialRecord$1 = _initDataWhenCreate(index, BufferSettingService$Wonderjs.getTextureCountPerMaterial(settingRecord), basicMaterialRecord);
  state[/* basicMaterialRecord */15] = /* record */[
    /* index */match[1],
    /* buffer */basicMaterialRecord$1[/* buffer */1],
    /* shaderIndices */basicMaterialRecord$1[/* shaderIndices */2],
    /* colors */basicMaterialRecord$1[/* colors */3],
    /* textureIndices */basicMaterialRecord$1[/* textureIndices */4],
    /* mapUnits */basicMaterialRecord$1[/* mapUnits */5],
    /* isDepthTests */basicMaterialRecord$1[/* isDepthTests */6],
    /* alphas */basicMaterialRecord$1[/* alphas */7],
    /* emptyMapUnitArrayMap */basicMaterialRecord$1[/* emptyMapUnitArrayMap */8],
    /* defaultColor */basicMaterialRecord$1[/* defaultColor */9],
    /* gameObjectsMap */basicMaterialRecord$1[/* gameObjectsMap */10],
    /* disposedIndexArray */match[2],
    /* nameMap */basicMaterialRecord$1[/* nameMap */12],
    /* materialArrayForWorkerInit */basicMaterialRecord$1[/* materialArrayForWorkerInit */13]
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
