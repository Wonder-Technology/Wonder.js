

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableHashMapService$Wonderjs from "../../../atom/MutableHashMapService.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function getBufferSizeByType(type_) {
  switch (type_) {
    case "vec2" : 
        return 2;
    case "vec3" : 
        return 3;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getBufferSizeByType", "invalide type_: " + (String(type_) + ""), "", "", ""));
  }
}

function enableVertexAttribArray(gl, pos, vertexAttribHistoryArray) {
  var match = ArrayService$WonderCommonlib.isNotEqual(pos, true, vertexAttribHistoryArray);
  if (match) {
    gl.enableVertexAttribArray(pos);
    vertexAttribHistoryArray[pos] = true;
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function sendMatrix3(gl, pos, data) {
  gl.uniformMatrix3fv(pos, false, data);
  return /* () */0;
}

function sendMatrix4(gl, pos, data) {
  gl.uniformMatrix4fv(pos, false, data);
  return /* () */0;
}

function _fastGetCache(shaderCacheMap, name) {
  return MutableHashMapService$Wonderjs.fastGet(name, shaderCacheMap);
}

function _setCache(shaderCacheMap, name, record) {
  return MutableHashMapService$WonderCommonlib.set(name, record, shaderCacheMap);
}

var getCacheMap = MutableSparseMapService$WonderCommonlib.get;

function _queryIsNotCacheWithCache(cache, x, y, z) {
  var isNotCached = false;
  if (cache[0] !== x) {
    cache[0] = x;
    isNotCached = true;
  }
  if (cache[1] !== y) {
    cache[1] = y;
    isNotCached = true;
  }
  if (cache[2] !== z) {
    cache[2] = z;
    isNotCached = true;
  }
  return isNotCached;
}

function _isNotCacheVector3AndSetCache(shaderCacheMap, name, param) {
  var z = param[2];
  var y = param[1];
  var x = param[0];
  var match = MutableHashMapService$Wonderjs.fastGet(name, shaderCacheMap);
  if (match[0]) {
    return _queryIsNotCacheWithCache(match[1], x, y, z);
  } else {
    MutableHashMapService$WonderCommonlib.set(name, /* array */[
          x,
          y,
          z
        ], shaderCacheMap);
    return true;
  }
}

function _isNotCacheNumberAndSetCache(shaderCacheMap, name, value) {
  var match = MutableHashMapService$Wonderjs.fastGet(name, shaderCacheMap);
  var match$1 = match[0] && match[1] === value;
  if (match$1) {
    return false;
  } else {
    MutableHashMapService$WonderCommonlib.set(name, value, shaderCacheMap);
    return true;
  }
}

function sendFloat(gl, shaderCacheMap, param, value) {
  if (_isNotCacheNumberAndSetCache(shaderCacheMap, param[0], value)) {
    gl.uniform1f(param[1], value);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function sendInt(gl, shaderCacheMap, param, value) {
  if (_isNotCacheNumberAndSetCache(shaderCacheMap, param[0], value)) {
    gl.uniform1i(param[1], value);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function sendFloat3(gl, shaderCacheMap, param, valueArr) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("valueArr.length === 3", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](valueArr.length, 3);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var x = Caml_array.caml_array_get(valueArr, 0);
  var y = Caml_array.caml_array_get(valueArr, 1);
  var z = Caml_array.caml_array_get(valueArr, 2);
  if (_isNotCacheVector3AndSetCache(shaderCacheMap, param[0], /* tuple */[
          x,
          y,
          z
        ])) {
    gl.uniform3f(param[1], x, y, z);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function sendVec3(gl, shaderCacheMap, param, dataTuple) {
  if (_isNotCacheVector3AndSetCache(shaderCacheMap, param[0], dataTuple)) {
    gl.uniform3f(param[1], dataTuple[0], dataTuple[1], dataTuple[2]);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

export {
  getBufferSizeByType ,
  enableVertexAttribArray ,
  sendMatrix3 ,
  sendMatrix4 ,
  _fastGetCache ,
  _setCache ,
  getCacheMap ,
  _queryIsNotCacheWithCache ,
  _isNotCacheVector3AndSetCache ,
  _isNotCacheNumberAndSetCache ,
  sendFloat ,
  sendInt ,
  sendFloat3 ,
  sendVec3 ,
  
}
/* Log-WonderLog Not a pure module */
