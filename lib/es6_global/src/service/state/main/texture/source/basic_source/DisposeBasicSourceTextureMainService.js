

import * as Caml_array from "./../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "./../../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Log$WonderLog from "./../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferTextureService$Wonderjs from "../../../../../record/main/texture/BufferTextureService.js";
import * as DisposeTextureService$Wonderjs from "../../../../../primitive/texture/DisposeTextureService.js";
import * as DisposeComponentService$Wonderjs from "../../../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../../../primitive/buffer/DisposeTypeArrayService.js";
import * as BufferSizeTextureService$Wonderjs from "../../../../../record/main/texture/BufferSizeTextureService.js";
import * as DisposeTextureMainService$Wonderjs from "../../DisposeTextureMainService.js";
import * as GroupBasicSourceTextureService$Wonderjs from "../../../../../record/main/texture/source/basic_source/GroupBasicSourceTextureService.js";
import * as BufferBasicSourceTextureService$Wonderjs from "../../../../../record/main/texture/source/basic_source/BufferBasicSourceTextureService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "./RecordBasicSourceTextureMainService.js";

function isAlive(texture, param) {
  return DisposeTextureService$Wonderjs.isAlive(texture, param[/* disposedIndexArray */11]);
}

function _disposeData(texture, state) {
  var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicSourceTextureRecord */18] = /* record */[
    /* index */basicSourceTextureRecord[/* index */0],
    /* wrapSs */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0)), BufferBasicSourceTextureService$Wonderjs.getDefaultWrapS(/* () */0), basicSourceTextureRecord[/* wrapSs */1]),
    /* wrapTs */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0)), BufferBasicSourceTextureService$Wonderjs.getDefaultWrapT(/* () */0), basicSourceTextureRecord[/* wrapTs */2]),
    /* magFilters */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0)), BufferBasicSourceTextureService$Wonderjs.getDefaultMagFilter(/* () */0), basicSourceTextureRecord[/* magFilters */3]),
    /* minFilters */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0)), BufferBasicSourceTextureService$Wonderjs.getDefaultMinFilter(/* () */0), basicSourceTextureRecord[/* minFilters */4]),
    /* formats */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), BufferBasicSourceTextureService$Wonderjs.getDefaultFormat(/* () */0), basicSourceTextureRecord[/* formats */5]),
    /* types */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), BufferBasicSourceTextureService$Wonderjs.getDefaultType(/* () */0), basicSourceTextureRecord[/* types */6]),
    /* isNeedUpdates */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0)), BufferTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0), basicSourceTextureRecord[/* isNeedUpdates */7]),
    /* flipYs */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0)), BufferBasicSourceTextureService$Wonderjs.getDefaultFlipY(/* () */0), basicSourceTextureRecord[/* flipYs */8]),
    /* sourceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(texture, basicSourceTextureRecord[/* sourceMap */9]),
    /* glTextureMap */basicSourceTextureRecord[/* glTextureMap */10],
    /* disposedIndexArray */basicSourceTextureRecord[/* disposedIndexArray */11],
    /* needAddedSourceArray */DisposeTextureMainService$Wonderjs.disposeNeedAddedSourceArray(texture, basicSourceTextureRecord[/* needAddedSourceArray */12]),
    /* needInitedTextureIndexArray */DisposeTextureMainService$Wonderjs.disposeNeedInitedSourceArray(texture, basicSourceTextureRecord[/* needInitedTextureIndexArray */13]),
    /* needDisposedTextureIndexArray */basicSourceTextureRecord[/* needDisposedTextureIndexArray */14],
    /* nameMap */DisposeComponentService$Wonderjs.disposeSparseMapData(texture, basicSourceTextureRecord[/* nameMap */15]),
    /* materialsMap */basicSourceTextureRecord[/* materialsMap */16]
  ];
  return newrecord;
}

function handleDispose(isRemoveTexture, materialData, textureArr, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(textureArr, isAlive, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, texture) {
                var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
                var basicSourceTextureRecord$1 = GroupBasicSourceTextureService$Wonderjs.removeMaterial(materialData, texture, basicSourceTextureRecord);
                if (isRemoveTexture) {
                  var newrecord = Caml_array.caml_array_dup(state);
                  newrecord[/* basicSourceTextureRecord */18] = basicSourceTextureRecord$1;
                  return newrecord;
                } else {
                  var match = GroupBasicSourceTextureService$Wonderjs.isGroupBasicSourceTexture(texture, basicSourceTextureRecord$1);
                  if (match) {
                    var newrecord$1 = Caml_array.caml_array_dup(state);
                    newrecord$1[/* basicSourceTextureRecord */18] = basicSourceTextureRecord$1;
                    return newrecord$1;
                  } else {
                    var state$1 = _disposeData(texture, state);
                    var basicSourceTextureRecord$2 = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state$1);
                    var newrecord$2 = Caml_array.caml_array_dup(state$1);
                    newrecord$2[/* basicSourceTextureRecord */18] = /* record */[
                      /* index */basicSourceTextureRecord$2[/* index */0],
                      /* wrapSs */basicSourceTextureRecord$2[/* wrapSs */1],
                      /* wrapTs */basicSourceTextureRecord$2[/* wrapTs */2],
                      /* magFilters */basicSourceTextureRecord$2[/* magFilters */3],
                      /* minFilters */basicSourceTextureRecord$2[/* minFilters */4],
                      /* formats */basicSourceTextureRecord$2[/* formats */5],
                      /* types */basicSourceTextureRecord$2[/* types */6],
                      /* isNeedUpdates */basicSourceTextureRecord$2[/* isNeedUpdates */7],
                      /* flipYs */basicSourceTextureRecord$2[/* flipYs */8],
                      /* sourceMap */basicSourceTextureRecord$2[/* sourceMap */9],
                      /* glTextureMap */basicSourceTextureRecord$2[/* glTextureMap */10],
                      /* disposedIndexArray */DisposeTextureService$Wonderjs.addDisposeIndex(texture, basicSourceTextureRecord$2[/* disposedIndexArray */11]),
                      /* needAddedSourceArray */basicSourceTextureRecord$2[/* needAddedSourceArray */12],
                      /* needInitedTextureIndexArray */basicSourceTextureRecord$2[/* needInitedTextureIndexArray */13],
                      /* needDisposedTextureIndexArray */basicSourceTextureRecord$2[/* needDisposedTextureIndexArray */14],
                      /* nameMap */basicSourceTextureRecord$2[/* nameMap */15],
                      /* materialsMap */basicSourceTextureRecord$2[/* materialsMap */16]
                    ];
                    return newrecord$2;
                  }
                }
              }), state, textureArr);
}

function handleDisposeTexture(texture, isRemoveTexture, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAlive(texture, isAlive, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var basicSourceTextureRecord$1 = GroupBasicSourceTextureService$Wonderjs.clearMaterial(texture, basicSourceTextureRecord);
  if (isRemoveTexture) {
    var newrecord = Caml_array.caml_array_dup(state);
    newrecord[/* basicSourceTextureRecord */18] = basicSourceTextureRecord$1;
    return newrecord;
  } else {
    var state$1 = _disposeData(texture, state);
    var basicSourceTextureRecord$2 = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state$1);
    var newrecord$1 = Caml_array.caml_array_dup(state$1);
    return Contract$WonderLog.ensureCheck((function (state) {
                  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("texture:" + (String(texture) + " not to be group"), "is"), (function (param) {
                                return Contract$WonderLog.assertFalse(GroupBasicSourceTextureService$Wonderjs.isGroupBasicSourceTexture(texture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(state)));
                              }));
                }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), (newrecord$1[/* basicSourceTextureRecord */18] = /* record */[
                  /* index */basicSourceTextureRecord$2[/* index */0],
                  /* wrapSs */basicSourceTextureRecord$2[/* wrapSs */1],
                  /* wrapTs */basicSourceTextureRecord$2[/* wrapTs */2],
                  /* magFilters */basicSourceTextureRecord$2[/* magFilters */3],
                  /* minFilters */basicSourceTextureRecord$2[/* minFilters */4],
                  /* formats */basicSourceTextureRecord$2[/* formats */5],
                  /* types */basicSourceTextureRecord$2[/* types */6],
                  /* isNeedUpdates */basicSourceTextureRecord$2[/* isNeedUpdates */7],
                  /* flipYs */basicSourceTextureRecord$2[/* flipYs */8],
                  /* sourceMap */basicSourceTextureRecord$2[/* sourceMap */9],
                  /* glTextureMap */basicSourceTextureRecord$2[/* glTextureMap */10],
                  /* disposedIndexArray */DisposeTextureService$Wonderjs.addDisposeIndex(texture, basicSourceTextureRecord$2[/* disposedIndexArray */11]),
                  /* needAddedSourceArray */basicSourceTextureRecord$2[/* needAddedSourceArray */12],
                  /* needInitedTextureIndexArray */basicSourceTextureRecord$2[/* needInitedTextureIndexArray */13],
                  /* needDisposedTextureIndexArray */basicSourceTextureRecord$2[/* needDisposedTextureIndexArray */14],
                  /* nameMap */basicSourceTextureRecord$2[/* nameMap */15],
                  /* materialsMap */basicSourceTextureRecord$2[/* materialsMap */16]
                ], newrecord$1));
  }
}

export {
  isAlive ,
  _disposeData ,
  handleDispose ,
  handleDisposeTexture ,
  
}
/* Log-WonderLog Not a pure module */
