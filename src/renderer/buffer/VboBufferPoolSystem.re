open VboBufferType;

open Contract;

let _getBuffer = (gl, bufferPool, state: StateDataType.state) =>
  switch (bufferPool |> Js.Array.pop) {
  | Some(buffer) => buffer
  | None =>
    let buffer = Gl.createBuffer(gl);
    /* bufferPool |> Js.Array.push(buffer) |> ignore; */
    buffer
  };

let getArrayBuffer = (gl, state: StateDataType.state) =>
  /* let {arrayBufferPool} = VboBufferStateUtils.getVboBufferData(state);
     switch (bufferPool |> Js.Array.pop) {
     | Some(buffer) => buffer
     | None =>
       let buffer = Gl.createBuffer(gl);
       bufferPool |> Js.Array.push(buffer) |> ignore;
       buffer
     } */
  _getBuffer(gl, VboBufferStateUtils.getVboBufferData(state).arrayBufferPool, state);

let getElementArrayBuffer = (gl, state: StateDataType.state) =>
  _getBuffer(gl, VboBufferStateUtils.getVboBufferData(state).elementArrayBufferPool, state);

let _unsafeGetBufferFromBufferMap = (geometryIndexStr: string, bufferMap) =>
  WonderCommonlib.HashMapSystem.unsafeGet(geometryIndexStr, bufferMap)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "buffer should exist in bufferMap",
             () => HashMapSystem.has(geometryIndexStr, bufferMap) |> assertTrue
           )
         )
     );

let addBufferToPool = (geometryIndexStr: string, state: StateDataType.state) => {
  let {vertexBufferMap, elementArrayBufferMap, arrayBufferPool, elementArrayBufferPool} =
    VboBufferStateUtils.getVboBufferData(state);
  arrayBufferPool
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndexStr, vertexBufferMap))
  |> ignore;
  elementArrayBufferPool
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndexStr, elementArrayBufferMap))
  |> ignore;
  state
};