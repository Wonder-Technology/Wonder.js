

import * as Caml_array from "./../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as NameService$Wonderjs from "../../../../../primitive/name/NameService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "./RecordBasicSourceTextureMainService.js";

function getName(texture, state) {
  return NameService$Wonderjs.getName(texture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state)[/* nameMap */15]);
}

function unsafeGetName(texture, state) {
  return NameService$Wonderjs.unsafeGetName(texture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state)[/* nameMap */15]);
}

function setName(texture, name, state) {
  var record = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicSourceTextureRecord */18] = /* record */[
    /* index */record[/* index */0],
    /* wrapSs */record[/* wrapSs */1],
    /* wrapTs */record[/* wrapTs */2],
    /* magFilters */record[/* magFilters */3],
    /* minFilters */record[/* minFilters */4],
    /* formats */record[/* formats */5],
    /* types */record[/* types */6],
    /* isNeedUpdates */record[/* isNeedUpdates */7],
    /* flipYs */record[/* flipYs */8],
    /* sourceMap */record[/* sourceMap */9],
    /* glTextureMap */record[/* glTextureMap */10],
    /* disposedIndexArray */record[/* disposedIndexArray */11],
    /* needAddedSourceArray */record[/* needAddedSourceArray */12],
    /* needInitedTextureIndexArray */record[/* needInitedTextureIndexArray */13],
    /* needDisposedTextureIndexArray */record[/* needDisposedTextureIndexArray */14],
    /* nameMap */NameService$Wonderjs.setName(texture, name, record[/* nameMap */15]),
    /* materialsMap */record[/* materialsMap */16]
  ];
  return newrecord;
}

export {
  getName ,
  unsafeGetName ,
  setName ,
  
}
/* NameService-Wonderjs Not a pure module */
