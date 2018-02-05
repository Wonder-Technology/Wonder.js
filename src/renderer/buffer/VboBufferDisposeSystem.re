open GeometryType;

open VboBufferType;

open SourceInstanceType;

open ComponentAdmin;

let disposeGeometryBufferData = (geometry: geometry, state: StateDataType.state) => {
  open StateDataType;
  let {vertexBufferMap, normalBufferMap, elementArrayBufferMap} as data =
    VboBufferGetStateDataUtils.getVboBufferData(state);
  {
    ...state,
    vboBufferData: {
      ...data,
      vertexBufferMap: disposeSparseMapData(geometry, vertexBufferMap),
      normalBufferMap: disposeSparseMapData(geometry, normalBufferMap),
      elementArrayBufferMap: disposeSparseMapData(geometry, elementArrayBufferMap)
    }
  }
};

let disposeInstanceBufferData = (sourceInstance: sourceInstance, state: StateDataType.state) => {
  let {matrixInstanceBufferMap} as data = VboBufferGetStateDataUtils.getVboBufferData(state);
  {
    ...state,
    vboBufferData: {
      ...data,
      matrixInstanceBufferMap:
        disposeSparseMapData(sourceInstance, matrixInstanceBufferMap)
    }
  }
};