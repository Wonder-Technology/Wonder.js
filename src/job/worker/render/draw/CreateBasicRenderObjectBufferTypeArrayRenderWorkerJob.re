open StateDataRenderWorkerType;

open RenderWorkerRenderType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    switch (IsRenderUtils.isRender(data)) {
    | false => e
    | true =>
      let basicRenderData = data##renderData##basic;
      let (
        transformIndices,
        materialIndices,
        meshRendererIndices,
        geometryIndices,
        sourceInstanceIndices,
      ) =
        CreateTypeArrayRenderObjectService.createTypeArrays(
          basicRenderData##buffer,
          basicRenderData##bufferCount,
        );
      state.renderRecord.basicRenderObjectRecord =
        Some({
          renderArray: basicRenderData##renderArray,
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