open GPUDetectReWoType;

type renderWorkerState = {
  gpuDetectData,
  deviceManagerData: DeviceManagerReWoType.deviceManagerData
};

type renderWorkerStateData = {mutable state: option(renderWorkerState)};