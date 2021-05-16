

import * as IndicesTypeAllGeometryService$Wonderjs from "../../../record/all/geometry/IndicesTypeAllGeometryService.js";

function unsafeGetIndicesType(geometry, param) {
  return IndicesTypeAllGeometryService$Wonderjs.unsafeGetIndicesType(geometry, param[/* geometryRecord */5][/* indicesTypeMap */9]);
}

function getIndexType(gl, geometry, state) {
  var match = unsafeGetIndicesType(geometry, state);
  if (match) {
    return gl.UNSIGNED_INT;
  } else {
    return gl.UNSIGNED_SHORT;
  }
}

function getIndexTypeSize(gl, geometry, state) {
  var match = unsafeGetIndicesType(geometry, state);
  if (match) {
    return Uint32Array.BYTES_PER_ELEMENT;
  } else {
    return Uint16Array.BYTES_PER_ELEMENT;
  }
}

export {
  unsafeGetIndicesType ,
  getIndexType ,
  getIndexTypeSize ,
  
}
/* No side effect */
