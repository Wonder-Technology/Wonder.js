open VboBufferType;

open StateDataType;

let restore = (currentState, targetState) => {
  let (vertexArrayBufferPool, elementArrayBufferPool, matrixInstanceBufferPool) =
    PoolVboBufferService.addAllBufferToPool(currentState.vboBufferRecord);
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