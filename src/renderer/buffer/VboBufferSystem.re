open VboBufferType;

let getOrCreateBuffer =
    (gl, geometryIndex: int, bufferMap, createBuffer, getDataFunc, state: StateDataType.state) => {
  let geometryIndexStr = Js.Int.toString(geometryIndex);
  let mappedGeometryIndex =
    GeometryIndexUtils.getMappedIndex(
      geometryIndexStr,
      GeometryIndexUtils.getMappedIndexMap(state)
    );
  switch (SparseMapSystem.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer =
      [@bs]
      createBuffer(gl, mappedGeometryIndex, [@bs] getDataFunc(mappedGeometryIndex, state), state);
    bufferMap |> SparseMapSystem.set(geometryIndex, buffer) |> ignore;
    buffer
  }
};

let addBufferToPool = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferPoolSystem.addBufferToPool(geometryIndex, state);

let initData = () => {
  vertexBufferMap: SparseMapSystem.createEmpty(),
  elementArrayBufferMap: SparseMapSystem.createEmpty(),
  arrayBufferPool: WonderCommonlib.ArraySystem.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty()
};