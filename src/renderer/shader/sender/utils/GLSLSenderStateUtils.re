open StateDataType;

let getGLSLSenderData = (state: StateDataType.state) => state.glslSenderData;

let deepCopyStateForRestore = (state: StateDataType.state) =>
  /* let {
       attributeSendDataMap,
       instanceAttributeSendDataMap,
       uniformCacheMap,
       uniformSendNoCachableDataMap,
       uniformSendCachableDataMap,
       shaderUniformSendNoCachableDataMap,
       instanceUniformSendNoCachableDataMap,
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
         uniformSendNoCachableDataMap: uniformSendNoCachableDataMap |> SparseMapSystem.copy,
         uniformSendCachableDataMap: uniformSendCachableDataMap |> SparseMapSystem.copy,
         shaderUniformSendNoCachableDataMap:
           shaderUniformSendNoCachableDataMap |> SparseMapSystem.copy,
         instanceUniformSendNoCachableDataMap:
           instanceUniformSendNoCachableDataMap |> SparseMapSystem.copy,
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
    uniformSendNoCachableDataMap,
    uniformSendCachableDataMap,
    shaderUniformSendNoCachableDataMap,
    shaderUniformSendCachableFunctionDataMap,
    instanceUniformSendNoCachableDataMap
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
      uniformSendNoCachableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformSendNoCachableDataMap
        ),
      uniformSendCachableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformSendCachableDataMap
        ),
      shaderUniformSendNoCachableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          shaderUniformSendNoCachableDataMap
        ),
      /* TODO test */
      shaderUniformSendCachableFunctionDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          shaderUniformSendCachableFunctionDataMap
        ),
      instanceUniformSendNoCachableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          instanceUniformSendNoCachableDataMap
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