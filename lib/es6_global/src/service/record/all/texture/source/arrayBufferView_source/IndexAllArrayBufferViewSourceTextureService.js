

import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as IndexAllSourceTextureService$Wonderjs from "../IndexAllSourceTextureService.js";

function getAllArrayBufferViewSourceTextureIndexWhenInit(index, basicSourceTextureCount) {
  return ArrayService$Wonderjs.range(0, index - 1 | 0).map((function (indexInTypeArr) {
                return IndexAllSourceTextureService$Wonderjs.generateArrayBufferViewSourceTextureIndex(indexInTypeArr, basicSourceTextureCount);
              }));
}

export {
  getAllArrayBufferViewSourceTextureIndexWhenInit ,
  
}
/* ArrayService-Wonderjs Not a pure module */
