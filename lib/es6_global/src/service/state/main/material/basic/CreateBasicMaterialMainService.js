

import * as BufferService$Wonderjs from "../../../../primitive/buffer/BufferService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";

function create(state) {
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var match = IndexComponentService$Wonderjs.generateIndex(basicMaterialRecord[/* index */0], basicMaterialRecord[/* disposedIndexArray */8]);
  state[/* basicMaterialRecord */15] = /* record */[
    /* index */match[1],
    /* buffer */basicMaterialRecord[/* buffer */1],
    /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
    /* colors */basicMaterialRecord[/* colors */3],
    /* isDepthTests */basicMaterialRecord[/* isDepthTests */4],
    /* alphas */basicMaterialRecord[/* alphas */5],
    /* defaultColor */basicMaterialRecord[/* defaultColor */6],
    /* gameObjectsMap */basicMaterialRecord[/* gameObjectsMap */7],
    /* disposedIndexArray */match[2],
    /* nameMap */basicMaterialRecord[/* nameMap */9],
    /* materialArrayForWorkerInit */basicMaterialRecord[/* materialArrayForWorkerInit */10]
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
