let render = (gl, indexTuple, state: StateDataMainType.state) =>
  if (JudgeInstanceMainService.isSupportInstance(state)) {
    FrontRenderLightHardwareInstanceJobCommon.render(gl, indexTuple, state)
  } else {
    FrontRenderLightBatchInstanceJobCommon.render(gl, indexTuple, state)
  };