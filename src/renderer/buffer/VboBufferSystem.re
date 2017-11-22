open VboBufferType;

let getData = (state: StateDataType.state) => state.vboBufferData;

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
      [@bs] createBuffer(gl, mappedGeometryIndex, [@bs] getDataFunc(mappedGeometryIndex, state));
    bufferMap |> WonderCommonlib.HashMapSystem.set(geometryIndexStr, buffer) |> ignore;
    buffer
  }
};

let initData = () => {
  vertexBufferMap: WonderCommonlib.HashMapSystem.createEmpty(),
  indexBufferMap: WonderCommonlib.HashMapSystem.createEmpty()
};