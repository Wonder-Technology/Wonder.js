

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "./basic_source/RecordBasicSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "./arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function setFlipY(gl, flipY, browserRecord) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
  return /* () */0;
}

function clearNeedAddedSourceArr(state) {
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
    /* needAddedSourceArray : array */[],
    /* needInitedTextureIndexArray */init[/* needInitedTextureIndexArray */13],
    /* needDisposedTextureIndexArray */init[/* needDisposedTextureIndexArray */14],
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
    /* needAddedSourceArray : array */[],
    /* needInitedTextureIndexArray */init$1[/* needInitedTextureIndexArray */15],
    /* needDisposedTextureIndexArray */init$1[/* needDisposedTextureIndexArray */16],
    /* nameMap */init$1[/* nameMap */17],
    /* materialsMap */init$1[/* materialsMap */18]
  ];
  return newrecord;
}

export {
  setFlipY ,
  clearNeedAddedSourceArr ,
  
}
/* RecordBasicSourceTextureMainService-Wonderjs Not a pure module */
