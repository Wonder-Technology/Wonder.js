open VboBufferType;

let _getBufferAndSetBufferMap = (gl, bufferPool) =>
  switch (bufferPool |> Js.Array.pop) {
  | Some(buffer) => buffer
  | None => WonderWebgl.Gl.createBuffer(gl)
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
        geometryVertexBufferMap,
        geometryTexCoordBufferMap,
        geometryNormalBufferMap,
        geometryElementArrayBufferMap,
        matrixInstanceBufferMap,
        vertexArrayBufferPool,
        elementArrayBufferPool,
        matrixInstanceBufferPool,
      },
    ) => {
  geometryVertexBufferMap
  |> SparseMapService.forEachValid((. buffer) =>
       vertexArrayBufferPool |> Js.Array.push(buffer) |> ignore
     );
  geometryTexCoordBufferMap
  |> SparseMapService.forEachValid((. buffer) =>
       vertexArrayBufferPool |> Js.Array.push(buffer) |> ignore
     );
  geometryNormalBufferMap
  |> SparseMapService.forEachValid((. buffer) =>
       vertexArrayBufferPool |> Js.Array.push(buffer) |> ignore
     );
  geometryElementArrayBufferMap
  |> SparseMapService.forEachValid((. buffer) =>
       elementArrayBufferPool |> Js.Array.push(buffer) |> ignore
     );
  matrixInstanceBufferMap
  |> SparseMapService.forEachValid((. buffer) =>
       matrixInstanceBufferPool |> Js.Array.push(buffer) |> ignore
     );
  (vertexArrayBufferPool, elementArrayBufferPool, matrixInstanceBufferPool);
};

let _getBufferFromBufferMap = (index: int, bufferMap) =>
  WonderCommonlib.SparseMapService.get(index, bufferMap);

let _addBufferToPool = (geometryIndex, bufferMap, pool) =>
  switch (_getBufferFromBufferMap(geometryIndex, bufferMap)) {
  | Some(buffer) => pool |> ArrayService.push(buffer)
  | None => pool
  };

let addGeometryBufferToPool =
  (.
    geometryIndex: int,
    {
      geometryVertexBufferMap,
      geometryTexCoordBufferMap,
      geometryNormalBufferMap,
      geometryElementArrayBufferMap,
      vertexArrayBufferPool,
      elementArrayBufferPool,
    } as record,
  ) => {
    ...record,
    vertexArrayBufferPool:
      vertexArrayBufferPool
      |> _addBufferToPool(geometryIndex, geometryVertexBufferMap)
      |> _addBufferToPool(geometryIndex, geometryTexCoordBufferMap)
      |> _addBufferToPool(geometryIndex, geometryNormalBufferMap),
    elementArrayBufferPool:
      elementArrayBufferPool
      |> _addBufferToPool(geometryIndex, geometryElementArrayBufferMap),
  };

let _unsafeGetBufferFromBufferMap = (index: int, bufferMap) =>
  WonderCommonlib.SparseMapService.unsafeGet(index, bufferMap)
  |> WonderLog.Contract.ensureCheck(
       r =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|buffer exist in bufferMap|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 WonderCommonlib.SparseMapService.has(index, bufferMap)
                 |> assertTrue
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );

let addInstanceBufferToPool =
  (.
    sourceInstanceIndex: int,
    {matrixInstanceBufferMap, matrixInstanceBufferPool} as record,
  ) =>
    switch (
      WonderCommonlib.SparseMapService.get(
        sourceInstanceIndex,
        matrixInstanceBufferMap,
      )
    ) {
    | None => record
    | Some(buffer) => {
        ...record,
        matrixInstanceBufferPool:
          matrixInstanceBufferPool |> ArrayService.push(buffer),
      }
    };