open MainStateDataType;

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
    currentState.glslSenderRecord;
  {
    ...targetState,
    glslSenderRecord: {
      attributeSendDataMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          attributeSendDataMap
        ),
      instanceAttributeSendDataMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          instanceAttributeSendDataMap
        ),
      uniformCacheMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformCacheMap
        ),
      uniformRenderObjectSendModelDataMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformRenderObjectSendModelDataMap
        ),
      uniformRenderObjectSendMaterialDataMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformRenderObjectSendMaterialDataMap
        ),
      uniformShaderSendNoCachableDataMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformShaderSendNoCachableDataMap
        ),
      uniformShaderSendCachableDataMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformShaderSendCachableDataMap
        ),
      uniformShaderSendCachableFunctionDataMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformShaderSendCachableFunctionDataMap
        ),
      uniformInstanceSendNoCachableDataMap:
        RestoreShaderFromStateService.getIntersectShaderRelatedMap(
          intersectShaderIndexDataArray,
          uniformInstanceSendNoCachableDataMap
        ),
      /* drawPointsFuncMap:
         RestoreShaderFromStateService.getIntersectShaderRelatedMap(
           intersectShaderIndexDataArray,
           drawPointsFuncMap
         ), */
      vertexAttribHistoryArray: WonderCommonlib.ArrayService.createEmpty(),
      lastSendMaterial: None,
      lastSendGeometry: None
    }
  }
};