

import * as BufferService$Wonderjs from "../../../../primitive/buffer/BufferService.js";
import * as IndexComponentService$Wonderjs from "../../../../primitive/component/IndexComponentService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../IndexSourceTextureMainService.js";
import * as BufferArrayBufferViewSourceTextureMainService$Wonderjs from "./BufferArrayBufferViewSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "./RecordArrayBufferViewSourceTextureMainService.js";

function create(state) {
  var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  var match = IndexComponentService$Wonderjs.generateIndex(arrayBufferViewSourceTextureRecord[/* index */0], arrayBufferViewSourceTextureRecord[/* disposedIndexArray */14]);
  var index = IndexSourceTextureMainService$Wonderjs.generateArrayBufferViewSourceTextureIndex(match[0], state);
  state[/* arrayBufferViewSourceTextureRecord */19] = /* record */[
    /* index */match[1],
    /* wrapSs */arrayBufferViewSourceTextureRecord[/* wrapSs */1],
    /* wrapTs */arrayBufferViewSourceTextureRecord[/* wrapTs */2],
    /* magFilters */arrayBufferViewSourceTextureRecord[/* magFilters */3],
    /* minFilters */arrayBufferViewSourceTextureRecord[/* minFilters */4],
    /* formats */arrayBufferViewSourceTextureRecord[/* formats */5],
    /* types */arrayBufferViewSourceTextureRecord[/* types */6],
    /* isNeedUpdates */arrayBufferViewSourceTextureRecord[/* isNeedUpdates */7],
    /* flipYs */arrayBufferViewSourceTextureRecord[/* flipYs */8],
    /* widths */arrayBufferViewSourceTextureRecord[/* widths */9],
    /* heights */arrayBufferViewSourceTextureRecord[/* heights */10],
    /* sourceMap */arrayBufferViewSourceTextureRecord[/* sourceMap */11],
    /* glTextureMap */arrayBufferViewSourceTextureRecord[/* glTextureMap */12],
    /* bindTextureUnitCacheMap */arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */13],
    /* disposedIndexArray */arrayBufferViewSourceTextureRecord[/* disposedIndexArray */14],
    /* needAddedSourceArray */arrayBufferViewSourceTextureRecord[/* needAddedSourceArray */15],
    /* needInitedTextureIndexArray */arrayBufferViewSourceTextureRecord[/* needInitedTextureIndexArray */16],
    /* needDisposedTextureIndexArray */arrayBufferViewSourceTextureRecord[/* needDisposedTextureIndexArray */17],
    /* nameMap */arrayBufferViewSourceTextureRecord[/* nameMap */18],
    /* materialsMap */arrayBufferViewSourceTextureRecord[/* materialsMap */19]
  ];
  return BufferService$Wonderjs.checkNotExceedMaxCount(BufferArrayBufferViewSourceTextureMainService$Wonderjs.getMaxArrayBufferViewSourceTextureIndex(state), /* tuple */[
              state,
              index
            ]);
}

export {
  create ,
  
}
/* BufferService-Wonderjs Not a pure module */
