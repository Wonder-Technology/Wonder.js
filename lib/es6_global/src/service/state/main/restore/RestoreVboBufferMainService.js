

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as PoolVboBufferService$Wonderjs from "../../../record/main/vboBuffer/PoolVboBufferService.js";

function restore(currentState, targetState) {
  var match = PoolVboBufferService$Wonderjs.addAllBufferToPool(currentState[/* vboBufferRecord */36]);
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* vboBufferRecord */36] = /* record */[
    /* geometryVertexBufferMap : array */[],
    /* geometryTexCoordBufferMap : array */[],
    /* geometryNormalBufferMap : array */[],
    /* geometryElementArrayBufferMap : array */[],
    /* matrixInstanceBufferMap : array */[],
    /* vertexArrayBufferPool */match[0],
    /* elementArrayBufferPool */match[1],
    /* matrixInstanceBufferPool */match[2]
  ];
  return newrecord;
}

export {
  restore ,
  
}
/* PoolVboBufferService-Wonderjs Not a pure module */
