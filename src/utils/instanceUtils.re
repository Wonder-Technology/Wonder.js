let isSupportInstance = (state: StateDataType.state) =>
  GPUDetectSystem.hasExtension(GPUStateSystem.getData(state).extensionInstancedArrays);

let isSourceInstance = (uid, state: StateDataType.state) =>
  GameObjectComponentSystem.hasSourceInstanceComponent(uid, state);