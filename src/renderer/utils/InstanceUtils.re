let isSupportInstance = (state: StateDataType.state) =>
  GpuConfigSystem.getConfig(state).useHardwareInstance
  && GPUDetectSystem.hasExtension(GPUStateUtils.getGpuDetectData(state).extensionInstancedArrays);

let isSourceInstance = (uid, state: StateDataType.state) =>
  HasComponentGameObjectService.hasSourceInstanceComponent(uid, state.gameObjectRecord);