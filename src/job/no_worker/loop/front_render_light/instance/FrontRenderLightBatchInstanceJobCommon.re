let render = (gl, indexTuple, state: StateDataMainType.state) =>
  RenderBatchInstanceJobUtils.render(gl, indexTuple, FrontRenderLightJobCommon.render, state);