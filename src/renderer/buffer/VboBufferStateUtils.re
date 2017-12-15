open VboBufferType;

open StateDataType;

let getVboBufferData = (state: StateDataType.state) => state.vboBufferData;

let deepCopyState = (state: StateDataType.state) => {
  /* let {vertexBufferMap, elementArrayBufferMap, modelMatrixInstanceBufferMap} =
     state |> getVboBufferData; */
  ...state,
  vboBufferData: {
    vertexBufferMap: [||],
    elementArrayBufferMap: [||],
    modelMatrixInstanceBufferMap: [||],
    vertexArrayBufferPool: [||],
    elementArrayBufferPool: [||],
    modelMatrixInstanceBufferPool: [||]
  }
};

let restoreFromState = (currentState, targetState) => {
  let {vertexArrayBufferPool, elementArrayBufferPool, modelMatrixInstanceBufferPool} =
    getVboBufferData(currentState);
  {
    ...targetState,
    vboBufferData: {
      /* ...getVboBufferData(targetState), */
      vertexBufferMap: [||],
      elementArrayBufferMap: [||],
      modelMatrixInstanceBufferMap: [||],
      vertexArrayBufferPool,
      elementArrayBufferPool,
      modelMatrixInstanceBufferPool
    }
  }
};