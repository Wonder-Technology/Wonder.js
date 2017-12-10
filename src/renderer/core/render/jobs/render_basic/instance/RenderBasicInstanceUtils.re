let render = (gl, uid, state: StateDataType.state) =>
  if (InstanceUtils.isSupportInstance(state)) {
    RenderBasicHardwareInstanceUtils.render(gl, uid, state)
  } else {
    RenderBasicBatchInstanceUtils.render(gl, uid, state)
  };