let render = (gl, uid, state: MainStateDataType.state) =>
  if (JudgeInstanceMainService.isSupportInstance(state)) {
    RenderBasicHardwareInstanceJobCommon.render(gl, uid, state)
  } else {
    RenderBasicBatchInstanceJobCommon.render(gl, uid, state)
  };