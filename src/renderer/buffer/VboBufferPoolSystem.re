open VboBufferType;

open Contract;

let _getBuffer = (gl, bufferPool, state: StateDataType.state) =>
  switch (bufferPool |> Js.Array.pop) {
  | Some(buffer) => buffer
  | None => Gl.createBuffer(gl)
  };

let getArrayBuffer = (gl, state: StateDataType.state) =>
  _getBuffer(gl, VboBufferStateUtils.getVboBufferData(state).arrayBufferPool, state);

let getElementArrayBuffer = (gl, state: StateDataType.state) =>
  _getBuffer(gl, VboBufferStateUtils.getVboBufferData(state).elementArrayBufferPool, state);

let _unsafeGetBufferFromBufferMap = (geometryIndex: int, bufferMap) =>
  SparseMapSystem.unsafeGet(geometryIndex, bufferMap)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "buffer should exist in bufferMap",
             () => SparseMapSystem.has(geometryIndex, bufferMap) |> assertTrue
           )
         )
     );

let addBufferToPool = (geometryIndex: int, state: StateDataType.state) => {
  let {vertexBufferMap, elementArrayBufferMap, arrayBufferPool, elementArrayBufferPool} =
    VboBufferStateUtils.getVboBufferData(state);
  arrayBufferPool
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, vertexBufferMap))
  |> ignore;
  elementArrayBufferPool
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, elementArrayBufferMap))
  |> ignore;
  state
};