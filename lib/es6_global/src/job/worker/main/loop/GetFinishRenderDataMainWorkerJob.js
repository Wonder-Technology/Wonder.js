

import * as Most from "most";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as GetWorkerDataJobUtils$Wonderjs from "../../utils/GetWorkerDataJobUtils.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../service/state/main/imgui/RecordIMGUIMainService.js";
import * as OperateWorkerDataMainService$Wonderjs from "../../../../service/state/main/workerData/OperateWorkerDataMainService.js";

function _exec(data, state) {
  return RecordIMGUIMainService$Wonderjs.setControlDataFromRenderWorker(data.imguiData, OperateWorkerDataMainService$Wonderjs.setRenderWorkerCustomData(data.customData, state));
}

function execJob(flags, stateData) {
  return Most.map((function () {
                return undefined;
              }), Most.tap((function (e) {
                    var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                    var data = e.data;
                    var state$1 = _exec(data, state);
                    StateDataMainService$Wonderjs.setState(stateData, state$1);
                    return /* () */0;
                  }), GetWorkerDataJobUtils$Wonderjs.createGetOtherWorkerDataStream(flags, stateData)));
}

export {
  _exec ,
  execJob ,
  
}
/* most Not a pure module */
