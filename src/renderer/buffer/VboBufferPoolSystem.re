open VboBufferType;

open Contract;

let _getBuffer = (gl, geometryGroup: string, bufferPool, state: StateDataType.state) =>
  switch (bufferPool |> WonderCommonlib.HashMapSystem.get(geometryGroup)) {
  | Some(bufferArray) =>
    switch (bufferArray |> Js.Array.pop) {
    | Some(buffer) => (buffer, false)
    | None => (Gl.createBuffer(gl), true)
    }
  | None => (Gl.createBuffer(gl), true)
  };

let getArrayBuffer = (gl, geometryGroup: string, state: StateDataType.state) =>
  _getBuffer(
    gl,
    geometryGroup,
    VboBufferStateUtils.getVboBufferData(state).arrayBufferPool,
    state
  );

let getElementArrayBuffer = (gl, geometryGroup: string, state: StateDataType.state) =>
  _getBuffer(
    gl,
    geometryGroup,
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

let _getOrCreatePoolArray = (bufferPool, geometryGroup) =>
  switch (bufferPool |> WonderCommonlib.HashMapSystem.get(geometryGroup)) {
  | Some(bufferArray) => bufferArray
  | None =>
    let bufferArray = WonderCommonlib.ArraySystem.createEmpty();
    bufferPool |> WonderCommonlib.HashMapSystem.set(geometryGroup, bufferArray);
    bufferArray
  };

let addBufferToPool = (geometryIndex: int, geometryGroup, state: StateDataType.state) => {
  let {vertexBufferMap, elementArrayBufferMap, arrayBufferPool, elementArrayBufferPool} =
    VboBufferStateUtils.getVboBufferData(state);
  _getOrCreatePoolArray(arrayBufferPool, geometryGroup)
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, vertexBufferMap))
  |> ignore;
  _getOrCreatePoolArray(elementArrayBufferPool, geometryGroup)
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, elementArrayBufferMap))
  |> ignore;
  state
};