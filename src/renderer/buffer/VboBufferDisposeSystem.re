open GeometryType;

open VboBufferType;

open SourceInstanceType;

open ComponentAdmin;

let disposeGeometryBufferData = (geometry: geometry, state: StateDataType.state) => {
  let {vertexBufferMap, elementArrayBufferMap} = VboBufferGetStateDataUtils.getVboBufferData(state);
  disposeSparseMapData(geometry, vertexBufferMap) |> ignore;
  disposeSparseMapData(geometry, elementArrayBufferMap) |> ignore;
  state
};

let disposeInstanceBufferData = (sourceInstance: sourceInstance, state: StateDataType.state) => {
  let {modelMatrixInstanceBufferMap} = VboBufferGetStateDataUtils.getVboBufferData(state);
  disposeSparseMapData(sourceInstance, modelMatrixInstanceBufferMap) |> ignore;
  state
};