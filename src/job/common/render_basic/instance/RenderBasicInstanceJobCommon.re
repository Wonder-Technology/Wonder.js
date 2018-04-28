let render = (gl, indexTuple, state) =>
  if (JudgeInstanceRenderService.isSupportInstance(state)) {
    RenderBasicHardwareInstanceJobCommon.render(gl, indexTuple, state)
  } else {
    RenderBasicBatchInstanceJobCommon.render(gl, indexTuple, state)
  };