open MainStateDataType;

let isSupportInstance = (state: MainStateDataType.state) =>
  OperateSettingService.unsafeGetGPU(state.settingRecord).useHardwareInstance
  && GPUDetectService.hasExtension(state.gpuDetectRecord.extensionInstancedArrays);

let isSourceInstance = (uid, state: MainStateDataType.state) =>
  HasComponentGameObjectService.hasSourceInstanceComponent(uid, state.gameObjectRecord);