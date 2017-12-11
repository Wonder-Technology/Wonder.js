let render = (gl, uid, state: StateDataType.state) =>
  if (InstanceUtils.isSupportInstance(state)) {
    RenderBasicHardwareInstanceJobCommon.render(gl, uid, state)
  } else {
    RenderBasicBatchInstanceJobCommon.render(gl, uid, state)
  };