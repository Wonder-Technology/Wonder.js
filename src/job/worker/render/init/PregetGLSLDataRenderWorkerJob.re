open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(
    () => {
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      state.glslRecord.precision =
        Some(PrecisionAllService.getPrecisionSource(state.gpuDetectRecord, state.glslChunkRecord));
      StateRenderWorkerService.setState(stateData, state);
      e
    }
  );