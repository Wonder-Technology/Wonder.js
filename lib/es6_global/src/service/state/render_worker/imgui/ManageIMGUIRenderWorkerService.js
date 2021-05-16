

import * as RecordIMGUIRenderWorkerService$Wonderjs from "./RecordIMGUIRenderWorkerService.js";

var getRecord = RecordIMGUIRenderWorkerService$Wonderjs.getRecord;

function setRecord(record, state) {
  state[/* imguiRecord */29] = record;
  return state;
}

export {
  getRecord ,
  setRecord ,
  
}
/* No side effect */
