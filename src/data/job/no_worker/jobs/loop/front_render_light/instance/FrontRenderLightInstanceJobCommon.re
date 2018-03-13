let render = (gl, uid, state: StateDataType.state) =>
  if (JudgeInstanceService.isSupportInstance(state)) {
    FrontRenderLightHardwareInstanceJobCommon.render(gl, uid, state)
  } else {
    FrontRenderLightBatchInstanceJobCommon.render(gl, uid, state)
  };