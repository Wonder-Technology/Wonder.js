open VboBufferType;

let getOrCreateBuffer =
    (
      gl,
      geometryIndex: int,
      mappedGeometryIndex: int,
      bufferMap,
      createBuffer,
      getDataFunc,
      state: StateDataType.state
    ) =>
  switch (SparseMapSystem.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer =
      [@bs]
      createBuffer(gl, mappedGeometryIndex, [@bs] getDataFunc(mappedGeometryIndex, state), state);
    bufferMap |> SparseMapSystem.set(geometryIndex, buffer) |> ignore;
    buffer
  };

let addBufferToPool = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferPoolSystem.addBufferToPool(geometryIndex, state);

let initData = () => {
  vertexBufferMap: SparseMapSystem.createEmpty(),
  elementArrayBufferMap: SparseMapSystem.createEmpty(),
  arrayBufferPool: WonderCommonlib.ArraySystem.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty()
};