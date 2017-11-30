open VboBufferType;

open Contract;

let _getBufferAndSetBufferMap = (gl, bufferPool) =>
  switch (bufferPool |> Js.Array.pop) {
  | Some(buffer) => buffer
  | None => Gl.createBuffer(gl)
  };

let getArrayBuffer = (gl, state: StateDataType.state) => {
  let {vertexArrayBufferPool} = VboBufferStateUtils.getVboBufferData(state);
  _getBufferAndSetBufferMap(gl, vertexArrayBufferPool)
};

let getElementArrayBuffer = (gl, state: StateDataType.state) => {
  let {elementArrayBufferPool} = VboBufferStateUtils.getVboBufferData(state);
  _getBufferAndSetBufferMap(gl, elementArrayBufferPool)
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