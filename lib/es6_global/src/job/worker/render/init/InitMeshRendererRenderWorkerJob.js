

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as CreateTypeArrayAllMeshRendererService$Wonderjs from "../../../../service/record/all/meshRenderer/CreateTypeArrayAllMeshRendererService.js";

function _createTypeArrays(buffer, meshRendererCount, state) {
  var match = CreateTypeArrayAllMeshRendererService$Wonderjs.createTypeArrays(buffer, meshRendererCount);
  state[/* meshRendererRecord */14] = /* record */[
    /* drawModes */match[0],
    /* isRenders */match[1]
  ];
  return state;
}

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var meshRendererData = data.meshRendererData;
                var buffer = meshRendererData.buffer;
                var meshRendererCount = data.bufferData.meshRendererCount;
                StateRenderWorkerService$Wonderjs.setState(stateData, _createTypeArrays(buffer, meshRendererCount, state));
                return e;
              }));
}

export {
  _createTypeArrays ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
