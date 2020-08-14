

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TypeArrayService$Wonderjs from "../../../primitive/buffer/TypeArrayService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "../texture/cubemap/RecordCubemapTextureMainService.js";

function _restoreTypeArrays(currentTextureRecord, targetTextureRecord) {
  var match = currentTextureRecord[/* wrapSs */2] === targetTextureRecord[/* wrapSs */2] && currentTextureRecord[/* wrapTs */3] === targetTextureRecord[/* wrapTs */3] && currentTextureRecord[/* magFilters */4] === targetTextureRecord[/* magFilters */4] && currentTextureRecord[/* minFilters */5] === targetTextureRecord[/* minFilters */5] && currentTextureRecord[/* pxFormats */6] === targetTextureRecord[/* pxFormats */6] && currentTextureRecord[/* nxFormats */7] === targetTextureRecord[/* nxFormats */7] && currentTextureRecord[/* pyFormats */8] === targetTextureRecord[/* pyFormats */8] && currentTextureRecord[/* nyFormats */9] === targetTextureRecord[/* nyFormats */9] && currentTextureRecord[/* pzFormats */10] === targetTextureRecord[/* pzFormats */10] && currentTextureRecord[/* nzFormats */11] === targetTextureRecord[/* nzFormats */11] && currentTextureRecord[/* pxTypes */12] === targetTextureRecord[/* pxTypes */12] && currentTextureRecord[/* nxTypes */13] === targetTextureRecord[/* nxTypes */13] && currentTextureRecord[/* pyTypes */14] === targetTextureRecord[/* pyTypes */14] && currentTextureRecord[/* nyTypes */15] === targetTextureRecord[/* nyTypes */15] && currentTextureRecord[/* pzTypes */16] === targetTextureRecord[/* pzTypes */16] && currentTextureRecord[/* nzTypes */17] === targetTextureRecord[/* nzTypes */17] && currentTextureRecord[/* isNeedUpdates */18] === targetTextureRecord[/* isNeedUpdates */18] && currentTextureRecord[/* flipYs */19] === targetTextureRecord[/* flipYs */19];
  if (match) {
    return /* tuple */[
            currentTextureRecord,
            targetTextureRecord
          ];
  } else {
    RecordCubemapTextureMainService$Wonderjs.setAllTypeArrDataToDefault(currentTextureRecord[/* index */0], /* tuple */[
          currentTextureRecord[/* wrapSs */2],
          currentTextureRecord[/* wrapTs */3],
          currentTextureRecord[/* magFilters */4],
          currentTextureRecord[/* minFilters */5],
          currentTextureRecord[/* pxFormats */6],
          currentTextureRecord[/* nxFormats */7],
          currentTextureRecord[/* pyFormats */8],
          currentTextureRecord[/* nyFormats */9],
          currentTextureRecord[/* pzFormats */10],
          currentTextureRecord[/* nzFormats */11],
          currentTextureRecord[/* pxTypes */12],
          currentTextureRecord[/* nxTypes */13],
          currentTextureRecord[/* pyTypes */14],
          currentTextureRecord[/* nyTypes */15],
          currentTextureRecord[/* pzTypes */16],
          currentTextureRecord[/* nzTypes */17],
          currentTextureRecord[/* isNeedUpdates */18],
          currentTextureRecord[/* flipYs */19]
        ]);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* wrapSs */2],
          0
        ], /* tuple */[
          targetTextureRecord[/* wrapSs */2],
          0
        ], targetTextureRecord[/* wrapSs */2].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* wrapTs */3],
          0
        ], /* tuple */[
          targetTextureRecord[/* wrapTs */3],
          0
        ], targetTextureRecord[/* wrapTs */3].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* magFilters */4],
          0
        ], /* tuple */[
          targetTextureRecord[/* magFilters */4],
          0
        ], targetTextureRecord[/* magFilters */4].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* minFilters */5],
          0
        ], /* tuple */[
          targetTextureRecord[/* minFilters */5],
          0
        ], targetTextureRecord[/* minFilters */5].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* pxFormats */6],
          0
        ], /* tuple */[
          targetTextureRecord[/* pxFormats */6],
          0
        ], targetTextureRecord[/* pxFormats */6].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* nxFormats */7],
          0
        ], /* tuple */[
          targetTextureRecord[/* nxFormats */7],
          0
        ], targetTextureRecord[/* nxFormats */7].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* pyFormats */8],
          0
        ], /* tuple */[
          targetTextureRecord[/* pyFormats */8],
          0
        ], targetTextureRecord[/* pyFormats */8].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* nyFormats */9],
          0
        ], /* tuple */[
          targetTextureRecord[/* nyFormats */9],
          0
        ], targetTextureRecord[/* nyFormats */9].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* pzFormats */10],
          0
        ], /* tuple */[
          targetTextureRecord[/* pzFormats */10],
          0
        ], targetTextureRecord[/* pzFormats */10].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* nzFormats */11],
          0
        ], /* tuple */[
          targetTextureRecord[/* nzFormats */11],
          0
        ], targetTextureRecord[/* nzFormats */11].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* pxTypes */12],
          0
        ], /* tuple */[
          targetTextureRecord[/* pxTypes */12],
          0
        ], targetTextureRecord[/* pxTypes */12].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* nxTypes */13],
          0
        ], /* tuple */[
          targetTextureRecord[/* nxTypes */13],
          0
        ], targetTextureRecord[/* nxTypes */13].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* pyTypes */14],
          0
        ], /* tuple */[
          targetTextureRecord[/* pyTypes */14],
          0
        ], targetTextureRecord[/* pyTypes */14].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* nyTypes */15],
          0
        ], /* tuple */[
          targetTextureRecord[/* nyTypes */15],
          0
        ], targetTextureRecord[/* nyTypes */15].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* pzTypes */16],
          0
        ], /* tuple */[
          targetTextureRecord[/* pzTypes */16],
          0
        ], targetTextureRecord[/* pzTypes */16].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* nzTypes */17],
          0
        ], /* tuple */[
          targetTextureRecord[/* nzTypes */17],
          0
        ], targetTextureRecord[/* nzTypes */17].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* isNeedUpdates */18],
          0
        ], /* tuple */[
          targetTextureRecord[/* isNeedUpdates */18],
          0
        ], targetTextureRecord[/* isNeedUpdates */18].length);
    TypeArrayService$Wonderjs.fillUint8ArrayWithUint8Array(/* tuple */[
          currentTextureRecord[/* flipYs */19],
          0
        ], /* tuple */[
          targetTextureRecord[/* flipYs */19],
          0
        ], targetTextureRecord[/* flipYs */19].length);
    return /* tuple */[
            currentTextureRecord,
            targetTextureRecord
          ];
  }
}

function restore(currentState, targetState) {
  var currentTextureRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(currentState);
  var targetTextureRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(targetState);
  var match = _restoreTypeArrays(currentTextureRecord, targetTextureRecord);
  var targetTextureRecord$1 = match[1];
  var currentTextureRecord$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* cubemapTextureRecord */20] = /* record */[
    /* index */targetTextureRecord$1[/* index */0],
    /* buffer */targetTextureRecord$1[/* buffer */1],
    /* wrapSs */currentTextureRecord$1[/* wrapSs */2],
    /* wrapTs */currentTextureRecord$1[/* wrapTs */3],
    /* magFilters */currentTextureRecord$1[/* magFilters */4],
    /* minFilters */currentTextureRecord$1[/* minFilters */5],
    /* pxFormats */currentTextureRecord$1[/* pxFormats */6],
    /* nxFormats */currentTextureRecord$1[/* nxFormats */7],
    /* pyFormats */currentTextureRecord$1[/* pyFormats */8],
    /* nyFormats */currentTextureRecord$1[/* nyFormats */9],
    /* pzFormats */currentTextureRecord$1[/* pzFormats */10],
    /* nzFormats */currentTextureRecord$1[/* nzFormats */11],
    /* pxTypes */currentTextureRecord$1[/* pxTypes */12],
    /* nxTypes */currentTextureRecord$1[/* nxTypes */13],
    /* pyTypes */currentTextureRecord$1[/* pyTypes */14],
    /* nyTypes */currentTextureRecord$1[/* nyTypes */15],
    /* pzTypes */currentTextureRecord$1[/* pzTypes */16],
    /* nzTypes */currentTextureRecord$1[/* nzTypes */17],
    /* isNeedUpdates */currentTextureRecord$1[/* isNeedUpdates */18],
    /* flipYs */currentTextureRecord$1[/* flipYs */19],
    /* pxSourceMap */targetTextureRecord$1[/* pxSourceMap */20],
    /* nxSourceMap */targetTextureRecord$1[/* nxSourceMap */21],
    /* pySourceMap */targetTextureRecord$1[/* pySourceMap */22],
    /* nySourceMap */targetTextureRecord$1[/* nySourceMap */23],
    /* pzSourceMap */targetTextureRecord$1[/* pzSourceMap */24],
    /* nzSourceMap */targetTextureRecord$1[/* nzSourceMap */25],
    /* glTextureMap */targetTextureRecord$1[/* glTextureMap */26],
    /* disposedIndexArray */targetTextureRecord$1[/* disposedIndexArray */27],
    /* needAddedPXSourceArray */targetTextureRecord$1[/* needAddedPXSourceArray */28],
    /* needAddedNXSourceArray */targetTextureRecord$1[/* needAddedNXSourceArray */29],
    /* needAddedPYSourceArray */targetTextureRecord$1[/* needAddedPYSourceArray */30],
    /* needAddedNYSourceArray */targetTextureRecord$1[/* needAddedNYSourceArray */31],
    /* needAddedPZSourceArray */targetTextureRecord$1[/* needAddedPZSourceArray */32],
    /* needAddedNZSourceArray */targetTextureRecord$1[/* needAddedNZSourceArray */33],
    /* needInitedTextureIndexArray */targetTextureRecord$1[/* needInitedTextureIndexArray */34],
    /* needDisposedTextureIndexArray */targetTextureRecord$1[/* needDisposedTextureIndexArray */35],
    /* nameMap */targetTextureRecord$1[/* nameMap */36],
    /* materialsMap */targetTextureRecord$1[/* materialsMap */37]
  ];
  return newrecord;
}

export {
  _restoreTypeArrays ,
  restore ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
