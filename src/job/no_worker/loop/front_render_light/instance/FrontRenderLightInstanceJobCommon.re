open StateRenderType;

let render = (gl, indexTuple, state) =>
  if (JudgeInstanceRenderService.isSupportInstance(state)) {
    FrontRenderLightHardwareInstanceJobCommon.render(gl, indexTuple, state)
  } else {
    FrontRenderLightBatchInstanceJobCommon.render(gl, indexTuple, state)
  };