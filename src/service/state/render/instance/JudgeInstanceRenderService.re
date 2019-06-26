open StateRenderType;

let isSupportInstance = (state) =>
  JudgeAllInstanceService.isSupportInstance(
    OperateRenderSettingService.unsafeGetGPU(state.settingRecord).useHardwareInstance,
    state.gpuDetectRecord
  );