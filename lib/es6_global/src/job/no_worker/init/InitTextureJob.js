

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as InitTextureService$Wonderjs from "../../../service/primitive/texture/InitTextureService.js";
import * as BufferSettingService$Wonderjs from "../../../service/record/main/setting/BufferSettingService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../service/record/all/device/AllDeviceManagerService.js";
import * as RecordRenderMainService$Wonderjs from "../../../service/state/main/render/RecordRenderMainService.js";
import * as OperateTextureRenderMainService$Wonderjs from "../../../service/state/main/render/OperateTextureRenderMainService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "../../../service/state/main/texture/cubemap/RecordCubemapTextureMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/source/basic_source/RecordBasicSourceTextureMainService.js";
import * as IndexAllArrayBufferViewSourceTextureService$Wonderjs from "../../../service/record/all/texture/source/arrayBufferView_source/IndexAllArrayBufferViewSourceTextureService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/source/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function _initRenderTextureData(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = RecordRenderMainService$Wonderjs.getRecord(state);
  newrecord[/* renderRecord */34] = /* record */[
    /* basicRenderObjectRecord */init[/* basicRenderObjectRecord */0],
    /* lightRenderObjectRecord */init[/* lightRenderObjectRecord */1],
    /* cameraRecord */init[/* cameraRecord */2],
    /* textureRecord *//* record */[/* activableTextureUnitArray */OperateTextureRenderMainService$Wonderjs.createActivableTextureUnitArray(state)]
  ];
  return newrecord;
}

function execJob(flags, state) {
  var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  var cubemapTextureRecord = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicSourceTextureRecord */18] = /* record */[
    /* index */basicSourceTextureRecord[/* index */0],
    /* wrapSs */basicSourceTextureRecord[/* wrapSs */1],
    /* wrapTs */basicSourceTextureRecord[/* wrapTs */2],
    /* magFilters */basicSourceTextureRecord[/* magFilters */3],
    /* minFilters */basicSourceTextureRecord[/* minFilters */4],
    /* formats */basicSourceTextureRecord[/* formats */5],
    /* types */basicSourceTextureRecord[/* types */6],
    /* isNeedUpdates */basicSourceTextureRecord[/* isNeedUpdates */7],
    /* flipYs */basicSourceTextureRecord[/* flipYs */8],
    /* sourceMap */basicSourceTextureRecord[/* sourceMap */9],
    /* glTextureMap */InitTextureService$Wonderjs.initTextures(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), ArrayService$Wonderjs.range(0, basicSourceTextureRecord[/* index */0] - 1 | 0), basicSourceTextureRecord[/* glTextureMap */10]),
    /* disposedIndexArray */basicSourceTextureRecord[/* disposedIndexArray */11],
    /* needAddedSourceArray */basicSourceTextureRecord[/* needAddedSourceArray */12],
    /* needInitedTextureIndexArray */basicSourceTextureRecord[/* needInitedTextureIndexArray */13],
    /* needDisposedTextureIndexArray */basicSourceTextureRecord[/* needDisposedTextureIndexArray */14],
    /* nameMap */basicSourceTextureRecord[/* nameMap */15],
    /* materialsMap */basicSourceTextureRecord[/* materialsMap */16]
  ];
  newrecord[/* arrayBufferViewSourceTextureRecord */19] = /* record */[
    /* index */arrayBufferViewSourceTextureRecord[/* index */0],
    /* wrapSs */arrayBufferViewSourceTextureRecord[/* wrapSs */1],
    /* wrapTs */arrayBufferViewSourceTextureRecord[/* wrapTs */2],
    /* magFilters */arrayBufferViewSourceTextureRecord[/* magFilters */3],
    /* minFilters */arrayBufferViewSourceTextureRecord[/* minFilters */4],
    /* formats */arrayBufferViewSourceTextureRecord[/* formats */5],
    /* types */arrayBufferViewSourceTextureRecord[/* types */6],
    /* isNeedUpdates */arrayBufferViewSourceTextureRecord[/* isNeedUpdates */7],
    /* flipYs */arrayBufferViewSourceTextureRecord[/* flipYs */8],
    /* widths */arrayBufferViewSourceTextureRecord[/* widths */9],
    /* heights */arrayBufferViewSourceTextureRecord[/* heights */10],
    /* sourceMap */arrayBufferViewSourceTextureRecord[/* sourceMap */11],
    /* glTextureMap */InitTextureService$Wonderjs.initTextures(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), IndexAllArrayBufferViewSourceTextureService$Wonderjs.getAllArrayBufferViewSourceTextureIndexWhenInit(arrayBufferViewSourceTextureRecord[/* index */0], BufferSettingService$Wonderjs.getBasicSourceTextureCount(state[/* settingRecord */0])), arrayBufferViewSourceTextureRecord[/* glTextureMap */12]),
    /* disposedIndexArray */arrayBufferViewSourceTextureRecord[/* disposedIndexArray */13],
    /* needAddedSourceArray */arrayBufferViewSourceTextureRecord[/* needAddedSourceArray */14],
    /* needInitedTextureIndexArray */arrayBufferViewSourceTextureRecord[/* needInitedTextureIndexArray */15],
    /* needDisposedTextureIndexArray */arrayBufferViewSourceTextureRecord[/* needDisposedTextureIndexArray */16],
    /* nameMap */arrayBufferViewSourceTextureRecord[/* nameMap */17],
    /* materialsMap */arrayBufferViewSourceTextureRecord[/* materialsMap */18]
  ];
  var newrecord$1 = Caml_array.caml_array_dup(cubemapTextureRecord);
  newrecord[/* cubemapTextureRecord */20] = (newrecord$1[/* glTextureMap */26] = InitTextureService$Wonderjs.initTextures(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), ArrayService$Wonderjs.range(0, cubemapTextureRecord[/* index */0] - 1 | 0), cubemapTextureRecord[/* glTextureMap */26]), newrecord$1);
  return _initRenderTextureData(newrecord);
}

export {
  _initRenderTextureData ,
  execJob ,
  
}
/* ArrayService-Wonderjs Not a pure module */
