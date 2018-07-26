

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as WorkerService$Wonderjs from "../../../../service/primitive/worker/WorkerService.js";
import * as JobConfigUtils$Wonderjs from "../../utils/JobConfigUtils.js";
import * as RecordIMGUIService$WonderImgui from "../../../../../../../node_modules/wonder-imgui/lib/es6_global/src/service/record/RecordIMGUIService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as RecordIMGUIRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/imgui/RecordIMGUIRenderWorkerService.js";
import * as OperateCustomRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/custom/OperateCustomRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function () {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                WorkerService$Wonderjs.postMessage({
                      operateType: JobConfigUtils$Wonderjs.getOperateType(flags),
                      customData: OperateCustomRenderWorkerService$Wonderjs.getCustomDataFromRenderWorkerToMainWorker(state),
                      imguiData: {
                        controlData: RecordIMGUIService$WonderImgui.getControlData(RecordIMGUIRenderWorkerService$Wonderjs.getRecord(state))
                      }
                    }, Curry._1(WorkerService$Wonderjs.getSelf, /* () */0));
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
