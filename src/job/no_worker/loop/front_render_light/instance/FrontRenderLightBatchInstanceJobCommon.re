let render = (gl, indexTuple, state) =>
  RenderBatchInstanceJobUtils.render(gl, indexTuple, FrontRenderLightJobCommon.render, state);