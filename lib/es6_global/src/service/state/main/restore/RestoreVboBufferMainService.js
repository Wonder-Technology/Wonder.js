

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as PoolVboBufferService$Wonderjs from "../../../record/main/vboBuffer/PoolVboBufferService.js";

function restore(currentState, targetState) {
  var match = PoolVboBufferService$Wonderjs.addAllBufferToPool(currentState[/* vboBufferRecord */34]);
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* vboBufferRecord */34] = /* record */[
    /* boxGeometryVertexBufferMap : array */[],
    /* boxGeometryTexCoordBufferMap : array */[],
    /* boxGeometryNormalBufferMap : array */[],
    /* boxGeometryElementArrayBufferMap : array */[],
    /* customGeometryVertexBufferMap : array */[],
    /* customGeometryTexCoordBufferMap : array */[],
    /* customGeometryNormalBufferMap : array */[],
    /* customGeometryElementArrayBufferMap : array */[],
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
