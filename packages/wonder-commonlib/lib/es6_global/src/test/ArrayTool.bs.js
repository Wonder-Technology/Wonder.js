

import * as FloatTool$WonderCommonlib from "./FloatTool.bs.js";

function truncate(arr) {
  return arr.map(function (__x) {
              return FloatTool$WonderCommonlib.truncateFloatValue(__x, 5);
            });
}

export {
  truncate ,
  
}
/* No side effect */
