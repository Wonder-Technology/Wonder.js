let isSupportInstance = (state: StateDataType.state) =>
  GPUDetectSystem.hasExtension(GPUStateUtils.getGpuDetectData(state).extensionInstancedArrays);

let isSourceInstance = (uid, state: StateDataType.state) =>
  GameObjectAdminAci2.hasSourceInstanceComponent(uid, state);