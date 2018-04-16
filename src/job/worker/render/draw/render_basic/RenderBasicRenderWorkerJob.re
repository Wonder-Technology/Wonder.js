open StateDataRenderWorkerType;

let _render = (gl, state) =>
  switch (state |> OperateRenderRenderWorkerService.getBasicRenderObjectRecord) {
  | None => state
  | Some({
      count,
      transformIndices,
      materialIndices,
      shaderIndices,
      geometryIndices,
      geometryTypes,
      sourceInstanceIndices
    }) =>
    RenderBasicJobUtils.render(
      gl,
      (
        count,
        transformIndices,
        materialIndices,
        shaderIndices,
        geometryIndices,
        geometryTypes,
        sourceInstanceIndices
      ),
      CreateRenderStateRenderWorkerService.createRenderState(state)
    )
    |> ignore;
    state
  };

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      switch (IsRenderUtils.isRender(MessageService.getRecord(e))) {
      | false => e
      | true =>
        let gl = [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
        _render(gl, state) |> ignore;
        CommitGlService.commit(gl);
        e
      }
    }
  );