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