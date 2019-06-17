open AllVboBufferType;

open StateDataMainType;

let restore = (currentState, targetState) => {
  let (vertexArrayBufferPool, elementArrayBufferPool, matrixInstanceBufferPool) =
    PoolVboBufferService.addAllBufferToPool(currentState.vboBufferRecord);
  {
    ...targetState,
    vboBufferRecord: {
      geometryVertexBufferMap: [||],
      geometryTexCoordBufferMap: [||],
      geometryNormalBufferMap: [||],
      geometryElementArrayBufferMap: [||],
      matrixInstanceBufferMap: [||],
      vertexArrayBufferPool,
      elementArrayBufferPool,
      matrixInstanceBufferPool
    }
  }
};