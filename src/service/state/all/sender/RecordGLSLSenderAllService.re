open AllGLSLSenderType;

let create = () => {
  attributeSendDataMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  instanceAttributeSendDataMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  uniformCacheMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  uniformRenderObjectSendModelDataMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  uniformRenderObjectSendMaterialDataMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  uniformShaderSendNoCachableDataMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  uniformShaderSendCachableDataMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  uniformShaderSendCachableFunctionDataMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  uniformInstanceSendNoCachableDataMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  uniformNoMaterialShaderSendCachableDataMap:
    WonderCommonlib.MutableSparseMapService.createEmpty(),
  /* drawPointsFuncMap: WonderCommonlib.MutableSparseMapService.createEmpty(), */
  vertexAttribHistoryArray: WonderCommonlib.ArrayService.createEmpty(),
  lastSendMaterialData: None,
  lastSendGeometryData: None,
};

let deepCopyForRestore =
    (
      {
        attributeSendDataMap,
        instanceAttributeSendDataMap,
        uniformRenderObjectSendModelDataMap,
        uniformRenderObjectSendMaterialDataMap,
        uniformShaderSendNoCachableDataMap,
        uniformShaderSendCachableDataMap,
        uniformShaderSendCachableFunctionDataMap,
        uniformInstanceSendNoCachableDataMap,
        uniformNoMaterialShaderSendCachableDataMap,
      } as record,
    ) => {
  ...record,
  attributeSendDataMap:
    attributeSendDataMap |> WonderCommonlib.MutableSparseMapService.copy,
  instanceAttributeSendDataMap:
    instanceAttributeSendDataMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  uniformRenderObjectSendModelDataMap:
    uniformRenderObjectSendModelDataMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  uniformRenderObjectSendMaterialDataMap:
    uniformRenderObjectSendMaterialDataMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  uniformShaderSendNoCachableDataMap:
    uniformShaderSendNoCachableDataMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  uniformShaderSendCachableDataMap:
    uniformShaderSendCachableDataMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  uniformShaderSendCachableFunctionDataMap:
    uniformShaderSendCachableFunctionDataMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  uniformInstanceSendNoCachableDataMap:
    uniformInstanceSendNoCachableDataMap
    |> WonderCommonlib.MutableSparseMapService.copy,
  uniformNoMaterialShaderSendCachableDataMap:
    uniformNoMaterialShaderSendCachableDataMap
    |> WonderCommonlib.MutableSparseMapService.copy,
};