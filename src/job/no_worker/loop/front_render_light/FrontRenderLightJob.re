open StateDataMainType;

let _render = (gl, state: StateDataMainType.state) =>
  switch (state |> OperateRenderMainService.getLightRenderObjectRecord) {
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
    FrontRenderLightJobUtils.render(
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