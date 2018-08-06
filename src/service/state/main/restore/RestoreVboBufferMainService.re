open VboBufferType;

open StateDataMainType;

let restore = (currentState, targetState) => {
  let (vertexArrayBufferPool, elementArrayBufferPool, matrixInstanceBufferPool) =
    PoolVboBufferService.addAllBufferToPool(currentState.vboBufferRecord);
  {
    ...targetState,
    vboBufferRecord: {
      customGeometryVertexBufferMap: [||],
      customGeometryTexCoordBufferMap: [||],
      customGeometryNormalBufferMap: [||],
      customGeometryElementArrayBufferMap: [||],
      matrixInstanceBufferMap: [||],
      vertexArrayBufferPool,
      elementArrayBufferPool,
      matrixInstanceBufferPool
    }
  }
};