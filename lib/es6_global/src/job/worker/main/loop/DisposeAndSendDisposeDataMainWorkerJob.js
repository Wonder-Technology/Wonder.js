

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as WorkerService$Wonderjs from "../../../../service/primitive/worker/WorkerService.js";
import * as JobConfigUtils$Wonderjs from "../../utils/JobConfigUtils.js";
import * as DisposeJobUtils$Wonderjs from "../../../utils/DisposeJobUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as WorkerInstanceService$Wonderjs from "../../../../service/record/main/workerInstance/WorkerInstanceService.js";
import * as DisposeTextureMainService$Wonderjs from "../../../../service/state/main/texture/DisposeTextureMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/basic_source/RecordBasicSourceTextureMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../../../../service/state/main/gameObject/DisposeComponentGameObjectMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../../../../service/state/main/texture/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function _buildData(operateType, param) {
  return {
          operateType: operateType,
          geometryNeedDisposeVboBufferArr: param[0],
          sourceInstanceNeedDisposeVboBufferArr: param[1],
          needDisposedBasicSourceTextureIndexArray: param[2],
          needDisposedArrayBufferViewTextureIndexArray: param[3]
        };
}

function _sendDisposeData(operateType, needDisposeVboBufferArrTuple, state) {
  return WorkerService$Wonderjs.postMessage(_buildData(operateType, needDisposeVboBufferArrTuple), WorkerInstanceService$Wonderjs.unsafeGetRenderWorker(state[/* workerInstanceRecord */37]));
}

var _clearData = DisposeTextureMainService$Wonderjs.clearNeedDisposedTextureIndexArray;

function execJob(flags, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var operateType = JobConfigUtils$Wonderjs.getOperateType(flags);
                var match = DisposeJobUtils$Wonderjs.execJob(DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicMaterialComponentDataForWorker, DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponentDataForWorker, state);
                var state$1 = match[0];
                var needDisposedBasicSourceTextureIndexArray = ArrayService$WonderCommonlib.removeDuplicateItems(RecordBasicSourceTextureMainService$Wonderjs.getRecord(state$1)[/* needDisposedTextureIndexArray */15]);
                var needDisposedArrayBufferViewTextureIndexArray = ArrayService$WonderCommonlib.removeDuplicateItems(RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state$1)[/* needDisposedTextureIndexArray */17]);
                _sendDisposeData(operateType, /* tuple */[
                      match[1],
                      match[2],
                      needDisposedBasicSourceTextureIndexArray,
                      needDisposedArrayBufferViewTextureIndexArray
                    ], state$1);
                var state$2 = DisposeTextureMainService$Wonderjs.clearNeedDisposedTextureIndexArray(state$1);
                StateDataMainService$Wonderjs.setState(stateData, state$2);
                return Caml_option.some(operateType);
              }));
}

export {
  _buildData ,
  _sendDisposeData ,
  _clearData ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
