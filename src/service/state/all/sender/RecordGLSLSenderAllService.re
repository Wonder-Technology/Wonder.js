open GLSLSenderType;

let create = () => {
  attributeSendDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  instanceAttributeSendDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  uniformCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
  uniformRenderObjectSendModelDataMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  uniformRenderObjectSendMaterialDataMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  uniformShaderSendNoCachableDataMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  uniformShaderSendCachableDataMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  uniformShaderSendCachableFunctionDataMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  uniformInstanceSendNoCachableDataMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  uniformNoMaterialShaderSendCachableDataMap:
    WonderCommonlib.SparseMapService.createEmpty(),
  /* drawPointsFuncMap: WonderCommonlib.SparseMapService.createEmpty(), */
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
    uniformShaderSendNoCachableDataMap |> SparseMapService.copy,
  uniformShaderSendCachableDataMap:
    uniformShaderSendCachableDataMap |> SparseMapService.copy,
  uniformShaderSendCachableFunctionDataMap:
    uniformShaderSendCachableFunctionDataMap |> SparseMapService.copy,
};