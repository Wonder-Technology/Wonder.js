

import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";

function getAllComponents(index, disposedIndexArray) {
  return ArrayService$Wonderjs.range(0, index - 1 | 0).filter((function (index) {
                return !disposedIndexArray.includes(index);
              }));
}

export {
  getAllComponents ,
  
}
/* ArrayService-Wonderjs Not a pure module */
