open VboBufferType;

open MainStateDataType;

let restore = (currentState, targetState) => {
  let (vertexArrayBufferPool, elementArrayBufferPool, matrixInstanceBufferPool) =
    PoolVboBufferService.addAllBufferToPool(currentState.vboBufferRecord);
  {
    ...targetState,
    vboBufferRecord: {
      boxGeometryVertexBufferMap: [||],
      boxGeometryNormalBufferMap: [||],
      boxGeometryElementArrayBufferMap: [||],
      customGeometryVertexBufferMap: [||],
      customGeometryNormalBufferMap: [||],
      customGeometryElementArrayBufferMap: [||],
      matrixInstanceBufferMap: [||],
      vertexArrayBufferPool,
      elementArrayBufferPool,
      matrixInstanceBufferPool
    }
  }
};