open StateDataRenderWorkerType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      state.vboBufferRecord =
        DisposeVboBufferService.disposeGeometryVboBuffer(
          data##boxGeometryNeedDisposeVboBufferArr,
          state.vboBufferRecord
        );
      e
    }
  );