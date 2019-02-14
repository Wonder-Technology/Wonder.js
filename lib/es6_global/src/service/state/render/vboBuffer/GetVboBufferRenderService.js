

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function getOrCreateBuffer(gl, param, param$1, state) {
  var bufferMap = param[1];
  var geometryIndex = param[0];
  var match = MutableSparseMapService$WonderCommonlib.get(geometryIndex, bufferMap);
  if (match !== undefined) {
    return Js_primitive.valFromOption(match);
  } else {
    var buffer = param$1[0](gl, param$1[1](geometryIndex, state), state);
    MutableSparseMapService$WonderCommonlib.set(geometryIndex, buffer, bufferMap);
    return buffer;
  }
}

function getOrCreateIndexBuffer(gl, param, createBufferFunc, state) {
  var bufferMap = param[1];
  var geometryIndex = param[0];
  var match = MutableSparseMapService$WonderCommonlib.get(geometryIndex, bufferMap);
  if (match !== undefined) {
    return Js_primitive.valFromOption(match);
  } else {
    var buffer = createBufferFunc(gl, param[2], state);
    MutableSparseMapService$WonderCommonlib.set(geometryIndex, buffer, bufferMap);
    return buffer;
  }
}

export {
  getOrCreateBuffer ,
  getOrCreateIndexBuffer ,
  
}
/* MutableSparseMapService-WonderCommonlib Not a pure module */
