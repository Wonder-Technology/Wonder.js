open StateDataType;

let getGLSLSenderData = (state: StateDataType.state) => state.glslSenderData;

let deepCopyStateForRestore = (state: StateDataType.state) =>
  /* let {
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
     }*/
  state;

let restore = (intersectShaderIndexDataArray, currentState, targetState) => {
  let {
    attributeSendDataMap,
    instanceAttributeSendDataMap,
    uniformCacheMap,
    uniformSendNoCacheableDataMap,
    uniformSendCacheableDataMap,
    shaderUniformSendNoCacheableDataMap,
    instanceUniformSendNoCacheableDataMap
    /* drawPointsFuncMap */
  } =
    getGLSLSenderData(currentState);
  {
    ...targetState,
    /* glslSenderData: GLSLSenderHelper.initData() */
    glslSenderData: {
      attributeSendDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          attributeSendDataMap
        ),
      instanceAttributeSendDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          instanceAttributeSendDataMap
        ),
      uniformCacheMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformCacheMap
        ),
      uniformSendNoCacheableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformSendNoCacheableDataMap
        ),
      uniformSendCacheableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformSendCacheableDataMap
        ),
      shaderUniformSendNoCacheableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          shaderUniformSendNoCacheableDataMap
        ),
      instanceUniformSendNoCacheableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          instanceUniformSendNoCacheableDataMap
        ),
      /* drawPointsFuncMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          drawPointsFuncMap
        ), */
      vertexAttribHistoryArray: WonderCommonlib.ArraySystem.createEmpty(),
      lastSendArrayBuffer: None,
      lastSendElementArrayBuffer: None,
      lastSendMaterial: None
    }
  }
};