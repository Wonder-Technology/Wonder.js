

import * as UpdateTransformMainService$Wonderjs from "../../service/state/main/transform/UpdateTransformMainService.js";

function execJob(index, globalTempRecord, transformRecord) {
  for(var i = 0 ,i_finish = index - 1 | 0; i <= i_finish; ++i){
    UpdateTransformMainService$Wonderjs.update(i, globalTempRecord, transformRecord);
  }
  return transformRecord;
}

export {
  execJob ,
  
}
/* UpdateTransformMainService-Wonderjs Not a pure module */
