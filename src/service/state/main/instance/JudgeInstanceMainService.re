let isSupportInstance = (state: MainStateDataType.state) =>
  GpuConfigSystem.getConfig(state).useHardwareInstance
  && GPUDetectService.hasExtension(state.gpuDetectRecord.extensionInstancedArrays);

let isSourceInstance = (uid, state: MainStateDataType.state) =>
  HasComponentGameObjectService.hasSourceInstanceComponent(uid, state.gameObjectRecord);