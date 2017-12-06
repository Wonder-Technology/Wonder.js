let isSupportInstance = (state: StateDataType.state) =>
  GPUDetectSystem.hasExtension(GPUStateSystem.getData(state).extensionInstancedArrays);