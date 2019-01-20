open VboBufferType;

open StateRenderType;

let getOrCreateBuffer =
    (
      gl,
      (geometryIndex: int, bufferMap),
      (createBufferFunc, getDataFunc),
      state,
    ) =>
  switch (WonderCommonlib.MutableSparseMapService.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer =
      createBufferFunc(. gl, getDataFunc(. geometryIndex, state), state);
    bufferMap
    |> WonderCommonlib.MutableSparseMapService.set(geometryIndex, buffer)
    |> ignore;
    buffer;
  };

let getOrCreateIndexBuffer =
    (gl, (geometryIndex: int, bufferMap, indices), createBufferFunc, state) =>
  switch (WonderCommonlib.MutableSparseMapService.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer = createBufferFunc(. gl, indices, state);
    bufferMap
    |> WonderCommonlib.MutableSparseMapService.set(geometryIndex, buffer)
    |> ignore;
    buffer;
  };