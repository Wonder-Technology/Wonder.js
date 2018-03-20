open GPUDetectType;

type renderWorkerState = {
  mutable gpuDetectRecord,
  mutable deviceManagerRecord: DeviceManagerType.deviceManagerRecord
};

type renderWorkerStateData = {mutable state: option(renderWorkerState)};