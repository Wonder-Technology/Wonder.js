

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create(param) {
  return /* record */[
          /* geometryVertexBufferMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* geometryTexCoordBufferMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* geometryNormalBufferMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* geometryElementArrayBufferMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* matrixInstanceBufferMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* vertexArrayBufferPool */ArrayService$WonderCommonlib.createEmpty(/* () */0),
          /* elementArrayBufferPool */ArrayService$WonderCommonlib.createEmpty(/* () */0),
          /* matrixInstanceBufferPool */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(record) {
  return /* record */[
          /* geometryVertexBufferMap : array */[],
          /* geometryTexCoordBufferMap : array */[],
          /* geometryNormalBufferMap : array */[],
          /* geometryElementArrayBufferMap : array */[],
          /* matrixInstanceBufferMap : array */[],
          /* vertexArrayBufferPool : array */[],
          /* elementArrayBufferPool : array */[],
          /* matrixInstanceBufferPool : array */[]
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */
