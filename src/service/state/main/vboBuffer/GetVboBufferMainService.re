open VboBufferType;

let getOrCreateBuffer = (gl, (geometryIndex: int, bufferMap), (createBuffer, getDataFunc), state) =>
  switch (WonderCommonlib.SparseMapSystem.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer = [@bs] createBuffer(gl, [@bs] getDataFunc(geometryIndex, state), state);
    bufferMap |> WonderCommonlib.SparseMapSystem.set(geometryIndex, buffer) |> ignore;
    buffer
  };