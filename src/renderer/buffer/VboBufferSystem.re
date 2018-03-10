open VboBufferType;

let getOrCreateBuffer =
    (gl, (geometryIndex: int, bufferMap), (createBuffer, getDataFunc), state: StateDataType.state) =>
  switch (WonderCommonlib.SparseMapSystem.get(geometryIndex, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer = [@bs] createBuffer(gl, [@bs] getDataFunc(geometryIndex, state), state);
    bufferMap |> WonderCommonlib.SparseMapSystem.set(geometryIndex, buffer) |> ignore;
    buffer
  };

let addGeometryBufferToPool = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferPoolCommon.addGeometryBufferToPool(geometryIndex, state);

let addInstanceBufferToPool = (sourceInstanceIndex: int, state: StateDataType.state) =>
  VboBufferPoolCommon.addInstanceBufferToPool(sourceInstanceIndex, state);

let deepCopyForRestore = VboBufferStateUtils.deepCopyForRestore;

let restore = VboBufferStateUtils.restore;