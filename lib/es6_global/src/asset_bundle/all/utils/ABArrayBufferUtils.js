


function getArrayBufferFromBufferViews(buffer, bufferView, bufferViews) {
  var match = bufferViews[bufferView];
  var byteOffset = match[/* byteOffset */0];
  return buffer.slice(byteOffset, byteOffset + match[/* byteLength */1] | 0);
}

var RAB = /* module */[/* getArrayBufferFromBufferViews */getArrayBufferFromBufferViews];

function getArrayBufferFromBufferViews$1(buffer, bufferView, bufferViews) {
  var match = bufferViews[bufferView];
  var byteOffset = match[/* byteOffset */1];
  return buffer.slice(byteOffset, byteOffset + match[/* byteLength */2] | 0);
}

var SAB = /* module */[/* getArrayBufferFromBufferViews */getArrayBufferFromBufferViews$1];

export {
  RAB ,
  SAB ,
  
}
/* No side effect */
