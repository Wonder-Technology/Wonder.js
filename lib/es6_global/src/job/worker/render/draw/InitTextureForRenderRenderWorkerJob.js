

import * as Most from "most";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as InitTextureService$Wonderjs from "../../../../service/primitive/texture/InitTextureService.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../service/record/all/device/AllDeviceManagerService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as RecordCubemapTextureRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/cubemap/RecordCubemapTextureRenderWorkerService.js";
import * as SourceMapCubemapTextureRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/cubemap/SourceMapCubemapTextureRenderWorkerService.js";
import * as RecordBasicSourceTextureRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/basic_source/RecordBasicSourceTextureRenderWorkerService.js";
import * as SourceMapBasicSourceTextureRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/basic_source/SourceMapBasicSourceTextureRenderWorkerService.js";
import * as RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/arrayBufferView_source/RecordArrayBufferViewSourceTextureRenderWorkerService.js";
import * as SourceMapArrayBufferViewSourceTextureRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/texture/arrayBufferView_source/SourceMapArrayBufferViewSourceTextureRenderWorkerService.js";

function _buildAddArrayBufferViewSourceStream(e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var initData = data.initData;
                var textureData = initData.textureData;
                return StateRenderWorkerService$Wonderjs.setState(stateData, SourceMapArrayBufferViewSourceTextureRenderWorkerService$Wonderjs.addSourceArray(textureData.arrayBufferViewSourceTextureData.needAddedSourceArray, state));
              }));
}

function _buildInitTextureStream(e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var initData = data.initData;
                var textureData = initData.textureData;
                var basicSourceTextureRecord = RecordBasicSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
                var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
                var cubemapTextureRecord = RecordCubemapTextureRenderWorkerService$Wonderjs.getRecord(state);
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
                  /* glTextureMap */InitTextureService$Wonderjs.initTexturesWithIndexArray(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), textureData.basicSourceTextureData.needInitedTextureIndexArray, basicSourceTextureRecord[/* glTextureMap */9])
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
                  /* glTextureMap */InitTextureService$Wonderjs.initTexturesWithIndexArray(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), textureData.arrayBufferViewSourceTextureData.needInitedTextureIndexArray, arrayBufferViewSourceTextureRecord[/* glTextureMap */11])
                ];
                var newrecord = Caml_array.caml_array_dup(cubemapTextureRecord);
                state[/* cubemapTextureRecord */17] = (newrecord[/* glTextureMap */24] = InitTextureService$Wonderjs.initTexturesWithIndexArray(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), textureData.cubemapTextureData.needInitedTextureIndexArray, cubemapTextureRecord[/* glTextureMap */24]), newrecord);
                return state;
              }));
}

function execJob(flags, e, stateData) {
  var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
  var data = MessageService$Wonderjs.getRecord(e);
  var initData = data.initData;
  var textureData = initData.textureData;
  return Most.fromPromise(Most.forEach((function (state) {
                      StateRenderWorkerService$Wonderjs.setState(stateData, state);
                      return /* () */0;
                    }), MostUtils$Wonderjs.concatArray(/* array */[
                        SourceMapBasicSourceTextureRenderWorkerService$Wonderjs.addSourceFromImageDataStream(textureData.basicSourceTextureData.needAddedImageDataArray, state),
                        SourceMapCubemapTextureRenderWorkerService$Wonderjs.addSourceFromImageDataStream(/* tuple */[
                              textureData.cubemapTextureData.needAddedPXImageDataArray,
                              textureData.cubemapTextureData.needAddedNXImageDataArray,
                              textureData.cubemapTextureData.needAddedPYImageDataArray,
                              textureData.cubemapTextureData.needAddedNYImageDataArray,
                              textureData.cubemapTextureData.needAddedPZImageDataArray,
                              textureData.cubemapTextureData.needAddedNZImageDataArray
                            ], state),
                        _buildAddArrayBufferViewSourceStream(e, stateData),
                        _buildInitTextureStream(e, stateData)
                      ])).then((function (param) {
                    return Promise.resolve(e);
                  })));
}

export {
  _buildAddArrayBufferViewSourceStream ,
  _buildInitTextureStream ,
  execJob ,
  
}
/* most Not a pure module */
