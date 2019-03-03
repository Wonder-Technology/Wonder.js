

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../main/state/IsDebugMainService.js";
import * as PoolVboBufferService$Wonderjs from "../../../record/main/vboBuffer/PoolVboBufferService.js";
import * as TypeArrayPoolService$Wonderjs from "../../../record/main/typeArrayPool/TypeArrayPoolService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function createBuffer(gl, capacity, state) {
  var buffer = PoolVboBufferService$Wonderjs.getInstanceBuffer(gl, state[/* vboBufferRecord */1]);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, capacity, gl.DYNAMIC_DRAW);
  return buffer;
}

function _getFloat32InstanceArraySize(capacity) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("capacity should be a multiplier of 4", "is " + (String(capacity) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](capacity % 4, 0);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  return capacity / 4 | 0;
}

function _createMatrixFloat32Array(capacity) {
  return new Float32Array(_getFloat32InstanceArraySize(capacity));
}

function _getCapacity(sourceInstance, defaultCapacity, capacityMap) {
  var match = MutableSparseMapService$WonderCommonlib.get(sourceInstance, capacityMap);
  if (match !== undefined) {
    return Caml_option.valFromOption(match);
  } else {
    return defaultCapacity;
  }
}

function _setCapacity(sourceInstance, capacity, capacityMap) {
  MutableSparseMapService$WonderCommonlib.set(sourceInstance, capacity, capacityMap);
  return capacityMap;
}

function getOrCreateBuffer(param, param$1, state) {
  var bufferMap = param$1[1];
  var sourceInstance = param[1];
  var match = MutableSparseMapService$WonderCommonlib.get(sourceInstance, bufferMap);
  if (match !== undefined) {
    return Caml_option.valFromOption(match);
  } else {
    var buffer = createBuffer(param[0], _getCapacity(sourceInstance, param[2], param$1[0]), state);
    MutableSparseMapService$WonderCommonlib.set(sourceInstance, buffer, bufferMap);
    return buffer;
  }
}

function getOrCreateMatrixFloat32Array(sourceInstance, defaultCapacity, param, state) {
  var matrixFloat32ArrayMap = param[1];
  var capacity = _getCapacity(sourceInstance, defaultCapacity, param[0]);
  var match = MutableSparseMapService$WonderCommonlib.get(sourceInstance, matrixFloat32ArrayMap);
  if (match !== undefined) {
    return Caml_option.valFromOption(match);
  } else {
    var match$1 = TypeArrayPoolService$Wonderjs.getFloat32TypeArrayFromPool(_getFloat32InstanceArraySize(capacity), state[/* typeArrayPoolRecord */2]);
    if (match$1 !== undefined) {
      return Caml_option.valFromOption(match$1);
    } else {
      var typeArr = new Float32Array(_getFloat32InstanceArraySize(capacity));
      MutableSparseMapService$WonderCommonlib.set(sourceInstance, typeArr, matrixFloat32ArrayMap);
      return typeArr;
    }
  }
}

function setCapacityAndUpdateBufferTypeArray(param, param$1, param$2, state) {
  var capacityMap = param$2[2];
  var buffer = param$1[0];
  var capacity = param[2];
  var sourceInstance = param[1];
  var gl = param[0];
  var currentCapacity = _getCapacity(sourceInstance, param[3], capacityMap);
  var needIncreaseCapacity = false;
  while(currentCapacity < capacity) {
    currentCapacity = (currentCapacity << 1);
    needIncreaseCapacity = true;
  };
  if (needIncreaseCapacity) {
    _setCapacity(sourceInstance, currentCapacity, capacityMap);
    gl.deleteBuffer(buffer);
    var buffer$1 = createBuffer(gl, currentCapacity, state);
    MutableSparseMapService$WonderCommonlib.set(sourceInstance, buffer$1, param$2[0]);
    var matrixFloat32Array = new Float32Array(_getFloat32InstanceArraySize(currentCapacity));
    MutableSparseMapService$WonderCommonlib.set(sourceInstance, matrixFloat32Array, param$2[1]);
    return /* tuple */[
            buffer$1,
            matrixFloat32Array
          ];
  } else {
    return /* tuple */[
            buffer,
            param$1[1]
          ];
  }
}

function updateData(gl, data, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
  return buffer;
}

function bind(gl, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  return buffer;
}

export {
  createBuffer ,
  _getFloat32InstanceArraySize ,
  _createMatrixFloat32Array ,
  _getCapacity ,
  _setCapacity ,
  getOrCreateBuffer ,
  getOrCreateMatrixFloat32Array ,
  setCapacityAndUpdateBufferTypeArray ,
  updateData ,
  bind ,
  
}
/* Log-WonderLog Not a pure module */
