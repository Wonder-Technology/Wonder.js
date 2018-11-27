

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function create() {
  return /* record */[
          /* geometryVertexBufferMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* geometryTexCoordBufferMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* geometryNormalBufferMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* geometryElementArrayBufferMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* matrixInstanceBufferMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* vertexArrayBufferPool */ArrayService$WonderCommonlib.createEmpty(/* () */0),
          /* elementArrayBufferPool */ArrayService$WonderCommonlib.createEmpty(/* () */0),
          /* matrixInstanceBufferPool */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore() {
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
/* ArrayService-WonderCommonlib Not a pure module */
