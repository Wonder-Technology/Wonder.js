open VboBufferType;

let getData = (state: StateDataType.state) => state.vboBufferData;

let getOrCreateBuffer =
    (gl, geometryIndex: int, bufferMap, createBuffer, getDataFunc, state: StateDataType.state) => {
  let geometryIndexStr = Js.Int.toString(geometryIndex);
  switch (WonderCommonlib.HashMapSystem.get(geometryIndexStr, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer = [@bs] createBuffer(gl, geometryIndex, [@bs] getDataFunc(geometryIndex, state));
    bufferMap |> WonderCommonlib.HashMapSystem.set(geometryIndexStr, buffer) |> ignore;
    buffer
  }
};

let initData = () => {
  vertexBufferMap: WonderCommonlib.HashMapSystem.createEmpty(),
  indexBufferMap: WonderCommonlib.HashMapSystem.createEmpty()
};