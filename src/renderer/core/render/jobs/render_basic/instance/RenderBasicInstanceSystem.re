let render = (gl, uid, state: StateDataType.state) =>
  if (InstanceUtils.isSupportInstance(state)) {
    RenderBasicHardwareInstanceSystem.render(gl, uid, state)
  } else {
    RenderBasicBatchInstanceSystem.render(gl, uid, state)
  };