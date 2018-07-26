

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as PoolVboBufferService$Wonderjs from "./PoolVboBufferService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";

function disposeBoxGeometryBufferData(geometry, record) {
  return /* record */[
          /* boxGeometryVertexBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* boxGeometryVertexBufferMap */0]),
          /* boxGeometryTexCoordBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* boxGeometryTexCoordBufferMap */1]),
          /* boxGeometryNormalBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* boxGeometryNormalBufferMap */2]),
          /* boxGeometryElementArrayBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* boxGeometryElementArrayBufferMap */3]),
          /* customGeometryVertexBufferMap */record[/* customGeometryVertexBufferMap */4],
          /* customGeometryTexCoordBufferMap */record[/* customGeometryTexCoordBufferMap */5],
          /* customGeometryNormalBufferMap */record[/* customGeometryNormalBufferMap */6],
          /* customGeometryElementArrayBufferMap */record[/* customGeometryElementArrayBufferMap */7],
          /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */8],
          /* vertexArrayBufferPool */record[/* vertexArrayBufferPool */9],
          /* elementArrayBufferPool */record[/* elementArrayBufferPool */10],
          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */11]
        ];
}

function disposeCustomGeometryBufferData(geometry, record) {
  return /* record */[
          /* boxGeometryVertexBufferMap */record[/* boxGeometryVertexBufferMap */0],
          /* boxGeometryTexCoordBufferMap */record[/* boxGeometryTexCoordBufferMap */1],
          /* boxGeometryNormalBufferMap */record[/* boxGeometryNormalBufferMap */2],
          /* boxGeometryElementArrayBufferMap */record[/* boxGeometryElementArrayBufferMap */3],
          /* customGeometryVertexBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* customGeometryVertexBufferMap */4]),
          /* customGeometryTexCoordBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* customGeometryTexCoordBufferMap */5]),
          /* customGeometryNormalBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* customGeometryNormalBufferMap */6]),
          /* customGeometryElementArrayBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(geometry, record[/* customGeometryElementArrayBufferMap */7]),
          /* matrixInstanceBufferMap */record[/* matrixInstanceBufferMap */8],
          /* vertexArrayBufferPool */record[/* vertexArrayBufferPool */9],
          /* elementArrayBufferPool */record[/* elementArrayBufferPool */10],
          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */11]
        ];
}

function disposeInstanceBufferData(sourceInstance, record) {
  return /* record */[
          /* boxGeometryVertexBufferMap */record[/* boxGeometryVertexBufferMap */0],
          /* boxGeometryTexCoordBufferMap */record[/* boxGeometryTexCoordBufferMap */1],
          /* boxGeometryNormalBufferMap */record[/* boxGeometryNormalBufferMap */2],
          /* boxGeometryElementArrayBufferMap */record[/* boxGeometryElementArrayBufferMap */3],
          /* customGeometryVertexBufferMap */record[/* customGeometryVertexBufferMap */4],
          /* customGeometryTexCoordBufferMap */record[/* customGeometryTexCoordBufferMap */5],
          /* customGeometryNormalBufferMap */record[/* customGeometryNormalBufferMap */6],
          /* customGeometryElementArrayBufferMap */record[/* customGeometryElementArrayBufferMap */7],
          /* matrixInstanceBufferMap */DisposeComponentService$Wonderjs.disposeSparseMapData(sourceInstance, record[/* matrixInstanceBufferMap */8]),
          /* vertexArrayBufferPool */record[/* vertexArrayBufferPool */9],
          /* elementArrayBufferPool */record[/* elementArrayBufferPool */10],
          /* matrixInstanceBufferPool */record[/* matrixInstanceBufferPool */11]
        ];
}

function _disposeVboBuffer(needDisposeVboBufferArr, param, vboBufferRecord) {
  var disposeBufferDataFunc = param[1];
  var addBufferToPoolFunc = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (vboBufferRecord, component) {
                return disposeBufferDataFunc(component, addBufferToPoolFunc(component, vboBufferRecord));
              }), vboBufferRecord, needDisposeVboBufferArr);
}

function disposeBoxGeometryVboBuffer(boxGeometryNeedDisposeVboBufferArr, vboBufferRecord) {
  return _disposeVboBuffer(boxGeometryNeedDisposeVboBufferArr, /* tuple */[
              PoolVboBufferService$Wonderjs.addBoxGeometryBufferToPool,
              disposeBoxGeometryBufferData
            ], vboBufferRecord);
}

function disposeCustomGeometryVboBuffer(customGeometryNeedDisposeVboBufferArr, vboBufferRecord) {
  return _disposeVboBuffer(customGeometryNeedDisposeVboBufferArr, /* tuple */[
              PoolVboBufferService$Wonderjs.addCustomGeometryBufferToPool,
              disposeCustomGeometryBufferData
            ], vboBufferRecord);
}

function disposeSourceInstanceVboBuffer(sourceInstanceNeedDisposeVboBufferArr, vboBufferRecord) {
  return _disposeVboBuffer(sourceInstanceNeedDisposeVboBufferArr, /* tuple */[
              PoolVboBufferService$Wonderjs.addInstanceBufferToPool,
              disposeInstanceBufferData
            ], vboBufferRecord);
}

export {
  disposeBoxGeometryBufferData ,
  disposeCustomGeometryBufferData ,
  disposeInstanceBufferData ,
  _disposeVboBuffer ,
  disposeBoxGeometryVboBuffer ,
  disposeCustomGeometryVboBuffer ,
  disposeSourceInstanceVboBuffer ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
