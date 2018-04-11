open StateDataRenderWorkerType;

open RenderWorkerRenderType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let basicRenderData = data##renderData##basic;
      let (
        transformIndices,
        materialIndices,
        shaderIndices,
        geometryIndices,
        sourceInstanceIndices,
        geometryTypes
      ) =
        CreateTypeArrayRenderObjectService.createTypeArrays(
          basicRenderData##buffer,
          basicRenderData##count
        );

      state.renderRecord.basicRenderObjectRecord =
        Some({
          /* renderArray: basicRenderData##renderArray, */
          count: basicRenderData##count,
          transformIndices,
          materialIndices,
          shaderIndices,
          geometryIndices,
          sourceInstanceIndices,
          geometryTypes
        });
      e
    }
  );