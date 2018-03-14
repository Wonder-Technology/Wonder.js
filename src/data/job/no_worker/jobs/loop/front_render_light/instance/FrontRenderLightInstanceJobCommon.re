let render = (gl, uid, state: MainStateDataType.state) =>
  if (JudgeInstanceMainService.isSupportInstance(state)) {
    FrontRenderLightHardwareInstanceJobCommon.render(gl, uid, state)
  } else {
    FrontRenderLightBatchInstanceJobCommon.render(gl, uid, state)
  };