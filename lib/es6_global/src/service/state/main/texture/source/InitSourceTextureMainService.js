

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as InitTextureService$Wonderjs from "../../../../primitive/texture/InitTextureService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../record/all/device/AllDeviceManagerService.js";
import * as WorkerDetectMainService$Wonderjs from "../../workerDetect/WorkerDetectMainService.js";
import * as IndexAllSourceTextureService$Wonderjs from "../../../../record/all/texture/source/IndexAllSourceTextureService.js";
import * as IndexSourceTextureMainService$Wonderjs from "./IndexSourceTextureMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "./basic_source/RecordBasicSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "./arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function _handleInitTextureWorker(texture, state) {
  if (texture !== undefined) {
    return IndexAllSourceTextureService$Wonderjs.handleByJudgeSourceTextureIndex(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state), state, /* tuple */[
                (function (basicSourceTexture, state) {
                    ArrayService$Wonderjs.push(basicSourceTexture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state)[/* needInitedTextureIndexArray */13]);
                    return state;
                  }),
                (function (arrayBufferViewTexture, state) {
                    ArrayService$Wonderjs.push(arrayBufferViewTexture, RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* needInitedTextureIndexArray */15]);
                    return state;
                  })
              ]);
  } else {
    return state;
  }
}

function _handleInitTextureNoWorker(texture, state) {
  if (texture !== undefined) {
    return IndexAllSourceTextureService$Wonderjs.handleByJudgeSourceTextureIndex(texture, IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state), state, /* tuple */[
                (function (basicSourceTexture, state) {
                    InitTextureService$Wonderjs.initTexture(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), basicSourceTexture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state)[/* glTextureMap */10]);
                    return state;
                  }),
                (function (arrayBufferViewTexture, state) {
                    InitTextureService$Wonderjs.initTexture(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), arrayBufferViewTexture, RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state)[/* glTextureMap */12]);
                    return state;
                  })
              ]);
  } else {
    return state;
  }
}

function initTexture(texture, state) {
  var match = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match) {
    return _handleInitTextureWorker(texture, state);
  } else {
    return _handleInitTextureNoWorker(texture, state);
  }
}

function clearNeedInitedTextureIndexArray(state) {
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
    /* needInitedTextureIndexArray : array */[],
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
    /* needAddedSourceArray */init$1[/* needAddedSourceArray */14],
    /* needInitedTextureIndexArray : array */[],
    /* needDisposedTextureIndexArray */init$1[/* needDisposedTextureIndexArray */16],
    /* nameMap */init$1[/* nameMap */17],
    /* materialsMap */init$1[/* materialsMap */18]
  ];
  return newrecord;
}

export {
  _handleInitTextureWorker ,
  _handleInitTextureNoWorker ,
  initTexture ,
  clearNeedInitedTextureIndexArray ,
  
}
/* ArrayService-Wonderjs Not a pure module */
