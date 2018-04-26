open StateDataRenderWorkerType;

let isSupportInstance = (state) =>
  JudgeInstanceService.isSupportInstance(
    OperateRenderWorkerSettingService.unsafeGetGPU(state.settingRecord).useHardwareInstance,
    state.gpuDetectRecord
  );