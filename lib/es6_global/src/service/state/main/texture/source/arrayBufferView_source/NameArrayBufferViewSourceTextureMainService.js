

import * as Caml_array from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as NameService$Wonderjs from "../../../../../primitive/name/NameService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "./RecordArrayBufferViewSourceTextureMainService.js";

function getName(texture, state) {
  return NameService$Wonderjs.getName(texture, RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* nameMap */17]);
}

function unsafeGetName(texture, state) {
  return NameService$Wonderjs.unsafeGetName(texture, RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* nameMap */17]);
}

function setName(texture, name, state) {
  var record = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* arrayBufferViewSourceTextureRecord */19] = /* record */[
    /* index */record[/* index */0],
    /* wrapSs */record[/* wrapSs */1],
    /* wrapTs */record[/* wrapTs */2],
    /* magFilters */record[/* magFilters */3],
    /* minFilters */record[/* minFilters */4],
    /* formats */record[/* formats */5],
    /* types */record[/* types */6],
    /* isNeedUpdates */record[/* isNeedUpdates */7],
    /* flipYs */record[/* flipYs */8],
    /* widths */record[/* widths */9],
    /* heights */record[/* heights */10],
    /* sourceMap */record[/* sourceMap */11],
    /* glTextureMap */record[/* glTextureMap */12],
    /* disposedIndexArray */record[/* disposedIndexArray */13],
    /* needAddedSourceArray */record[/* needAddedSourceArray */14],
    /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */15],
    /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */16],
    /* nameMap */NameService$Wonderjs.setName(texture, name, record[/* nameMap */17]),
    /* materialsMap */record[/* materialsMap */18]
  ];
  return newrecord;
}

export {
  getName ,
  unsafeGetName ,
  setName ,
  
}
/* NameService-Wonderjs Not a pure module */
