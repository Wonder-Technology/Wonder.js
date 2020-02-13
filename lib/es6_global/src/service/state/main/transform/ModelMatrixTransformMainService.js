

import * as RecordTransformMainService$Wonderjs from "./RecordTransformMainService.js";
import * as ModelMatrixTransformService$Wonderjs from "../../../record/main/transform/ModelMatrixTransformService.js";

function setLocalEulerAnglesByTuple(transform, eulerAngles, state) {
  ModelMatrixTransformService$Wonderjs.setLocalEulerAnglesByTuple(transform, eulerAngles, RecordTransformMainService$Wonderjs.getRecord(state));
  return state;
}

export {
  setLocalEulerAnglesByTuple ,
  
}
/* RecordTransformMainService-Wonderjs Not a pure module */
