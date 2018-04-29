open StateDataRenderWorkerType;

open RenderWorkerRenderType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      switch (IsRenderUtils.isRender(data)) {
      | false => e
      | true =>
        let lightRenderData = data##renderData##light;
        let (
          transformIndices,
          materialIndices,
          geometryIndices,
          sourceInstanceIndices,
          geometryTypes
        ) =
          CreateTypeArrayRenderObjectService.createTypeArrays(
            lightRenderData##buffer,
            lightRenderData##bufferCount
          );
        state.renderRecord.lightRenderObjectRecord =
          Some({
            count: lightRenderData##count,
            transformIndices,
            materialIndices,
            geometryIndices,
            sourceInstanceIndices,
            geometryTypes
          });
      StateRenderWorkerService.setState(stateData, state);
        e
      }
    }
  );