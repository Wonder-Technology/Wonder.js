open VboBufferType;

open StateRenderType;

let getOrCreateBuffer =
    (
      gl,
      (geometryIndex: int, bufferMap),
      (createBufferFunc, getDataFunc),
      state,
    ) =>
  switch (WonderCommonlib.SparseMapService.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer =
      createBufferFunc(. gl, getDataFunc(. geometryIndex, state), state);
    bufferMap
    |> WonderCommonlib.SparseMapService.set(geometryIndex, buffer)
    |> ignore;
    buffer;
  };

let getOrCreateNormalBuffer =
    (
      gl,
      (geometryIndex: int, bufferMap),
      createBufferFunc,
      {customGeometryRecord} as state,
    ) =>
  switch (WonderCommonlib.SparseMapService.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer =
      createBufferFunc(.
        gl,
        NormalsRenderCustomGeometryService.hasNormals(
          geometryIndex,
          customGeometryRecord,
        ) ?
          GetCustomGeometryNormalsRenderService.getNormals(.
            geometryIndex,
            state,
          ) :
          ComputeCustomGeometryNormalsRenderService.computeVertexNormals(
            geometryIndex,
            state,
          ),
        state,
      );
    bufferMap
    |> WonderCommonlib.SparseMapService.set(geometryIndex, buffer)
    |> ignore;
    buffer;
  };