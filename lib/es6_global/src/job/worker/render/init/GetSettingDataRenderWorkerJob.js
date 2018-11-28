

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";

function execJob(_, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function () {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var gpuData = data.gpuData;
                var memoryData = data.memoryData;
                var instanceBufferData = data.instanceBufferData;
                state[/* settingRecord */1] = /* record */[
                  /* gpu *//* record */[/* useHardwareInstance */gpuData.useHardwareInstance],
                  /* instanceBuffer *//* record */[
                    /* sourceInstanceCount */instanceBufferData.sourceInstanceCount,
                    /* objectInstanceCountPerSourceInstance */instanceBufferData.objectInstanceCountPerSourceInstance
                  ],
                  /* textureCountPerMaterial */data.bufferData.textureCountPerMaterial,
                  /* basicSourceTextureCount */data.bufferData.basicSourceTextureCount,
                  /* arrayBufferViewSourceTextureCount */data.bufferData.arrayBufferViewSourceTextureCount,
                  /* memory *//* record */[/* maxBigTypeArrayPoolSize */memoryData.maxBigTypeArrayPoolSize]
                ];
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
