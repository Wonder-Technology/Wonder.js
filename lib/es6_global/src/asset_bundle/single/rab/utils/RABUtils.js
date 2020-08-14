

import * as BufferUtils$Wonderjs from "../../../../asset/utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../../../service/atom/ArrayService.js";

function computeBufferViewDataByteLength(bufferViewArr) {
  var match = ArrayService$Wonderjs.getLast(bufferViewArr);
  if (match !== undefined) {
    var match$1 = match;
    return match$1[/* byteOffset */0] + BufferUtils$Wonderjs.alignedLength(match$1[/* byteLength */1]) | 0;
  } else {
    return 0;
  }
}

export {
  computeBufferViewDataByteLength ,
  
}
/* BufferUtils-Wonderjs Not a pure module */
