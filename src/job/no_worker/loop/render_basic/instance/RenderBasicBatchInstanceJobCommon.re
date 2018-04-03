let render = (gl, indexTuple, state: MainStateDataType.state) =>
  RenderBatchInstanceJobUtils.render(gl, indexTuple, RenderBasicJobCommon.render, state);