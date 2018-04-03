let render = (gl, indexTuple, state: MainStateDataType.state) =>
  RenderBatchInstanceJobUtils.render(gl, indexTuple, FrontRenderLightJobCommon.render, state);