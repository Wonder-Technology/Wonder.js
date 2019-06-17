

import * as Most from "most";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as ArrayService$Wonderjs from "../../../../service/atom/ArrayService.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as InitTextureService$Wonderjs from "../../../../service/primitive/texture/InitTextureService.js";
import * as DeviceManagerService$Wonderjs from "../../../../service/record/all/device/DeviceManagerService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as BufferRenderWorkerSettingService$Wonderjs from "../../../../service/record/render_worker/setting/BufferRenderWorkerSettingService.js";
import * as CreateTypeArrayBasicSourceTextureService$Wonderjs from "../../../../service/record/all/texture/basic_source/CreateTypeArrayBasicSourceTextureService.js";
import * as IndexArrayBufferViewSourceTextureService$Wonderjs from "../../../../service/record/all/texture/arrayBufferView_source/IndexArrayBufferViewSourceTextureService.js";
import * as RecordBasicSourceTextureRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/basic_source/RecordBasicSourceTextureRenderWorkerService.js";
import * as SourceMapBasicSourceTextureRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/basic_source/SourceMapBasicSourceTextureRenderWorkerService.js";
import * as CreateTypeArrayArrayBufferViewSourceTextureService$Wonderjs from "../../../../service/record/all/texture/arrayBufferView_source/CreateTypeArrayArrayBufferViewSourceTextureService.js";
import * as RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/arrayBufferView_source/RecordArrayBufferViewSourceTextureRenderWorkerService.js";
import * as SourceMapArrayBufferViewSourceTextureRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/arrayBufferView_source/SourceMapArrayBufferViewSourceTextureRenderWorkerService.js";

function _createTypeArrays(buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount, state) {
  var match = CreateTypeArrayBasicSourceTextureService$Wonderjs.createTypeArrays(buffer, basicSourceTextureCount);
  state[/* basicSourceTextureRecord */15] = /* record */[
    /* wrapSs */Caml_option.some(match[0]),
    /* wrapTs */Caml_option.some(match[1]),
    /* magFilters */Caml_option.some(match[2]),
    /* minFilters */Caml_option.some(match[3]),
    /* formats */Caml_option.some(match[4]),
    /* types */Caml_option.some(match[5]),
    /* isNeedUpdates */Caml_option.some(match[6]),
    /* flipYs */Caml_option.some(match[7]),
    /* sourceMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* glTextureMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* bindTextureUnitCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
  ];
  var match$1 = CreateTypeArrayArrayBufferViewSourceTextureService$Wonderjs.createTypeArrays(buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount);
  state[/* arrayBufferViewSourceTextureRecord */16] = /* record */[
    /* wrapSs */Caml_option.some(match$1[0]),
    /* wrapTs */Caml_option.some(match$1[1]),
    /* magFilters */Caml_option.some(match$1[2]),
    /* minFilters */Caml_option.some(match$1[3]),
    /* formats */Caml_option.some(match$1[4]),
    /* types */Caml_option.some(match$1[5]),
    /* isNeedUpdates */Caml_option.some(match$1[6]),
    /* flipYs */Caml_option.some(match$1[7]),
    /* widths */Caml_option.some(match$1[8]),
    /* heights */Caml_option.some(match$1[9]),
    /* sourceMap */undefined,
    /* glTextureMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* bindTextureUnitCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return state;
}

function _buildCreateTypeArraysStream(e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var settingRecord = state[/* settingRecord */1];
                var data = MessageService$Wonderjs.getRecord(e);
                var textureData = data.textureData;
                var basicSourceTextureCount = BufferRenderWorkerSettingService$Wonderjs.unsafeGetBasicSourceTextureCount(settingRecord);
                var arrayBufferViewSourceTextureCount = BufferRenderWorkerSettingService$Wonderjs.unsafeGetArrayBufferViewSourceTextureCount(settingRecord);
                return StateRenderWorkerService$Wonderjs.setState(stateData, _createTypeArrays(textureData.buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount, state));
              }));
}

function _buildAddArrayBufferViewSourceStream(e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var textureData = data.textureData;
                var sourceMap = textureData.arrayBufferViewSourceTextureData.sourceMap;
                return StateRenderWorkerService$Wonderjs.setState(stateData, SourceMapArrayBufferViewSourceTextureRenderWorkerService$Wonderjs.setSourceMap(sourceMap, state));
              }));
}

function _buildInitTextureStream(e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var textureData = data.textureData;
                var basicSourceTextureRecord = RecordBasicSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
                var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
                state[/* basicSourceTextureRecord */15] = /* record */[
                  /* wrapSs */basicSourceTextureRecord[/* wrapSs */0],
                  /* wrapTs */basicSourceTextureRecord[/* wrapTs */1],
                  /* magFilters */basicSourceTextureRecord[/* magFilters */2],
                  /* minFilters */basicSourceTextureRecord[/* minFilters */3],
                  /* formats */basicSourceTextureRecord[/* formats */4],
                  /* types */basicSourceTextureRecord[/* types */5],
                  /* isNeedUpdates */basicSourceTextureRecord[/* isNeedUpdates */6],
                  /* flipYs */basicSourceTextureRecord[/* flipYs */7],
                  /* sourceMap */basicSourceTextureRecord[/* sourceMap */8],
                  /* glTextureMap */InitTextureService$Wonderjs.initTextures(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), ArrayService$Wonderjs.range(0, textureData.basicSourceTextureData.index - 1 | 0), basicSourceTextureRecord[/* glTextureMap */9]),
                  /* bindTextureUnitCacheMap */basicSourceTextureRecord[/* bindTextureUnitCacheMap */10]
                ];
                state[/* arrayBufferViewSourceTextureRecord */16] = /* record */[
                  /* wrapSs */arrayBufferViewSourceTextureRecord[/* wrapSs */0],
                  /* wrapTs */arrayBufferViewSourceTextureRecord[/* wrapTs */1],
                  /* magFilters */arrayBufferViewSourceTextureRecord[/* magFilters */2],
                  /* minFilters */arrayBufferViewSourceTextureRecord[/* minFilters */3],
                  /* formats */arrayBufferViewSourceTextureRecord[/* formats */4],
                  /* types */arrayBufferViewSourceTextureRecord[/* types */5],
                  /* isNeedUpdates */arrayBufferViewSourceTextureRecord[/* isNeedUpdates */6],
                  /* flipYs */arrayBufferViewSourceTextureRecord[/* flipYs */7],
                  /* widths */arrayBufferViewSourceTextureRecord[/* widths */8],
                  /* heights */arrayBufferViewSourceTextureRecord[/* heights */9],
                  /* sourceMap */arrayBufferViewSourceTextureRecord[/* sourceMap */10],
                  /* glTextureMap */InitTextureService$Wonderjs.initTextures(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), IndexArrayBufferViewSourceTextureService$Wonderjs.getAllArrayBufferViewSourceTextureIndexWhenInit(textureData.arrayBufferViewSourceTextureData.index, BufferRenderWorkerSettingService$Wonderjs.unsafeGetBasicSourceTextureCount(state[/* settingRecord */1])), arrayBufferViewSourceTextureRecord[/* glTextureMap */11]),
                  /* bindTextureUnitCacheMap */arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */12]
                ];
                return state;
              }));
}

function execJob(param, e, stateData) {
  var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
  var data = MessageService$Wonderjs.getRecord(e);
  var textureData = data.textureData;
  return Most.fromPromise(Most.forEach((function (state) {
                      StateRenderWorkerService$Wonderjs.setState(stateData, state);
                      return /* () */0;
                    }), MostUtils$Wonderjs.concatArray(/* array */[
                        _buildCreateTypeArraysStream(e, stateData),
                        SourceMapBasicSourceTextureRenderWorkerService$Wonderjs.addSourceFromImageDataStream(textureData.basicSourceTextureData.needAddedImageDataArray, state),
                        _buildAddArrayBufferViewSourceStream(e, stateData),
                        _buildInitTextureStream(e, stateData)
                      ])).then((function (param) {
                    return Promise.resolve(e);
                  })));
}

export {
  _createTypeArrays ,
  _buildCreateTypeArraysStream ,
  _buildAddArrayBufferViewSourceStream ,
  _buildInitTextureStream ,
  execJob ,
  
}
/* most Not a pure module */
