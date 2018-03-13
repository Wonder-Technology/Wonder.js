open VboBufferType;

let _getBufferFromBufferMap = (index: int, bufferMap) =>
  WonderCommonlib.SparseMapSystem.get(index, bufferMap);

let _addBufferToPool = (geometryIndex, bufferMap, pool) =>
  switch (_getBufferFromBufferMap(geometryIndex, bufferMap)) {
  | Some(buffer) => pool |> ArrayService.push(buffer)
  | None => pool
  };

let addGeometryBufferToPool =
    (
      geometryIndex: int,
      {
        vertexBufferMap,
        normalBufferMap,
        elementArrayBufferMap,
        vertexArrayBufferPool,
        elementArrayBufferPool
      } as record
    ) => {
  ...record,
  vertexArrayBufferPool:
    vertexArrayBufferPool
    |> _addBufferToPool(geometryIndex, vertexBufferMap)
    |> _addBufferToPool(geometryIndex, normalBufferMap),
  elementArrayBufferPool:
    elementArrayBufferPool |> _addBufferToPool(geometryIndex, elementArrayBufferMap)
};

let _unsafeGetBufferFromBufferMap = (index: int, bufferMap) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(index, bufferMap)
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
                 () => WonderCommonlib.SparseMapSystem.has(index, bufferMap) |> assertTrue
               )
             )
           )
         ),
       StateData.stateData.isDebug
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