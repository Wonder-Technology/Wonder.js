let isSupportInstance = (state: StateDataType.state) =>
  GpuConfigSystem.getConfig(state).useHardwareInstance
  && GPUDetectSystem.hasExtension(GPUStateUtils.getGpuDetectData(state).extensionInstancedArrays);

let isSourceInstance = (uid, state: StateDataType.state) =>
  GameObjectAdminAci2.hasSourceInstanceComponent(uid, state);