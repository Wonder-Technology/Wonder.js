open AllVboBufferType;

open StateRenderType;

let getOrCreateBuffer =
    (
      gl,
      (geometryIndex: int, bufferMap),
      (createBufferFunc, getDataFunc),
      state,
    ) => {
  let (has, buffer) =
    MutableSparseMapService.fastGet(geometryIndex, bufferMap);

  has ?
    buffer :
    {
      let buffer =
        createBufferFunc(. gl, getDataFunc(. geometryIndex, state), state);
      bufferMap
      |> WonderCommonlib.MutableSparseMapService.set(geometryIndex, buffer)
      |> ignore;
      buffer;
    };
};

let getOrCreateIndexBuffer =
    (
      gl,
      (geometryIndex: int, bufferMap, getDataFunc),
      createBufferFunc,
      state,
    ) => {
  let (has, buffer) =
    MutableSparseMapService.fastGet(geometryIndex, bufferMap);

  has ?
    buffer :
    {
      let buffer =
        createBufferFunc(. gl, getDataFunc(. geometryIndex, state), state);
      bufferMap
      |> WonderCommonlib.MutableSparseMapService.set(geometryIndex, buffer)
      |> ignore;
      buffer;
    };
};