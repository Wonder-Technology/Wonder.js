open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    state.vboBufferRecord =
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeCustomGeometryVboBuffer(
           data##customGeometryNeedDisposeVboBufferArr,
         )
      |> DisposeVboBufferService.disposeSourceInstanceVboBuffer(
           data##sourceInstanceNeedDisposeVboBufferArr,
         );
    StateRenderWorkerService.setState(stateData, state);
    e;
  });