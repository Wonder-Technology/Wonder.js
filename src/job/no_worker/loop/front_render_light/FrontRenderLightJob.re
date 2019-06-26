open StateDataMainType;

let _render = (gl, state: StateDataMainType.state) =>
  switch (state |> OperateRenderMainService.getLightRenderObjectRecord) {
  | None => state
  | Some({
      renderIndexArray,
      transformIndices,
      materialIndices,
      meshRendererIndices,
      geometryIndices,
      sourceInstanceIndices,
    }) =>
    FrontRenderLightJobUtils.render(
      gl,
      (
        renderIndexArray,
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
    AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    state,
  );