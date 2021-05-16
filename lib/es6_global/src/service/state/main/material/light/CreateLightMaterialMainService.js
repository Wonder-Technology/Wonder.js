

import * as BufferService$Wonderjs from "../../../../primitive/buffer/BufferService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";

function create(state) {
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var match = IndexComponentService$Wonderjs.generateIndex(lightMaterialRecord[/* index */0], lightMaterialRecord[/* disposedIndexArray */12]);
  state[/* lightMaterialRecord */16] = /* record */[
    /* index */match[1],
    /* buffer */lightMaterialRecord[/* buffer */1],
    /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
    /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
    /* specularColors */lightMaterialRecord[/* specularColors */4],
    /* shininess */lightMaterialRecord[/* shininess */5],
    /* diffuseTextureIndices */lightMaterialRecord[/* diffuseTextureIndices */6],
    /* specularTextureIndices */lightMaterialRecord[/* specularTextureIndices */7],
    /* defaultDiffuseColor */lightMaterialRecord[/* defaultDiffuseColor */8],
    /* defaultSpecularColor */lightMaterialRecord[/* defaultSpecularColor */9],
    /* defaultShininess */lightMaterialRecord[/* defaultShininess */10],
    /* gameObjectsMap */lightMaterialRecord[/* gameObjectsMap */11],
    /* disposedIndexArray */match[2],
    /* nameMap */lightMaterialRecord[/* nameMap */13],
    /* materialArrayForWorkerInit */lightMaterialRecord[/* materialArrayForWorkerInit */14]
  ];
  return BufferService$Wonderjs.checkNotExceedMaxCount(BufferSettingService$Wonderjs.getBasicMaterialCount(state[/* settingRecord */0]), /* tuple */[
              state,
              match[0]
            ]);
}

export {
  create ,
  
}
/* BufferService-Wonderjs Not a pure module */
