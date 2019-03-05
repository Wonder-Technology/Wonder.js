

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as WorkerService$Wonderjs from "../../../../service/primitive/worker/WorkerService.js";
import * as JobConfigUtils$Wonderjs from "../../utils/JobConfigUtils.js";
import * as DisposeJobUtils$Wonderjs from "../../../utils/DisposeJobUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as WorkerInstanceService$Wonderjs from "../../../../service/record/main/workerInstance/WorkerInstanceService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../../../../service/state/main/gameObject/DisposeComponentGameObjectMainService.js";

function _buildData(operateType, param) {
  return {
          operateType: operateType,
          geometryNeedDisposeVboBufferArr: param[0],
          sourceInstanceNeedDisposeVboBufferArr: param[1]
        };
}

function _sendDisposeData(operateType, needDisposeVboBufferArrTuple, state) {
  return WorkerService$Wonderjs.postMessage(_buildData(operateType, needDisposeVboBufferArrTuple), WorkerInstanceService$Wonderjs.unsafeGetRenderWorker(state[/* workerInstanceRecord */36]));
}

function execJob(flags, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var operateType = JobConfigUtils$Wonderjs.getOperateType(flags);
                var match = DisposeJobUtils$Wonderjs.execJob(DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicMaterialComponentDataForWorker, DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponentDataForWorker, state);
                var state$1 = match[0];
                _sendDisposeData(operateType, /* tuple */[
                      match[1],
                      match[2]
                    ], state$1);
                StateDataMainService$Wonderjs.setState(stateData, state$1);
                return Caml_option.some(operateType);
              }));
}

export {
  _buildData ,
  _sendDisposeData ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
