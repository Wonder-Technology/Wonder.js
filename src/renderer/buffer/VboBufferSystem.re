open VboBufferType;

let getData = (state: StateDataType.state) => state.vboBufferData;

let getOrCreateBuffer =
    (gl, geometryIndex: int, bufferMap, createBuffer, getDataFunc, state: StateDataType.state) => {
  let mappedGeometryIndex =
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(geometryIndex),
      GeometryIndexUtils.getMappedIndexMap(state)
    );
  let mappedGeometryIndexStr = Js.Int.toString(mappedGeometryIndex);
  switch (WonderCommonlib.HashMapSystem.get(mappedGeometryIndexStr, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer =
      [@bs] createBuffer(gl, mappedGeometryIndex, [@bs] getDataFunc(mappedGeometryIndex, state));
    bufferMap |> WonderCommonlib.HashMapSystem.set(mappedGeometryIndexStr, buffer) |> ignore;
    buffer
  }
};

let initData = () => {
  vertexBufferMap: WonderCommonlib.HashMapSystem.createEmpty(),
  indexBufferMap: WonderCommonlib.HashMapSystem.createEmpty()
};