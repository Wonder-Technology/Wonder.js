open VboBufferType;

let getOrCreateBuffer = (gl, (geometryIndex: int, bufferMap), (createBuffer, getDataFunc), state) =>
  switch (WonderCommonlib.SparseMapService.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer = [@bs] createBuffer(gl, [@bs] getDataFunc(geometryIndex, state), state);
    bufferMap |> WonderCommonlib.SparseMapService.set(geometryIndex, buffer) |> ignore;
    buffer
  };