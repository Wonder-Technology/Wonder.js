open VboBufferType;

let getOrCreateBuffer =
    (gl, geometryIndex: int, bufferMap, createBuffer, getDataFunc, state: StateDataType.state) => {
  let geometryIndexStr = Js.Int.toString(geometryIndex);
  let mappedGeometryIndex =
    GeometryIndexUtils.getMappedIndex(
      geometryIndexStr,
      GeometryIndexUtils.getMappedIndexMap(state)
    );
  let mappedGeometryIndexStr = Js.Int.toString(mappedGeometryIndex);
  switch (WonderCommonlib.HashMapSystem.get(geometryIndexStr, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer =
      [@bs]
      createBuffer(gl, mappedGeometryIndex, [@bs] getDataFunc(mappedGeometryIndex, state), state);
    bufferMap |> WonderCommonlib.HashMapSystem.set(geometryIndexStr, buffer) |> ignore;
    buffer
  }
};

let addBufferToPool = (geometryIndexStr: string, state: StateDataType.state) =>
  VboBufferPoolSystem.addBufferToPool(geometryIndexStr, state);

let initData = () => {
  vertexBufferMap: WonderCommonlib.HashMapSystem.createEmpty(),
  elementArrayBufferMap: WonderCommonlib.HashMapSystem.createEmpty(),
  arrayBufferPool: WonderCommonlib.ArraySystem.createEmpty(),
  elementArrayBufferPool: WonderCommonlib.ArraySystem.createEmpty()
};