

import * as FloatTool$Wonderjs from "./FloatTool.js";

function truncate(digit, param) {
  return /* tuple */[
          FloatTool$Wonderjs.truncateFloatValue(param[0], digit),
          FloatTool$Wonderjs.truncateFloatValue(param[1], digit),
          FloatTool$Wonderjs.truncateFloatValue(param[2], digit)
        ];
}

export {
  truncate ,
  
}
/* No side effect */
