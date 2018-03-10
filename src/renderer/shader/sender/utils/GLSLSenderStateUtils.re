open StateDataType;

let getGLSLSenderData = (state: StateDataType.state) => state.glslSenderData;

let deepCopyForRestore = (state: StateDataType.state) => state;

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
    /* glslSenderData: GLSLSenderHelper.create() */
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
      lastSendMaterial: None,
      lastSendGeometry: None
    }
  }
};