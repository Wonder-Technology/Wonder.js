

import * as StateDataRenderWorker$Wonderjs from "../../../../src/service/state/render_worker/data/StateDataRenderWorker.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../src/service/state/render_worker/state/StateRenderWorkerService.js";
import * as CreateStateRenderWorkerService$Wonderjs from "../../../../src/service/state/render_worker/state/CreateStateRenderWorkerService.js";

function getStateData() {
  return StateDataRenderWorker$Wonderjs.renderWorkerStateData;
}

function unsafeGetState() {
  return StateRenderWorkerService$Wonderjs.unsafeGetState(StateDataRenderWorker$Wonderjs.renderWorkerStateData);
}

function getState() {
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

function createState() {
  return CreateStateRenderWorkerService$Wonderjs.createState(/* () */0);
}

function createStateAndSetToStateData() {
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
