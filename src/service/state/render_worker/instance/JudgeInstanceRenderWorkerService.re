open StateDataRenderWorkerType;

let isSupportInstance = (state) =>
  JudgeAllInstanceService.isSupportInstance(
    OperateRenderWorkerSettingService.unsafeGetGPU(state.settingRecord).useHardwareInstance,
    state.gpuDetectRecord
  );