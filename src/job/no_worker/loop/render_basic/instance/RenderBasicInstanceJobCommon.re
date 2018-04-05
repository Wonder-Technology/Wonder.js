let render = (gl, indexTuple, state: StateDataMainType.state) =>
  if (JudgeInstanceMainService.isSupportInstance(state)) {
    RenderBasicHardwareInstanceJobCommon.render(gl, indexTuple, state)
  } else {
    RenderBasicBatchInstanceJobCommon.render(gl, indexTuple, state)
  };