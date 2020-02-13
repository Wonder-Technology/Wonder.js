

import * as ArrayService$Wonderjs from "../../../../atom/ArrayService.js";
import * as IndexSourceTextureService$Wonderjs from "../IndexSourceTextureService.js";

function getAllArrayBufferViewSourceTextureIndexWhenInit(index, basicSourceTextureCount) {
  return ArrayService$Wonderjs.range(0, index - 1 | 0).map((function (indexInTypeArr) {
                return IndexSourceTextureService$Wonderjs.generateArrayBufferViewSourceTextureIndex(indexInTypeArr, basicSourceTextureCount);
              }));
}

export {
  getAllArrayBufferViewSourceTextureIndexWhenInit ,
  
}
/* ArrayService-Wonderjs Not a pure module */
