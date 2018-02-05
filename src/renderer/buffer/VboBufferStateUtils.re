open VboBufferType;

open StateDataType;

open VboBufferGetStateDataUtils;

let deepCopyStateForRestore = (state: StateDataType.state) => {
  ...state,
  vboBufferData: {
    vertexBufferMap: [||],
    normalBufferMap: [||],
    elementArrayBufferMap: [||],
    matrixInstanceBufferMap: [||],
    vertexArrayBufferPool: [||],
    elementArrayBufferPool: [||],
    matrixInstanceBufferPool: [||]
  }
};

let restore = (currentState, targetState) => {
  let (
    vertexArrayBufferPool,
    elementArrayBufferPool,
    matrixInstanceBufferPool
  ) =
    VboBufferPoolCommon.addAllBufferToPool(currentState);
  {
    ...targetState,
    vboBufferData: {
      vertexBufferMap: [||],
      normalBufferMap: [||],
      elementArrayBufferMap: [||],
      matrixInstanceBufferMap: [||],
      vertexArrayBufferPool,
      elementArrayBufferPool,
      matrixInstanceBufferPool
    }
  }
};