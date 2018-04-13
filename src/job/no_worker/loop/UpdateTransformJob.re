open StateDataMainType;

open TransformType;

let execJob = (_, {globalTempRecord} as state) => {
  let {index} as transformRecord = RecordTransformMainService.getRecord(state);
  {
    ...state,
    transformRecord:
      Some(UpdateTransformJobUtils.execJob(index, globalTempRecord, transformRecord))
  }
};