open StateDataMainType;

let _render = (gl, state: StateDataMainType.state) =>
  switch (state |> OperateRenderMainService.getBasicRenderObjectRecord) {
  | None => state
  | Some({
      count,
      transformIndices,
      materialIndices,
      meshRendererIndices,
      geometryIndices,
      geometryTypes,
      sourceInstanceIndices,
    }) =>
    RenderBasicJobUtils.render(
      gl,
      (
        count,
        transformIndices,
        materialIndices,
        meshRendererIndices,
        geometryIndices,
        geometryTypes,
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