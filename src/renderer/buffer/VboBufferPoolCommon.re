open VboBufferType;

open Contract;

let _getBufferAndSetBufferMap = (gl, bufferPool) =>
  switch (bufferPool |> Js.Array.pop) {
  | Some(buffer) => buffer
  | None => Gl.createBuffer(gl)
  };

let getArrayBuffer = (gl, state: StateDataType.state) => {
  let {vertexArrayBufferPool} = VboBufferGetStateDataUtils.getVboBufferData(state);
  _getBufferAndSetBufferMap(gl, vertexArrayBufferPool)
};

let getElementArrayBuffer = (gl, state: StateDataType.state) => {
  let {elementArrayBufferPool} = VboBufferGetStateDataUtils.getVboBufferData(state);
  _getBufferAndSetBufferMap(gl, elementArrayBufferPool)
};

let getInstanceBuffer = (gl, state: StateDataType.state) => {
  let {modelMatrixInstanceBufferPool} = VboBufferGetStateDataUtils.getVboBufferData(state);
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
    VboBufferGetStateDataUtils.getVboBufferData(state);
  vertexArrayBufferPool
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, vertexBufferMap))
  |> ignore;
  elementArrayBufferPool
  |> Js.Array.push(_unsafeGetBufferFromBufferMap(geometryIndex, elementArrayBufferMap))
  |> ignore;
  state
};

let addAllBufferToPool = (state: StateDataType.state) => {
  let {
    vertexBufferMap,
    elementArrayBufferMap,
    modelMatrixInstanceBufferMap,
    vertexArrayBufferPool,
    elementArrayBufferPool,
    modelMatrixInstanceBufferPool
  } =
    VboBufferGetStateDataUtils.getVboBufferData(state);
  vertexBufferMap
  |> SparseMapSystem.forEachValid(
       [@bs] ((buffer) => vertexArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  elementArrayBufferMap
  |> SparseMapSystem.forEachValid(
       [@bs] ((buffer) => elementArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  modelMatrixInstanceBufferMap
  |> SparseMapSystem.forEachValid(
       [@bs] ((buffer) => modelMatrixInstanceBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  (vertexArrayBufferPool, elementArrayBufferPool, modelMatrixInstanceBufferPool)
};

let addInstanceBufferToPool = (sourceInstanceIndex: int, state: StateDataType.state) => {
  let {modelMatrixInstanceBufferMap, modelMatrixInstanceBufferPool} =
    VboBufferGetStateDataUtils.getVboBufferData(state);
  modelMatrixInstanceBufferPool
  |> Js.Array.push(
       _unsafeGetBufferFromBufferMap(sourceInstanceIndex, modelMatrixInstanceBufferMap)
     )
  |> ignore;
  state
};