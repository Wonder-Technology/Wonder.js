open GPUDetectType;

let isSupportInstance = (useHardwareInstance, gpuDetectRecord) =>
  useHardwareInstance && GPUDetectService.hasExtension(gpuDetectRecord.extensionInstancedArrays);

let unsafeGetIsSourceInstance = (materialIndex, isSourceInstanceMap) =>
  isSourceInstanceMap |> WonderCommonlib.SparseMapService.unsafeGet(materialIndex);