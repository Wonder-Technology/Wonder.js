open VboBufferType;

open StateDataType;

open VboBufferGetStateDataUtils;

let deepCopyForRestore = (state: StateDataType.state) => {
  ...state,
  vboBufferRecord: {
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
    vboBufferRecord: {
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