

import * as TypeArrayService$Wonderjs from "../buffer/TypeArrayService.js";

function copyArrayBufferSpecificData(sourceBuffer, targetBuffer, totalByteLength) {
  var length = totalByteLength / 1 | 0;
  var targetView = new Uint8Array(targetBuffer, 0, length);
  return TypeArrayService$Wonderjs.setUint8Array(new Uint8Array(sourceBuffer, 0, length), targetView).buffer;
}

function copyArrayBuffer(buffer, totalByteLength) {
  if (totalByteLength !== 0) {
    return buffer.slice(0, totalByteLength);
  } else {
    return buffer;
  }
}

export {
  copyArrayBufferSpecificData ,
  copyArrayBuffer ,
  
}
/* TypeArrayService-Wonderjs Not a pure module */
