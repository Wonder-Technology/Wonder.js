

import * as StateDataRenderWorker$Wonderjs from "../../../../src/service/state/render_worker/data/StateDataRenderWorker.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../src/service/state/render_worker/state/StateRenderWorkerService.js";
import * as CreateStateRenderWorkerService$Wonderjs from "../../../../src/service/state/render_worker/state/CreateStateRenderWorkerService.js";

function getStateData(param) {
  return StateDataRenderWorker$Wonderjs.renderWorkerStateData;
}

function unsafeGetState(param) {
  return StateRenderWorkerService$Wonderjs.unsafeGetState(StateDataRenderWorker$Wonderjs.renderWorkerStateData);
}

function getState(param) {
  var match = StateDataRenderWorker$Wonderjs.renderWorkerStateData[/* state */0];
  if (match !== undefined) {
    return match;
  } else {
    return CreateStateRenderWorkerService$Wonderjs.createState(/* () */0);
  }
}

function setState(state) {
  return StateRenderWorkerService$Wonderjs.setState(StateDataRenderWorker$Wonderjs.renderWorkerStateData, state);
}

function createState(param) {
  return CreateStateRenderWorkerService$Wonderjs.createState(/* () */0);
}

function createStateAndSetToStateData(param) {
  return StateRenderWorkerService$Wonderjs.setState(StateDataRenderWorker$Wonderjs.renderWorkerStateData, CreateStateRenderWorkerService$Wonderjs.createState(/* () */0));
}

export {
  getStateData ,
  unsafeGetState ,
  getState ,
  setState ,
  createState ,
  createStateAndSetToStateData ,
  
}
/* StateRenderWorkerService-Wonderjs Not a pure module */
