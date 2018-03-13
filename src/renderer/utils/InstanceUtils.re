let isSupportInstance = (state: StateDataType.state) =>
  GpuConfigSystem.getConfig(state).useHardwareInstance
  && GPUDetectService.hasExtension(state.gpuDetectRecord.extensionInstancedArrays);

let isSourceInstance = (uid, state: StateDataType.state) =>
  HasComponentGameObjectService.hasSourceInstanceComponent(uid, state.gameObjectRecord);