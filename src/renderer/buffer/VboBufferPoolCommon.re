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

let getInstanceBuffer = (gl, state: StateDataType.state) => {
  let {modelMatrixInstanceBufferPool} = VboBufferStateUtils.getVboBufferData(state);
  _getBufferAndSetBufferMap(gl, modelMatrixInstanceBufferPool)
};

let _unsafeGetBufferFromBufferMap = (index: int, bufferMap) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(index, bufferMap)
  |> ensureCheck(
       (r) =>
         Contract.Operators.(
           test(
             "buffer should exist in bufferMap",
             () => WonderCommonlib.SparseMapSystem.has(index, bufferMap) |> assertTrue
           )
         )
     );

let addGeometryBufferToPool = (geometryIndex: int, state: StateDataType.state) => {
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

let addInstanceBufferToPool = (sourceInstanceIndex: int, state: StateDataType.state) => {
  let {modelMatrixInstanceBufferMap, modelMatrixInstanceBufferPool} =
    VboBufferStateUtils.getVboBufferData(state);
  modelMatrixInstanceBufferPool
  |> Js.Array.push(
       _unsafeGetBufferFromBufferMap(sourceInstanceIndex, modelMatrixInstanceBufferMap)
     )
  |> ignore;
  state
};