open VboBufferType;

open StateDataType;

open VboBufferGetStateDataUtils;

let deepCopyStateForRestore = (state: StateDataType.state) => {
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

let restore = (currentState, targetState) => {
  let (vertexArrayBufferPool, elementArrayBufferPool, modelMatrixInstanceBufferPool) =
    VboBufferPoolCommon.addAllBufferToPool(currentState);
  {
    ...targetState,
    vboBufferData: {
      vertexBufferMap: [||],
      elementArrayBufferMap: [||],
      modelMatrixInstanceBufferMap: [||],
      vertexArrayBufferPool,
      elementArrayBufferPool,
      modelMatrixInstanceBufferPool
    }
  }
};