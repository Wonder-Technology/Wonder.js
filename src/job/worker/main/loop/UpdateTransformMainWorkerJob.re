open StateDataMainType;

open TransformType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {globalTempRecord} as state = StateDataMainService.unsafeGetState(stateData);
      let {index} as transformRecord = RecordTransformMainService.getRecord(state);
      state.transformRecord =
        Some(UpdateTransformJobUtils.execJob(index, globalTempRecord, transformRecord));
      None
    }
  );