

import * as BufferService$Wonderjs from "../../../../primitive/buffer/BufferService.js";
import * as BufferSettingService$Wonderjs from "../../../../record/main/setting/BufferSettingService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../IndexSourceTextureMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "./RecordBasicSourceTextureMainService.js";

function create(state) {
  var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var match = IndexComponentService$Wonderjs.generateIndex(basicSourceTextureRecord[/* index */0], basicSourceTextureRecord[/* disposedIndexArray */12]);
  var index = IndexSourceTextureMainService$Wonderjs.generateBasicSourceTextureIndex(match[0]);
  state[/* basicSourceTextureRecord */18] = /* record */[
    /* index */match[1],
    /* wrapSs */basicSourceTextureRecord[/* wrapSs */1],
    /* wrapTs */basicSourceTextureRecord[/* wrapTs */2],
    /* magFilters */basicSourceTextureRecord[/* magFilters */3],
    /* minFilters */basicSourceTextureRecord[/* minFilters */4],
    /* formats */basicSourceTextureRecord[/* formats */5],
    /* types */basicSourceTextureRecord[/* types */6],
    /* isNeedUpdates */basicSourceTextureRecord[/* isNeedUpdates */7],
    /* flipYs */basicSourceTextureRecord[/* flipYs */8],
    /* sourceMap */basicSourceTextureRecord[/* sourceMap */9],
    /* glTextureMap */basicSourceTextureRecord[/* glTextureMap */10],
    /* bindTextureUnitCacheMap */basicSourceTextureRecord[/* bindTextureUnitCacheMap */11],
    /* disposedIndexArray */basicSourceTextureRecord[/* disposedIndexArray */12],
    /* needAddedSourceArray */basicSourceTextureRecord[/* needAddedSourceArray */13],
    /* needInitedTextureIndexArray */basicSourceTextureRecord[/* needInitedTextureIndexArray */14],
    /* needDisposedTextureIndexArray */basicSourceTextureRecord[/* needDisposedTextureIndexArray */15],
    /* nameMap */basicSourceTextureRecord[/* nameMap */16],
    /* materialsMap */basicSourceTextureRecord[/* materialsMap */17]
  ];
  return BufferService$Wonderjs.checkNotExceedMaxCount(BufferSettingService$Wonderjs.getBasicSourceTextureCount(state[/* settingRecord */0]), /* tuple */[
              state,
              index
            ]);
}

export {
  create ,
  
}
/* BufferService-Wonderjs Not a pure module */
