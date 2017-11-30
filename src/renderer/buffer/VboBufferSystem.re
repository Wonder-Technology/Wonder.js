open VboBufferType;

let getOrCreateBuffer =
    (
      gl,
      geometryIndex: int,
      mappedGeometryIndex: int,
      geometryGroup:string,
      bufferMap,
      createBuffer,
      getDataFunc,
      state: StateDataType.state
    ) =>
  switch (WonderCommonlib.SparseMapSystem.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer =
      [@bs]
      createBuffer(gl, geometryGroup, [@bs] getDataFunc(mappedGeometryIndex, state), state);
    bufferMap |> WonderCommonlib.SparseMapSystem.set(geometryIndex, buffer) |> ignore;
    buffer
  };

let addBufferToPool = (geometryIndex: int, geometryGroup, state: StateDataType.state) =>
  VboBufferPoolSystem.addBufferToPool(geometryIndex, geometryGroup, state);

let initData = () => {
  vertexBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  elementArrayBufferMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  arrayBufferPool: WonderCommonlib.HashMapSystem.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.HashMapSystem.createEmpty()
};