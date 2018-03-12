open VboBufferType;

open SourceInstanceType;

open ComponentAdmin;

let disposeInstanceBufferData = (sourceInstance: sourceInstance, state: StateDataType.state) => {
  let {matrixInstanceBufferMap} as data = VboBufferGetStateDataUtils.getVboBufferData(state);
  {
    ...state,
    vboBufferRecord: {
      ...data,
      matrixInstanceBufferMap:
        disposeSparseMapData(sourceInstance, matrixInstanceBufferMap)
    }
  }
};