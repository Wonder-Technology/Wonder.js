

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as InitTextureService$Wonderjs from "../../../service/primitive/texture/InitTextureService.js";
import * as BufferSettingService$Wonderjs from "../../../service/record/main/setting/BufferSettingService.js";
import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/basic_source/RecordBasicSourceTextureMainService.js";
import * as IndexArrayBufferViewSourceTextureService$Wonderjs from "../../../service/record/all/texture/arrayBufferView_source/IndexArrayBufferViewSourceTextureService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../../../service/state/main/texture/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function execJob(flags, state) {
  var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
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
    /* glTextureMap */InitTextureService$Wonderjs.initTextures(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), ArrayService$Wonderjs.range(0, basicSourceTextureRecord[/* index */0] - 1 | 0), basicSourceTextureRecord[/* glTextureMap */10]),
    /* bindTextureUnitCacheMap */basicSourceTextureRecord[/* bindTextureUnitCacheMap */11],
    /* disposedIndexArray */basicSourceTextureRecord[/* disposedIndexArray */12],
    /* needAddedSourceArray */basicSourceTextureRecord[/* needAddedSourceArray */13],
    /* needInitedTextureIndexArray */basicSourceTextureRecord[/* needInitedTextureIndexArray */14],
    /* needDisposedTextureIndexArray */basicSourceTextureRecord[/* needDisposedTextureIndexArray */15],
    /* nameMap */basicSourceTextureRecord[/* nameMap */16],
    /* materialsMap */basicSourceTextureRecord[/* materialsMap */17]
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
    /* glTextureMap */InitTextureService$Wonderjs.initTextures(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), IndexArrayBufferViewSourceTextureService$Wonderjs.getAllArrayBufferViewSourceTextureIndexWhenInit(arrayBufferViewSourceTextureRecord[/* index */0], BufferSettingService$Wonderjs.getBasicSourceTextureCount(state[/* settingRecord */0])), arrayBufferViewSourceTextureRecord[/* glTextureMap */12]),
    /* bindTextureUnitCacheMap */arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */13],
    /* disposedIndexArray */arrayBufferViewSourceTextureRecord[/* disposedIndexArray */14],
    /* needAddedSourceArray */arrayBufferViewSourceTextureRecord[/* needAddedSourceArray */15],
    /* needInitedTextureIndexArray */arrayBufferViewSourceTextureRecord[/* needInitedTextureIndexArray */16],
    /* needDisposedTextureIndexArray */arrayBufferViewSourceTextureRecord[/* needDisposedTextureIndexArray */17],
    /* nameMap */arrayBufferViewSourceTextureRecord[/* nameMap */18],
    /* materialsMap */arrayBufferViewSourceTextureRecord[/* materialsMap */19]
  ];
  return newrecord;
}

export {
  execJob ,
  
}
/* ArrayService-Wonderjs Not a pure module */
