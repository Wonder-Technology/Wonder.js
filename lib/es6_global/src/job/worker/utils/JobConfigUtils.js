

import * as JobConfigService$Wonderjs from "../../../service/primitive/JobConfigService.js";

function getOperateType(flags) {
  return JobConfigService$Wonderjs.unsafeGetFlags(flags)[0];
}

export {
  getOperateType ,
  
}
/* JobConfigService-Wonderjs Not a pure module */
