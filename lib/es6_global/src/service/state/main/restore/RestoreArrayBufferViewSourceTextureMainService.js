

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../texture/IndexSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../texture/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function _restoreTypeArrays(currentTextureRecord, targetTextureRecord, arrayBufferViewSourceTextureIndexOffset) {
  var match = currentTextureRecord[/* wrapSs */1] === targetTextureRecord[/* wrapSs */1] && currentTextureRecord[/* wrapTs */2] === targetTextureRecord[/* wrapTs */2] && currentTextureRecord[/* magFilters */3] === targetTextureRecord[/* magFilters */3] && currentTextureRecord[/* minFilters */4] === targetTextureRecord[/* minFilters */4] && currentTextureRecord[/* formats */5] === targetTextureRecord[/* formats */5] && currentTextureRecord[/* types */6] === targetTextureRecord[/* types */6] && currentTextureRecord[/* isNeedUpdates */7] === targetTextureRecord[/* isNeedUpdates */7] && currentTextureRecord[/* flipYs */8] === targetTextureRecord[/* flipYs */8] && currentTextureRecord[/* widths */9] === targetTextureRecord[/* widths */9] && currentTextureRecord[/* heights */10] === targetTextureRecord[/* heights */10];
  if (match) {
    return /* tuple */[
            currentTextureRecord,
            targetTextureRecord
          ];
  } else {
    RecordArrayBufferViewSourceTextureMainService$Wonderjs.setAllTypeArrDataToDefault(currentTextureRecord[/* index */0], arrayBufferViewSourceTextureIndexOffset, /* tuple */[
          currentTextureRecord[/* wrapSs */1],
          currentTextureRecord[/* wrapTs */2],
          currentTextureRecord[/* magFilters */3],
          currentTextureRecord[/* minFilters */4],
          currentTextureRecord[/* formats */5],
          currentTextureRecord[/* types */6],
          currentTextureRecord[/* isNeedUpdates */7],
          currentTextureRecord[/* flipYs */8],
          currentTextureRecord[/* widths */9],
          currentTextureRecord[/* heights */10]
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
    TypeArrayService$Wonderjs.fillUint16ArrayWithUint16Array(/* tuple */[
          currentTextureRecord[/* widths */9],
          0
        ], /* tuple */[
          targetTextureRecord[/* widths */9],
          0
        ], targetTextureRecord[/* widths */9].length);
    TypeArrayService$Wonderjs.fillUint16ArrayWithUint16Array(/* tuple */[
          currentTextureRecord[/* heights */10],
          0
        ], /* tuple */[
          targetTextureRecord[/* heights */10],
          0
        ], targetTextureRecord[/* heights */10].length);
    return /* tuple */[
            currentTextureRecord,
            targetTextureRecord
          ];
  }
}

function restore(currentState, targetState) {
  var currentTextureRecord = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(currentState);
  var targetTextureRecord = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(targetState);
  var match = _restoreTypeArrays(currentTextureRecord, targetTextureRecord, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(currentState));
  var targetTextureRecord$1 = match[1];
  var currentTextureRecord$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* arrayBufferViewSourceTextureRecord */19] = /* record */[
    /* index */targetTextureRecord$1[/* index */0],
    /* wrapSs */currentTextureRecord$1[/* wrapSs */1],
    /* wrapTs */currentTextureRecord$1[/* wrapTs */2],
    /* magFilters */currentTextureRecord$1[/* magFilters */3],
    /* minFilters */currentTextureRecord$1[/* minFilters */4],
    /* formats */currentTextureRecord$1[/* formats */5],
    /* types */currentTextureRecord$1[/* types */6],
    /* isNeedUpdates */currentTextureRecord$1[/* isNeedUpdates */7],
    /* flipYs */currentTextureRecord$1[/* flipYs */8],
    /* widths */currentTextureRecord$1[/* widths */9],
    /* heights */currentTextureRecord$1[/* heights */10],
    /* sourceMap */targetTextureRecord$1[/* sourceMap */11],
    /* glTextureMap */targetTextureRecord$1[/* glTextureMap */12],
    /* bindTextureUnitCacheMap */targetTextureRecord$1[/* bindTextureUnitCacheMap */13],
    /* disposedIndexArray */targetTextureRecord$1[/* disposedIndexArray */14],
    /* needAddedSourceArray */targetTextureRecord$1[/* needAddedSourceArray */15],
    /* needInitedTextureIndexArray */targetTextureRecord$1[/* needInitedTextureIndexArray */16],
    /* needDisposedTextureIndexArray */targetTextureRecord$1[/* needDisposedTextureIndexArray */17],
    /* nameMap */targetTextureRecord$1[/* nameMap */18],
    /* materialsMap */targetTextureRecord$1[/* materialsMap */19]
  ];
  return newrecord;
}

export {
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
