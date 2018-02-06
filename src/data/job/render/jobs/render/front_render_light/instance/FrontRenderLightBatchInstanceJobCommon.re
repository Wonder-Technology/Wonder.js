let render = (gl, uid, state: StateDataType.state) =>
  RenderBatchInstanceJobUtils.render(gl, uid, FrontRenderLightJobCommon.render, state);