open AllGPUDetectType;

let isSupportInstance = (useHardwareInstance, gpuDetectRecord) =>
  useHardwareInstance && AllGPUDetectService.hasExtension(gpuDetectRecord.extensionInstancedArrays);

let unsafeGetIsSourceInstance = (materialIndex, isSourceInstanceMap) =>
  isSourceInstanceMap |> WonderCommonlib.MutableSparseMapService.unsafeGet(materialIndex);