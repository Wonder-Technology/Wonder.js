open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.getState(stateData);
      state.glslRecord.precision =
        Some(PrecisionAllService.getPrecisionSource(state.gpuDetectRecord, state.glslChunkRecord));
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );