

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as DisposeSourceInstanceAllService$Wonderjs from "../../../../service/state/all/instance/DisposeSourceInstanceAllService.js";
import * as MemoryRenderWorkerSettingService$Wonderjs from "../../../../service/record/render_worker/setting/MemoryRenderWorkerSettingService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var settingRecord = state[/* settingRecord */1];
                var sourceInstanceRecord = state[/* sourceInstanceRecord */11];
                var typeArrayPoolRecord = state[/* typeArrayPoolRecord */24];
                var data = MessageService$Wonderjs.getRecord(e);
                var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, sourceInstance) {
                        return /* tuple */[
                                DisposeSourceInstanceAllService$Wonderjs.disposeMatrixFloat32ArrayMap(sourceInstance, MemoryRenderWorkerSettingService$Wonderjs.getMaxBigTypeArrayPoolSize(settingRecord), param[0], typeArrayPoolRecord),
                                DisposeSourceInstanceAllService$Wonderjs.disposeMatrixInstanceBufferCapacityMap(sourceInstance, param[1]),
                                DisposeSourceInstanceAllService$Wonderjs.disposeIsSendTransformMatrixDataMap(sourceInstance, param[2])
                              ];
                      }), /* tuple */[
                      sourceInstanceRecord[/* matrixFloat32ArrayMap */4],
                      sourceInstanceRecord[/* matrixInstanceBufferCapacityMap */3],
                      sourceInstanceRecord[/* isSendTransformMatrixDataMap */5]
                    ], data.sourceInstanceNeedDisposeVboBufferArr);
                state[/* sourceInstanceRecord */11] = /* record */[
                  /* objectInstanceTransformIndexMap */sourceInstanceRecord[/* objectInstanceTransformIndexMap */0],
                  /* objectInstanceTransformCollections */sourceInstanceRecord[/* objectInstanceTransformCollections */1],
                  /* isTransformStatics */sourceInstanceRecord[/* isTransformStatics */2],
                  /* matrixInstanceBufferCapacityMap */match[1],
                  /* matrixFloat32ArrayMap */match[0],
                  /* isSendTransformMatrixDataMap */match[2]
                ];
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
