

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../texture/source/basic_source/RecordBasicSourceTextureMainService.js";

function _restoreTypeArrays(currentTextureRecord, targetTextureRecord) {
  var match = currentTextureRecord[/* wrapSs */1] === targetTextureRecord[/* wrapSs */1] && currentTextureRecord[/* wrapTs */2] === targetTextureRecord[/* wrapTs */2] && currentTextureRecord[/* magFilters */3] === targetTextureRecord[/* magFilters */3] && currentTextureRecord[/* minFilters */4] === targetTextureRecord[/* minFilters */4] && currentTextureRecord[/* formats */5] === targetTextureRecord[/* formats */5] && currentTextureRecord[/* types */6] === targetTextureRecord[/* types */6] && currentTextureRecord[/* isNeedUpdates */7] === targetTextureRecord[/* isNeedUpdates */7] && currentTextureRecord[/* flipYs */8] === targetTextureRecord[/* flipYs */8];
  if (match) {
    return /* tuple */[
            currentTextureRecord,
            targetTextureRecord
          ];
  } else {
    RecordBasicSourceTextureMainService$Wonderjs.setAllTypeArrDataToDefault(currentTextureRecord[/* index */0], /* tuple */[
          currentTextureRecord[/* wrapSs */1],
          currentTextureRecord[/* wrapTs */2],
          currentTextureRecord[/* magFilters */3],
          currentTextureRecord[/* minFilters */4],
          currentTextureRecord[/* formats */5],
          currentTextureRecord[/* types */6],
          currentTextureRecord[/* isNeedUpdates */7],
          currentTextureRecord[/* flipYs */8]
        ]);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* wrapSs */1],
          0
        ], /* tuple */[
          targetTextureRecord[/* wrapSs */1],
          0
        ], targetTextureRecord[/* wrapSs */1].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* wrapTs */2],
          0
        ], /* tuple */[
          targetTextureRecord[/* wrapTs */2],
          0
        ], targetTextureRecord[/* wrapTs */2].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* magFilters */3],
          0
        ], /* tuple */[
          targetTextureRecord[/* magFilters */3],
          0
        ], targetTextureRecord[/* magFilters */3].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* minFilters */4],
          0
        ], /* tuple */[
          targetTextureRecord[/* minFilters */4],
          0
        ], targetTextureRecord[/* minFilters */4].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* formats */5],
          0
        ], /* tuple */[
          targetTextureRecord[/* formats */5],
          0
        ], targetTextureRecord[/* formats */5].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* types */6],
          0
        ], /* tuple */[
          targetTextureRecord[/* types */6],
          0
        ], targetTextureRecord[/* types */6].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* isNeedUpdates */7],
          0
        ], /* tuple */[
          targetTextureRecord[/* isNeedUpdates */7],
          0
        ], targetTextureRecord[/* isNeedUpdates */7].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* flipYs */8],
          0
        ], /* tuple */[
          targetTextureRecord[/* flipYs */8],
          0
        ], targetTextureRecord[/* flipYs */8].length);
    return /* tuple */[
            currentTextureRecord,
            targetTextureRecord
          ];
  }
}

function restore(currentState, targetState) {
  var currentTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(currentState);
  var targetTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(targetState);
  var match = _restoreTypeArrays(currentTextureRecord, targetTextureRecord);
  var targetTextureRecord$1 = match[1];
  var currentTextureRecord$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* basicSourceTextureRecord */18] = /* record */[
    /* index */targetTextureRecord$1[/* index */0],
    /* wrapSs */currentTextureRecord$1[/* wrapSs */1],
    /* wrapTs */currentTextureRecord$1[/* wrapTs */2],
    /* magFilters */currentTextureRecord$1[/* magFilters */3],
    /* minFilters */currentTextureRecord$1[/* minFilters */4],
    /* formats */currentTextureRecord$1[/* formats */5],
    /* types */currentTextureRecord$1[/* types */6],
    /* isNeedUpdates */currentTextureRecord$1[/* isNeedUpdates */7],
    /* flipYs */currentTextureRecord$1[/* flipYs */8],
    /* sourceMap */targetTextureRecord$1[/* sourceMap */9],
    /* glTextureMap */targetTextureRecord$1[/* glTextureMap */10],
    /* disposedIndexArray */targetTextureRecord$1[/* disposedIndexArray */11],
    /* needAddedSourceArray */targetTextureRecord$1[/* needAddedSourceArray */12],
    /* needInitedTextureIndexArray */targetTextureRecord$1[/* needInitedTextureIndexArray */13],
    /* needDisposedTextureIndexArray */targetTextureRecord$1[/* needDisposedTextureIndexArray */14],
    /* nameMap */targetTextureRecord$1[/* nameMap */15],
    /* materialsMap */targetTextureRecord$1[/* materialsMap */16]
  ];
  return newrecord;
}

export {
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
