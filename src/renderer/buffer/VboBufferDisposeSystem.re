open VboBufferType;

open SourceInstanceType;

open ComponentAdmin;

let disposeInstanceBufferData = (sourceInstance: sourceInstance, state: StateDataType.state) => {
  let {matrixInstanceBufferMap} as record = VboBufferGetStateDataUtils.getVboBufferData(state);
  {
    ...state,
    vboBufferRecord: {
      ...record,
      matrixInstanceBufferMap:
        disposeSparseMapData(sourceInstance, matrixInstanceBufferMap)
    }
  }
};