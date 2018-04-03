let render = (gl, indexTuple, state: MainStateDataType.state) =>
  if (JudgeInstanceMainService.isSupportInstance(state)) {
    FrontRenderLightHardwareInstanceJobCommon.render(gl, indexTuple, state)
  } else {
    FrontRenderLightBatchInstanceJobCommon.render(gl, indexTuple, state)
  };