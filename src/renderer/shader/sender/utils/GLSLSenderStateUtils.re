open StateDataType;

let getGLSLSenderData = (state: StateDataType.state) => state.glslSenderData;

let deepCopyStateForRestore = (state: StateDataType.state) =>
  /* let {
       attributeSendDataMap,
       instanceAttributeSendDataMap,
       uniformCacheMap,
       uniformRenderObjectSendModelDataMap,
       uniformRenderObjectSendMaterialDataMap,
       uniformShaderSendNoCachableDataMap,
       uniformInstanceSendNoCachableDataMap,
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
         uniformRenderObjectSendModelDataMap: uniformRenderObjectSendModelDataMap |> SparseMapSystem.copy,
         uniformRenderObjectSendMaterialDataMap: uniformRenderObjectSendMaterialDataMap |> SparseMapSystem.copy,
         uniformShaderSendNoCachableDataMap:
           uniformShaderSendNoCachableDataMap |> SparseMapSystem.copy,
         uniformInstanceSendNoCachableDataMap:
           uniformInstanceSendNoCachableDataMap |> SparseMapSystem.copy,
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
    uniformRenderObjectSendModelDataMap,
    uniformRenderObjectSendMaterialDataMap,
    uniformShaderSendNoCachableDataMap,
    uniformShaderSendCachableDataMap,
    uniformShaderSendCachableFunctionDataMap,
    uniformInstanceSendNoCachableDataMap
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
      uniformRenderObjectSendModelDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformRenderObjectSendModelDataMap
        ),
      uniformRenderObjectSendMaterialDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformRenderObjectSendMaterialDataMap
        ),
      uniformShaderSendNoCachableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformShaderSendNoCachableDataMap
        ),
      /* TODO test */
      uniformShaderSendCachableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformShaderSendCachableDataMap
        ),
      uniformShaderSendCachableFunctionDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformShaderSendCachableFunctionDataMap
        ),
      uniformInstanceSendNoCachableDataMap:
        ShaderRestoreFromStateUtils.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformInstanceSendNoCachableDataMap
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