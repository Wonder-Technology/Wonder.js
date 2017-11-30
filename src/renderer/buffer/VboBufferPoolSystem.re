open VboBufferType;

open Contract;

let _getBufferAndSetBufferMap = (gl, group, bufferPool, bufferMap) =>
  GeometryGroupUtils.isDefaultGroup(group) ?
    switch (bufferPool |> Js.Array.pop) {
    | Some(buffer) => (buffer, true)
    | None => (Gl.createBuffer(gl), true)
    } :
    (
      switch (bufferMap |> WonderCommonlib.SparseMapSystem.get(group)) {
      | Some(buffer) => (buffer, false)
      | None =>
        let buffer = Gl.createBuffer(gl);
        bufferMap |> WonderCommonlib.SparseMapSystem.set(group, buffer);
        (buffer, true)
      }
    );

let getArrayBuffer = (gl, group, state: StateDataType.state) => {
  let {vertexArrayBufferPool, groupVertexArrayBufferMap} =
    VboBufferStateUtils.getVboBufferData(state);
  _getBufferAndSetBufferMap(gl, group, vertexArrayBufferPool, groupVertexArrayBufferMap)
};

let getElementArrayBuffer = (gl, group: int, state: StateDataType.state) => {
  let {elementArrayBufferPool, groupElementArrayBufferMap} =
    VboBufferStateUtils.getVboBufferData(state);
  _getBufferAndSetBufferMap(gl, group, elementArrayBufferPool, groupElementArrayBufferMap)
};

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

/* let _getOrCreatePoolArray = (bufferPool, group) =>
   switch (bufferPool |> WonderCommonlib.HashMapSystem.get(group)) {
   | Some(bufferArray) => bufferArray
   | None =>
     let bufferArray = WonderCommonlib.ArraySystem.createEmpty();
     bufferPool |> WonderCommonlib.HashMapSystem.set(group, bufferArray);
     bufferArray
   }; */
/* let addBufferToPool = (geometryIndex: int, group, state: StateDataType.state) => {
     let {vertexBufferMap, elementArrayBufferMap, vertexArrayBufferPool, elementArrayBufferPool} =
       VboBufferStateUtils.getVboBufferData(state);
     _getOrCreatePoolArray(vertexArrayBufferPool, group)
     |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, vertexBufferMap))
     |> ignore;
     _getOrCreatePoolArray(elementArrayBufferPool, group)
     |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, elementArrayBufferMap))
     |> ignore;
     state
   }; */
let addBufferToPool = (geometryIndex: int, state: StateDataType.state) => {
  let {vertexBufferMap, elementArrayBufferMap, vertexArrayBufferPool, elementArrayBufferPool} =
    VboBufferStateUtils.getVboBufferData(state);
  vertexArrayBufferPool
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, vertexBufferMap))
  |> ignore;
  elementArrayBufferPool
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, elementArrayBufferMap))
  |> ignore;
  state
};