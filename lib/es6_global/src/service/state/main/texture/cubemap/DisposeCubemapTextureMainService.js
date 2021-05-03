

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Log$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeTextureService$Wonderjs from "../../../../primitive/texture/DisposeTextureService.js";
import * as DisposeComponentService$Wonderjs from "../../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../../primitive/buffer/DisposeTypeArrayService.js";
import * as BufferSizeTextureService$Wonderjs from "../../../../record/main/texture/BufferSizeTextureService.js";
import * as DisposeTextureMainService$Wonderjs from "../DisposeTextureMainService.js";
import * as GroupCubemapTextureService$Wonderjs from "../../../../record/main/texture/cubemap/GroupCubemapTextureService.js";
import * as BufferCubemapTextureService$Wonderjs from "../../../../record/main/texture/cubemap/BufferCubemapTextureService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "./RecordCubemapTextureMainService.js";

function isAlive(texture, param) {
  return DisposeTextureService$Wonderjs.isAlive(texture, param[/* disposedIndexArray */27]);
}

function _disposeData(texture, state) {
  var cubemapTextureRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* cubemapTextureRecord */20] = /* record */[
    /* index */cubemapTextureRecord[/* index */0],
    /* buffer */cubemapTextureRecord[/* buffer */1],
    /* wrapSs */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getWrapSsSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultWrapS(/* () */0), cubemapTextureRecord[/* wrapSs */2]),
    /* wrapTs */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getWrapTsSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultWrapT(/* () */0), cubemapTextureRecord[/* wrapTs */3]),
    /* magFilters */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getMagFiltersSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultMagFilter(/* () */0), cubemapTextureRecord[/* magFilters */4]),
    /* minFilters */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getMinFiltersSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultMinFilter(/* () */0), cubemapTextureRecord[/* minFilters */5]),
    /* pxFormats */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), cubemapTextureRecord[/* pxFormats */6]),
    /* nxFormats */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), cubemapTextureRecord[/* nxFormats */7]),
    /* pyFormats */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), cubemapTextureRecord[/* pyFormats */8]),
    /* nyFormats */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), cubemapTextureRecord[/* nyFormats */9]),
    /* pzFormats */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), cubemapTextureRecord[/* pzFormats */10]),
    /* nzFormats */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getFormatsSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), cubemapTextureRecord[/* nzFormats */11]),
    /* pxTypes */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), cubemapTextureRecord[/* pxTypes */12]),
    /* nxTypes */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), cubemapTextureRecord[/* nxTypes */13]),
    /* pyTypes */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), cubemapTextureRecord[/* pyTypes */14]),
    /* nyTypes */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), cubemapTextureRecord[/* nyTypes */15]),
    /* pzTypes */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), cubemapTextureRecord[/* pzTypes */16]),
    /* nzTypes */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getTypesSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), cubemapTextureRecord[/* nzTypes */17]),
    /* isNeedUpdates */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getIsNeedUpdatesSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultIsNeedUpdate(/* () */0), cubemapTextureRecord[/* isNeedUpdates */18]),
    /* flipYs */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(Caml_int32.imul(texture, BufferSizeTextureService$Wonderjs.getFlipYsSize(/* () */0)), BufferCubemapTextureService$Wonderjs.getDefaultFlipY(/* () */0), cubemapTextureRecord[/* flipYs */19]),
    /* pxSourceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(texture, cubemapTextureRecord[/* pxSourceMap */20]),
    /* nxSourceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(texture, cubemapTextureRecord[/* nxSourceMap */21]),
    /* pySourceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(texture, cubemapTextureRecord[/* pySourceMap */22]),
    /* nySourceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(texture, cubemapTextureRecord[/* nySourceMap */23]),
    /* pzSourceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(texture, cubemapTextureRecord[/* pzSourceMap */24]),
    /* nzSourceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(texture, cubemapTextureRecord[/* nzSourceMap */25]),
    /* glTextureMap */cubemapTextureRecord[/* glTextureMap */26],
    /* disposedIndexArray */cubemapTextureRecord[/* disposedIndexArray */27],
    /* needAddedPXSourceArray */DisposeTextureMainService$Wonderjs.disposeNeedAddedSourceArray(texture, cubemapTextureRecord[/* needAddedPXSourceArray */28]),
    /* needAddedNXSourceArray */DisposeTextureMainService$Wonderjs.disposeNeedAddedSourceArray(texture, cubemapTextureRecord[/* needAddedNXSourceArray */29]),
    /* needAddedPYSourceArray */DisposeTextureMainService$Wonderjs.disposeNeedAddedSourceArray(texture, cubemapTextureRecord[/* needAddedPYSourceArray */30]),
    /* needAddedNYSourceArray */DisposeTextureMainService$Wonderjs.disposeNeedAddedSourceArray(texture, cubemapTextureRecord[/* needAddedNYSourceArray */31]),
    /* needAddedPZSourceArray */DisposeTextureMainService$Wonderjs.disposeNeedAddedSourceArray(texture, cubemapTextureRecord[/* needAddedPZSourceArray */32]),
    /* needAddedNZSourceArray */DisposeTextureMainService$Wonderjs.disposeNeedAddedSourceArray(texture, cubemapTextureRecord[/* needAddedNZSourceArray */33]),
    /* needInitedTextureIndexArray */DisposeTextureMainService$Wonderjs.disposeNeedInitedSourceArray(texture, cubemapTextureRecord[/* needInitedTextureIndexArray */34]),
    /* needDisposedTextureIndexArray */cubemapTextureRecord[/* needDisposedTextureIndexArray */35],
    /* nameMap */DisposeComponentService$Wonderjs.disposeSparseMapData(texture, cubemapTextureRecord[/* nameMap */36]),
    /* materialsMap */cubemapTextureRecord[/* materialsMap */37]
  ];
  return newrecord;
}

function handleDispose(isRemoveTexture, materialData, textureArr, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(textureArr, isAlive, RecordCubemapTextureMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return ArrayService$WonderCommonlib.reduceOneParam((function (state, texture) {
                var cubemapTextureRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
                var cubemapTextureRecord$1 = GroupCubemapTextureService$Wonderjs.removeMaterial(materialData, texture, cubemapTextureRecord);
                if (isRemoveTexture) {
                  var newrecord = Caml_array.caml_array_dup(state);
                  newrecord[/* cubemapTextureRecord */20] = cubemapTextureRecord$1;
                  return newrecord;
                } else {
                  var match = GroupCubemapTextureService$Wonderjs.isGroupCubemapTexture(texture, cubemapTextureRecord$1);
                  if (match) {
                    var newrecord$1 = Caml_array.caml_array_dup(state);
                    newrecord$1[/* cubemapTextureRecord */20] = cubemapTextureRecord$1;
                    return newrecord$1;
                  } else {
                    var state$1 = _disposeData(texture, state);
                    var cubemapTextureRecord$2 = RecordCubemapTextureMainService$Wonderjs.getRecord(state$1);
                    var newrecord$2 = Caml_array.caml_array_dup(state$1);
                    var newrecord$3 = Caml_array.caml_array_dup(cubemapTextureRecord$2);
                    newrecord$2[/* cubemapTextureRecord */20] = (newrecord$3[/* disposedIndexArray */27] = DisposeTextureService$Wonderjs.addDisposeIndex(texture, cubemapTextureRecord$2[/* disposedIndexArray */27]), newrecord$3);
                    return newrecord$2;
                  }
                }
              }), state, textureArr);
}

function handleDisposeTexture(texture, isRemoveTexture, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAlive(texture, isAlive, RecordCubemapTextureMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var cubemapTextureRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  var cubemapTextureRecord$1 = GroupCubemapTextureService$Wonderjs.clearMaterial(texture, cubemapTextureRecord);
  if (isRemoveTexture) {
    var newrecord = Caml_array.caml_array_dup(state);
    newrecord[/* cubemapTextureRecord */20] = cubemapTextureRecord$1;
    return newrecord;
  } else {
    var state$1 = _disposeData(texture, state);
    var cubemapTextureRecord$2 = RecordCubemapTextureMainService$Wonderjs.getRecord(state$1);
    var newrecord$1 = Caml_array.caml_array_dup(state$1);
    var newrecord$2 = Caml_array.caml_array_dup(cubemapTextureRecord$2);
    newrecord$1[/* cubemapTextureRecord */20] = (newrecord$2[/* disposedIndexArray */27] = DisposeTextureService$Wonderjs.addDisposeIndex(texture, cubemapTextureRecord$2[/* disposedIndexArray */27]), newrecord$2);
    return Contract$WonderLog.ensureCheck((function (state) {
                  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("texture:" + (String(texture) + " not to be group"), "is"), (function (param) {
                                return Contract$WonderLog.assertFalse(GroupCubemapTextureService$Wonderjs.isGroupCubemapTexture(texture, RecordCubemapTextureMainService$Wonderjs.getRecord(state)));
                              }));
                }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), newrecord$1);
  }
}

export {
  isAlive ,
  _disposeData ,
  handleDispose ,
  handleDisposeTexture ,
  
}
/* Log-WonderLog Not a pure module */
