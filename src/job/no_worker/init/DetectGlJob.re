open StateDataMainType;

let execJob = (_, state) => {
  ...state,
  gpuDetectRecord:
    state.gpuDetectRecord
    |> AllGPUDetectService.detect(
         [@bs] AllDeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
       )
};