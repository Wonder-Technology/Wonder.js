

import * as StateDataMain$Wonderjs from "../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../service/state/main/state/IsDebugMainService.js";
import * as StateDataMainService$Wonderjs from "../service/state/main/state/StateDataMainService.js";
import * as CreateStateMainService$Wonderjs from "../service/state/main/state/CreateStateMainService.js";
import * as RestoreStateMainService$Wonderjs from "../service/state/main/restore/RestoreStateMainService.js";
import * as DeepCopyStateMainService$Wonderjs from "../service/state/main/state/DeepCopyStateMainService.js";
import * as CreateStateDataMainService$Wonderjs from "../service/state/main/state/CreateStateDataMainService.js";

function restoreState(currentState, targetState) {
  return RestoreStateMainService$Wonderjs.restore(StateDataMain$Wonderjs.stateData, currentState, targetState);
}

function getStateData(param) {
  return StateDataMain$Wonderjs.stateData;
}

function createStateData(param) {
  return CreateStateDataMainService$Wonderjs.createStateData(/* () */0);
}

function unsafeGetState(param) {
  return StateDataMainService$Wonderjs.unsafeGetState(StateDataMain$Wonderjs.stateData);
}

var getStateFromData = StateDataMainService$Wonderjs.unsafeGetState;

function createState(param) {
  return CreateStateMainService$Wonderjs.createState(/* () */0);
}

function setState(state) {
  return StateDataMainService$Wonderjs.setState(StateDataMain$Wonderjs.stateData, state);
}

var setStateToData = StateDataMainService$Wonderjs.setState;

function setIsDebug(isDebug) {
  return IsDebugMainService$Wonderjs.setIsDebug(StateDataMain$Wonderjs.stateData, isDebug);
}

var deepCopyForRestore = DeepCopyStateMainService$Wonderjs.deepCopyForRestore;

export {
  deepCopyForRestore ,
  restoreState ,
  getStateData ,
  createStateData ,
  unsafeGetState ,
  getStateFromData ,
  createState ,
  setState ,
  setStateToData ,
  setIsDebug ,
  
}
/* StateDataMain-Wonderjs Not a pure module */
