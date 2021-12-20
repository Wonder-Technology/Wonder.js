

import * as FloatTool$WonderCommonlib from "./FloatTool.bs.js";

function truncate(param) {
  return [
          FloatTool$WonderCommonlib.truncateFloatValue(param[0], 5),
          FloatTool$WonderCommonlib.truncateFloatValue(param[1], 5),
          FloatTool$WonderCommonlib.truncateFloatValue(param[2], 5)
        ];
}

export {
  truncate ,
  
}
/* No side effect */
