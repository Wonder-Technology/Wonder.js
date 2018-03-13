open VboBufferType;

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
  let {matrixInstanceBufferPool} = VboBufferGetStateDataUtils.getVboBufferData(state);
  _getBufferAndSetBufferMap(gl, matrixInstanceBufferPool)
};

let _getBufferFromBufferMap = (index: int, bufferMap) =>
  WonderCommonlib.SparseMapSystem.get(index, bufferMap);

let _addBufferToPool = (geometryIndex, bufferMap, pool) =>
  switch (_getBufferFromBufferMap(geometryIndex, bufferMap)) {
  | Some(buffer) => pool |> ArrayService.push(buffer)
  | None => pool
  };

let addAllBufferToPool = (state: StateDataType.state) => {
  let {
    vertexBufferMap,
    normalBufferMap,
    elementArrayBufferMap,
    matrixInstanceBufferMap,
    vertexArrayBufferPool,
    elementArrayBufferPool,
    matrixInstanceBufferPool
  } =
    VboBufferGetStateDataUtils.getVboBufferData(state);
  vertexBufferMap
  |> SparseMapSystem.forEachValid(
       [@bs] ((buffer) => vertexArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  normalBufferMap
  |> SparseMapSystem.forEachValid(
       [@bs] ((buffer) => vertexArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  elementArrayBufferMap
  |> SparseMapSystem.forEachValid(
       [@bs] ((buffer) => elementArrayBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  matrixInstanceBufferMap
  |> SparseMapSystem.forEachValid(
       [@bs] ((buffer) => matrixInstanceBufferPool |> Js.Array.push(buffer) |> ignore)
     );
  (vertexArrayBufferPool, elementArrayBufferPool, matrixInstanceBufferPool)
};