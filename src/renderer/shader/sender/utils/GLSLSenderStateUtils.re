open StateDataType;

let getGLSLSenderData = (state: StateDataType.state) => state.glslSenderData;

let deepCopyState = (state: StateDataType.state) => {
  let {
    attributeSendDataMap,
    instanceAttributeSendDataMap,
    uniformCacheMap,
    uniformSendNoCacheableDataMap,
    uniformSendCacheableDataMap,
    shaderUniformSendNoCacheableDataMap,
    instanceUniformSendNoCacheableDataMap,
    drawPointsFuncMap,
    vertexAttribHistoryArray
  } =
    state |> getGLSLSenderData;
  {
    ...state,
    glslSenderData: {
      attributeSendDataMap: attributeSendDataMap |> SparseMapSystem.copy,
      instanceAttributeSendDataMap: instanceAttributeSendDataMap |> SparseMapSystem.copy,
      uniformCacheMap: uniformCacheMap |> SparseMapSystem.copy,
      uniformSendNoCacheableDataMap: uniformSendNoCacheableDataMap |> SparseMapSystem.copy,
      uniformSendCacheableDataMap: uniformSendCacheableDataMap |> SparseMapSystem.copy,
      shaderUniformSendNoCacheableDataMap:
        shaderUniformSendNoCacheableDataMap |> SparseMapSystem.copy,
      instanceUniformSendNoCacheableDataMap:
        instanceUniformSendNoCacheableDataMap |> SparseMapSystem.copy,
      drawPointsFuncMap: drawPointsFuncMap |> SparseMapSystem.copy,
      vertexAttribHistoryArray: vertexAttribHistoryArray |> SparseMapSystem.copy,
      lastSendArrayBuffer: None,
      lastSendElementArrayBuffer: None,
      lastSendMaterial: None
    }
  }
};

let restoreFromState = (currentState, targetState) => {
  ...targetState,
  glslSenderData: {
    ...getGLSLSenderData(targetState),
    lastSendArrayBuffer: None,
    lastSendElementArrayBuffer: None,
    lastSendMaterial: None
  }
};