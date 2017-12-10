let isSupportInstance = (state: StateDataType.state) =>
  GPUDetectSystem.hasExtension(GPUStateUtils.getData(state).extensionInstancedArrays);

let isSourceInstance = (uid, state: StateDataType.state) =>
  GameObjectAci2.hasSourceInstanceComponent(uid, state);