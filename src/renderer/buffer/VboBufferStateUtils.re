open VboBufferType;

open StateDataType;

open VboBufferGetStateDataUtils;

let deepCopyState = (state: StateDataType.state) => {
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
  let (vertexArrayBufferPool, elementArrayBufferPool, modelMatrixInstanceBufferPool) =
    VboBufferPoolCommon.addAllBufferToPool(currentState);
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