

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as PoolVboBufferService$Wonderjs from "./PoolVboBufferService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";

function disposeGeometryBufferData(geometry, record) {
  return /* record */[
          /* geometryVertexBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* geometryVertexBufferMap */0]),
          /* geometryTexCoordBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* geometryTexCoordBufferMap */1]),
          /* geometryNormalBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* geometryNormalBufferMap */2]),
          /* geometryElementArrayBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* geometryElementArrayBufferMap */3]),
          /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */4],
          /* vertexArrayBufferPool */record[/* vertexArrayBufferPool */5],
          /* elementArrayBufferPool */record[/* elementArrayBufferPool */6],
          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */7]
        ];
}

function disposeInstanceBufferData(sourceInstance, record) {
  return /* record */[
          /* geometryVertexBufferMap */record[/* geometryVertexBufferMap */0],
          /* geometryTexCoordBufferMap */record[/* geometryTexCoordBufferMap */1],
          /* geometryNormalBufferMap */record[/* geometryNormalBufferMap */2],
          /* geometryElementArrayBufferMap */record[/* geometryElementArrayBufferMap */3],
          /* matrixInstanceBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(sourceInstance, record[/* matrixInstanceBufferMap */4]),
          /* vertexArrayBufferPool */record[/* vertexArrayBufferPool */5],
          /* elementArrayBufferPool */record[/* elementArrayBufferPool */6],
          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */7]
        ];
}

function _disposeVboBuffer(needDisposeVboBufferArr, param, vboBufferRecord) {
  var disposeBufferDataFunc = param[1];
  var addBufferToPoolFunc = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (vboBufferRecord, component) {
                return disposeBufferDataFunc(component, addBufferToPoolFunc(component, vboBufferRecord));
              }), vboBufferRecord, needDisposeVboBufferArr);
}

function disposeGeometryVboBuffer(geometryNeedDisposeVboBufferArr, vboBufferRecord) {
  return _disposeVboBuffer(geometryNeedDisposeVboBufferArr, /* tuple */[
              PoolVboBufferService$Wonderjs.addGeometryBufferToPool,
              disposeGeometryBufferData
            ], vboBufferRecord);
}

function disposeSourceInstanceVboBuffer(sourceInstanceNeedDisposeVboBufferArr, vboBufferRecord) {
  return _disposeVboBuffer(sourceInstanceNeedDisposeVboBufferArr, /* tuple */[
              PoolVboBufferService$Wonderjs.addInstanceBufferToPool,
              disposeInstanceBufferData
            ], vboBufferRecord);
}

export {
  disposeGeometryBufferData ,
  disposeInstanceBufferData ,
  _disposeVboBuffer ,
  disposeGeometryVboBuffer ,
  disposeSourceInstanceVboBuffer ,
  
}
/* PoolVboBufferService-Wonderjs Not a pure module */
