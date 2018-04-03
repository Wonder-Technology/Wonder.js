let render = (gl, indexTuple, state: MainStateDataType.state) =>
  if (JudgeInstanceMainService.isSupportInstance(state)) {
    RenderBasicHardwareInstanceJobCommon.render(gl, indexTuple, state)
  } else {
    RenderBasicBatchInstanceJobCommon.render(gl, indexTuple, state)
  };