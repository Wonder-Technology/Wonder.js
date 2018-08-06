open StateDataMainType;

let _render = (gl, state: StateDataMainType.state) =>
  switch (state |> OperateRenderMainService.getBasicRenderObjectRecord) {
  | None => state
  | Some({
      renderArray,
      transformIndices,
      materialIndices,
      meshRendererIndices,
      geometryIndices,
      sourceInstanceIndices,
    }) =>
    RenderBasicJobUtils.render(
      gl,
      (
        renderArray,
        transformIndices,
        materialIndices,
        meshRendererIndices,
        geometryIndices,
        sourceInstanceIndices,
      ),
      CreateRenderStateMainService.createRenderState(state),
    )
    |> ignore;
    state;
  };

let execJob = (flags, state) =>
  _render(
    DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    state,
  );