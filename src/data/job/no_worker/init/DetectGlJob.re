open MainStateDataType;

let execJob = (_, state) => {
  ...state,
  gpuDetectRecord:
    state.gpuDetectRecord
    |> GPUDetectService.detect([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord))
};