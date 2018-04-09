open StateDataRenderWorkerType;

open RenderWorkerRenderType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let cameraData = data##renderData##camera;
      state.renderRecord.cameraRecord =
        Some({
          vMatrix: cameraData##vMatrix,
          pMatrix: cameraData##pMatrix,
          position: cameraData##position
        });
      e
    }
  );