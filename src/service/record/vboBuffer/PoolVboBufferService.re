open VboBufferType;

let _getBufferAndSetBufferMap = (gl, bufferPool) =>
  switch (bufferPool |> Js.Array.pop) {
  | Some(buffer) => buffer
  | None => Gl.createBuffer(gl)
  };

let getArrayBuffer = (gl, {vertexArrayBufferPool}) =>
  _getBufferAndSetBufferMap(gl, vertexArrayBufferPool);

let getElementArrayBuffer = (gl, {elementArrayBufferPool}) =>
  _getBufferAndSetBufferMap(gl, elementArrayBufferPool);

let getInstanceBuffer = (gl, {matrixInstanceBufferPool}) =>
  _getBufferAndSetBufferMap(gl, matrixInstanceBufferPool);

let _getBufferFromBufferMap = (index: int, bufferMap) =>
  WonderCommonlib.SparseMapService.get(index, bufferMap);

let _addBufferToPool = (geometryIndex, bufferMap, pool) =>
  switch (_getBufferFromBufferMap(geometryIndex, bufferMap)) {
  | Some(buffer) => pool |> ArrayService.push(buffer)
  | None => pool
  };

let addAllBufferToPool =
    (
      {
        boxGeometryVertexBufferMap,
        boxGeometryNormalBufferMap,
        boxGeometryElementArrayBufferMap,
        customGeometryVertexBufferMap,
        customGeometryNormalBufferMap,
        customGeometryElementArrayBufferMap,
        matrixInstanceBufferMap,
        vertexArrayBufferPool,
        elementArrayBufferPool,
        matrixInstanceBufferPool
      }
    ) => {
  boxGeometryVertexBufferMap
  |> SparseMapService.forEachValid(
       [@bs] ((buffer) => vertexArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  boxGeometryNormalBufferMap
  |> SparseMapService.forEachValid(
       [@bs] ((buffer) => vertexArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  boxGeometryElementArrayBufferMap
  |> SparseMapService.forEachValid(
       [@bs] ((buffer) => elementArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  customGeometryVertexBufferMap
  |> SparseMapService.forEachValid(
       [@bs] ((buffer) => vertexArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  customGeometryNormalBufferMap
  |> SparseMapService.forEachValid(
       [@bs] ((buffer) => vertexArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  customGeometryElementArrayBufferMap
  |> SparseMapService.forEachValid(
       [@bs] ((buffer) => elementArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  matrixInstanceBufferMap
  |> SparseMapService.forEachValid(
       [@bs] ((buffer) => matrixInstanceBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  (vertexArrayBufferPool, elementArrayBufferPool, matrixInstanceBufferPool)
};

let _getBufferFromBufferMap = (index: int, bufferMap) =>
  WonderCommonlib.SparseMapService.get(index, bufferMap);

let _addBufferToPool = (geometryIndex, bufferMap, pool) =>
  switch (_getBufferFromBufferMap(geometryIndex, bufferMap)) {
  | Some(buffer) => pool |> ArrayService.push(buffer)
  | None => pool
  };

let addBoxGeometryBufferToPool =
    (
      geometryIndex: int,
      {
        boxGeometryVertexBufferMap,
        boxGeometryNormalBufferMap,
        boxGeometryElementArrayBufferMap,
        vertexArrayBufferPool,
        elementArrayBufferPool
      } as record
    ) => {
  ...record,
  vertexArrayBufferPool:
    vertexArrayBufferPool
    |> _addBufferToPool(geometryIndex, boxGeometryVertexBufferMap)
    |> _addBufferToPool(geometryIndex, boxGeometryNormalBufferMap),
  elementArrayBufferPool:
    elementArrayBufferPool |> _addBufferToPool(geometryIndex, boxGeometryElementArrayBufferMap)
};

let addCustomGeometryBufferToPool =
    (
      geometryIndex: int,
      {
        customGeometryVertexBufferMap,
        customGeometryNormalBufferMap,
        customGeometryElementArrayBufferMap,
        vertexArrayBufferPool,
        elementArrayBufferPool
      } as record
    ) => {
  ...record,
  vertexArrayBufferPool:
    vertexArrayBufferPool
    |> _addBufferToPool(geometryIndex, customGeometryVertexBufferMap)
    |> _addBufferToPool(geometryIndex, customGeometryNormalBufferMap),
  elementArrayBufferPool:
    elementArrayBufferPool |> _addBufferToPool(geometryIndex, customGeometryElementArrayBufferMap)
};

let _unsafeGetBufferFromBufferMap = (index: int, bufferMap) =>
  WonderCommonlib.SparseMapService.unsafeGet(index, bufferMap)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|buffer exist in bufferMap|j},
                   ~actual={j|not|j}
                 ),
                 () => WonderCommonlib.SparseMapService.has(index, bufferMap) |> assertTrue
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );

let addInstanceBufferToPool =
    (sourceInstanceIndex: int, {matrixInstanceBufferMap, matrixInstanceBufferPool} as record) => {
  ...record,
  matrixInstanceBufferPool:
    matrixInstanceBufferPool
    |> ArrayService.push(
         _unsafeGetBufferFromBufferMap(sourceInstanceIndex, matrixInstanceBufferMap)
       )
};