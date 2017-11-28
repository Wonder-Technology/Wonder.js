open VboBufferType;

open Contract;

let _getBuffer = (gl, geometryDataGroup: string, bufferPool, state: StateDataType.state) =>
  switch (bufferPool |> WonderCommonlib.HashMapSystem.get(geometryDataGroup)) {
  | Some(bufferArray) =>
    switch (bufferArray |> Js.Array.pop) {
    | Some(buffer) => (buffer, false)
    | None => (Gl.createBuffer(gl), true)
    }
  | None => (Gl.createBuffer(gl), true)
  };

let getArrayBuffer = (gl, geometryDataGroup: string, state: StateDataType.state) =>
  _getBuffer(
    gl,
    geometryDataGroup,
    VboBufferStateUtils.getVboBufferData(state).arrayBufferPool,
    state
  );

let getElementArrayBuffer = (gl, geometryDataGroup: string, state: StateDataType.state) =>
  _getBuffer(
    gl,
    geometryDataGroup,
    VboBufferStateUtils.getVboBufferData(state).elementArrayBufferPool,
    state
  );

let _unsafeGetBufferFromBufferMap = (geometryIndex: int, bufferMap) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(geometryIndex, bufferMap)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "buffer should exist in bufferMap",
             () => WonderCommonlib.SparseMapSystem.has(geometryIndex, bufferMap) |> assertTrue
           )
         )
     );

let _getOrCreatePoolArray = (bufferPool, geometryDataGroup) =>
  switch (bufferPool |> WonderCommonlib.HashMapSystem.get(geometryDataGroup)) {
  | Some(bufferArray) => bufferArray
  | None =>
    let bufferArray = WonderCommonlib.ArraySystem.createEmpty();
    bufferPool |> WonderCommonlib.HashMapSystem.set(geometryDataGroup, bufferArray);
    bufferArray
  };

let addBufferToPool = (geometryIndex: int, geometryDataGroup, state: StateDataType.state) => {
  let {vertexBufferMap, elementArrayBufferMap, arrayBufferPool, elementArrayBufferPool} =
    VboBufferStateUtils.getVboBufferData(state);
  _getOrCreatePoolArray(arrayBufferPool, geometryDataGroup)
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, vertexBufferMap))
  |> ignore;
  _getOrCreatePoolArray(elementArrayBufferPool, geometryDataGroup)
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, elementArrayBufferMap))
  |> ignore;
  state
};