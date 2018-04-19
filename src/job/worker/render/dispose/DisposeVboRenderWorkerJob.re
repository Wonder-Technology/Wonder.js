open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      state.vboBufferRecord =
        state.vboBufferRecord
        |> DisposeVboBufferService.disposeBoxGeometryVboBuffer(
             data##boxGeometryNeedDisposeVboBufferArr
           )
        |> DisposeVboBufferService.disposeBoxGeometryVboBuffer(
             data##customGeometryNeedDisposeVboBufferArr
           );
      e
    }
  );