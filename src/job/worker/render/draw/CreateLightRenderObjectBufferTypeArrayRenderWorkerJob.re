open StateDataRenderWorkerType;

open RenderWorkerRenderType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    switch (IsRenderUtils.isRender(data)) {
    | false => e
    | true =>
      let lightRenderData = data##renderData##light;
      let (
        transformIndices,
        materialIndices,
        meshRendererIndices,
        geometryIndices,
        sourceInstanceIndices,
      ) =
        CreateTypeArrayAllRenderObjectService.createTypeArrays(
          lightRenderData##buffer,
          lightRenderData##bufferCount,
        );
      state.renderRecord.lightRenderObjectRecord =
        Some({
          renderIndexArray: lightRenderData##renderIndexArray,
          transformIndices,
          materialIndices,
          meshRendererIndices,
          geometryIndices,
          sourceInstanceIndices,
        });
      StateRenderWorkerService.setState(stateData, state);
      e;
    };
  });