open StateRenderType;

let isSupportInstance = (state) =>
  JudgeInstanceService.isSupportInstance(
    OperateRenderSettingService.unsafeGetGPU(state.settingRecord).useHardwareInstance,
    state.gpuDetectRecord
  );