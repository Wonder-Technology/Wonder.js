

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as IsRenderUtils$Wonderjs from "./utils/IsRenderUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as CreateTypeArrayAllRenderObjectService$Wonderjs from "../../../../service/record/all/renderObject/CreateTypeArrayAllRenderObjectService.js";

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var match = IsRenderUtils$Wonderjs.isRender(data);
                if (match) {
                  var lightRenderData = data.renderData.light;
                  var match$1 = CreateTypeArrayAllRenderObjectService$Wonderjs.createTypeArrays(lightRenderData.buffer, lightRenderData.bufferCount);
                  state[/* renderRecord */23][/* lightRenderObjectRecord */1] = /* record */[
                    /* renderIndexArray */lightRenderData.renderIndexArray,
                    /* transformIndices */match$1[0],
                    /* materialIndices */match$1[1],
                    /* meshRendererIndices */match$1[2],
                    /* geometryIndices */match$1[3],
                    /* sourceInstanceIndices */match$1[4]
                  ];
                  StateRenderWorkerService$Wonderjs.setState(stateData, state);
                  return e;
                } else {
                  return e;
                }
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
