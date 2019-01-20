open GLSLSenderType;

let create = () => {
  attributeSendDataMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  instanceAttributeSendDataMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
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
  /* lastSendGeometryData: None */
};

/* TODO fix: copy all map! */
let deepCopyForRestore =
    (
      {
        uniformShaderSendNoCachableDataMap,
        uniformShaderSendCachableDataMap,
        uniformShaderSendCachableFunctionDataMap,
      } as record,
    ) => {
  ...record,
  uniformShaderSendNoCachableDataMap:
    uniformShaderSendNoCachableDataMap |> WonderCommonlib.MutableSparseMapService.copy,
  uniformShaderSendCachableDataMap:
    uniformShaderSendCachableDataMap |> WonderCommonlib.MutableSparseMapService.copy,
  uniformShaderSendCachableFunctionDataMap:
    uniformShaderSendCachableFunctionDataMap |> WonderCommonlib.MutableSparseMapService.copy,
};