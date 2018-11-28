

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../../state/main/data/StateDataMain.js";
import * as SparseMapService$Wonderjs from "../../../atom/SparseMapService.js";
import * as IsDebugMainService$Wonderjs from "../../../state/main/state/IsDebugMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _getBufferAndSetBufferMap(gl, bufferPool) {
  var match = bufferPool.pop();
  if (match !== undefined) {
    return match;
  } else {
    return gl.createBuffer();
  }
}

function getArrayBuffer(gl, param) {
  return _getBufferAndSetBufferMap(gl, param[/* vertexArrayBufferPool */5]);
}

function getElementArrayBuffer(gl, param) {
  return _getBufferAndSetBufferMap(gl, param[/* elementArrayBufferPool */6]);
}

function getInstanceBuffer(gl, param) {
  return _getBufferAndSetBufferMap(gl, param[/* matrixInstanceBufferPool */7]);
}

function addAllBufferToPool(param) {
  var matrixInstanceBufferPool = param[/* matrixInstanceBufferPool */7];
  var elementArrayBufferPool = param[/* elementArrayBufferPool */6];
  var vertexArrayBufferPool = param[/* vertexArrayBufferPool */5];
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          vertexArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* geometryVertexBufferMap */0]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          vertexArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* geometryTexCoordBufferMap */1]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          vertexArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* geometryNormalBufferMap */2]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          elementArrayBufferPool.push(buffer);
          return /* () */0;
        }), param[/* geometryElementArrayBufferMap */3]);
  SparseMapService$Wonderjs.forEachValid((function (buffer) {
          matrixInstanceBufferPool.push(buffer);
          return /* () */0;
        }), param[/* matrixInstanceBufferMap */4]);
  return /* tuple */[
          vertexArrayBufferPool,
          elementArrayBufferPool,
          matrixInstanceBufferPool
        ];
}

var _getBufferFromBufferMap = SparseMapService$WonderCommonlib.get;

function _addBufferToPool(geometryIndex, bufferMap, pool) {
  var match = SparseMapService$WonderCommonlib.get(geometryIndex, bufferMap);
  if (match !== undefined) {
    return ArrayService$Wonderjs.push(Js_primitive.valFromOption(match), pool);
  } else {
    return pool;
  }
}

function addGeometryBufferToPool(geometryIndex, record) {
  return /* record */[
          /* geometryVertexBufferMap */record[/* geometryVertexBufferMap */0],
          /* geometryTexCoordBufferMap */record[/* geometryTexCoordBufferMap */1],
          /* geometryNormalBufferMap */record[/* geometryNormalBufferMap */2],
          /* geometryElementArrayBufferMap */record[/* geometryElementArrayBufferMap */3],
          /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */4],
          /* vertexArrayBufferPool */_addBufferToPool(geometryIndex, record[/* geometryNormalBufferMap */2], _addBufferToPool(geometryIndex, record[/* geometryTexCoordBufferMap */1], _addBufferToPool(geometryIndex, record[/* geometryVertexBufferMap */0], record[/* vertexArrayBufferPool */5]))),
          /* elementArrayBufferPool */_addBufferToPool(geometryIndex, record[/* geometryElementArrayBufferMap */3], record[/* elementArrayBufferPool */6]),
          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */7]
        ];
}

function _unsafeGetBufferFromBufferMap(index, bufferMap) {
  return Contract$WonderLog.ensureCheck((function () {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("buffer exist in bufferMap", "not"), (function () {
                              return Contract$WonderLog.assertTrue(SparseMapService$WonderCommonlib.has(index, bufferMap));
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), SparseMapService$WonderCommonlib.unsafeGet(index, bufferMap));
}

function addInstanceBufferToPool(sourceInstanceIndex, record) {
  var match = SparseMapService$WonderCommonlib.get(sourceInstanceIndex, record[/* matrixInstanceBufferMap */4]);
  if (match !== undefined) {
    return /* record */[
            /* geometryVertexBufferMap */record[/* geometryVertexBufferMap */0],
            /* geometryTexCoordBufferMap */record[/* geometryTexCoordBufferMap */1],
            /* geometryNormalBufferMap */record[/* geometryNormalBufferMap */2],
            /* geometryElementArrayBufferMap */record[/* geometryElementArrayBufferMap */3],
            /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */4],
            /* vertexArrayBufferPool */record[/* vertexArrayBufferPool */5],
            /* elementArrayBufferPool */record[/* elementArrayBufferPool */6],
            /* matrixInstanceBufferPool */ArrayService$Wonderjs.push(Js_primitive.valFromOption(match), record[/* matrixInstanceBufferPool */7])
          ];
  } else {
    return record;
  }
}

export {
  _getBufferAndSetBufferMap ,
  getArrayBuffer ,
  getElementArrayBuffer ,
  getInstanceBuffer ,
  addAllBufferToPool ,
  _getBufferFromBufferMap ,
  _addBufferToPool ,
  addGeometryBufferToPool ,
  _unsafeGetBufferFromBufferMap ,
  addInstanceBufferToPool ,
  
}
/* Log-WonderLog Not a pure module */
