

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "./source/basic_source/RecordBasicSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "./source/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function disposeNeedAddedSourceArray(texture, needAddedSourceArray) {
  return needAddedSourceArray.filter((function (param) {
                return param[0] !== texture;
              }));
}

function disposeNeedInitedSourceArray(texture, needInitedTextureIndexArray) {
  return needInitedTextureIndexArray.filter((function (needInitedTexture) {
                return needInitedTexture !== texture;
              }));
}

function clearNeedDisposedTextureIndexArray(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  newrecord[/* basicSourceTextureRecord */18] = /* record */[
    /* index */init[/* index */0],
    /* wrapSs */init[/* wrapSs */1],
    /* wrapTs */init[/* wrapTs */2],
    /* magFilters */init[/* magFilters */3],
    /* minFilters */init[/* minFilters */4],
    /* formats */init[/* formats */5],
    /* types */init[/* types */6],
    /* isNeedUpdates */init[/* isNeedUpdates */7],
    /* flipYs */init[/* flipYs */8],
    /* sourceMap */init[/* sourceMap */9],
    /* glTextureMap */init[/* glTextureMap */10],
    /* disposedIndexArray */init[/* disposedIndexArray */11],
    /* needAddedSourceArray */init[/* needAddedSourceArray */12],
    /* needInitedTextureIndexArray */init[/* needInitedTextureIndexArray */13],
    /* needDisposedTextureIndexArray : array */[],
    /* nameMap */init[/* nameMap */15],
    /* materialsMap */init[/* materialsMap */16]
  ];
  var init$1 = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  newrecord[/* arrayBufferViewSourceTextureRecord */19] = /* record */[
    /* index */init$1[/* index */0],
    /* wrapSs */init$1[/* wrapSs */1],
    /* wrapTs */init$1[/* wrapTs */2],
    /* magFilters */init$1[/* magFilters */3],
    /* minFilters */init$1[/* minFilters */4],
    /* formats */init$1[/* formats */5],
    /* types */init$1[/* types */6],
    /* isNeedUpdates */init$1[/* isNeedUpdates */7],
    /* flipYs */init$1[/* flipYs */8],
    /* widths */init$1[/* widths */9],
    /* heights */init$1[/* heights */10],
    /* sourceMap */init$1[/* sourceMap */11],
    /* glTextureMap */init$1[/* glTextureMap */12],
    /* disposedIndexArray */init$1[/* disposedIndexArray */13],
    /* needAddedSourceArray */init$1[/* needAddedSourceArray */14],
    /* needInitedTextureIndexArray */init$1[/* needInitedTextureIndexArray */15],
    /* needDisposedTextureIndexArray : array */[],
    /* nameMap */init$1[/* nameMap */17],
    /* materialsMap */init$1[/* materialsMap */18]
  ];
  return newrecord;
}

export {
  disposeNeedAddedSourceArray ,
  disposeNeedInitedSourceArray ,
  clearNeedDisposedTextureIndexArray ,
  
}
/* RecordBasicSourceTextureMainService-Wonderjs Not a pure module */
