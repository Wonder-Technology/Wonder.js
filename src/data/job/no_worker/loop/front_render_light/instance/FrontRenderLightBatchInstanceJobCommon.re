let render = (gl, uid, state: MainStateDataType.state) =>
  RenderBatchInstanceJobUtils.render(gl, uid, FrontRenderLightJobCommon.render, state);