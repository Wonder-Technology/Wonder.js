open StateDataMainType;

open TransformType;

let execJob = (_, {globalTempRecord} as state) => {
  let {index} as transformRecord = RecordTransformMainService.getRecord(state);
  for (i in 0 to index - 1) {
    transformRecord |> UpdateTransformMainService.update(i, globalTempRecord) |> ignore
  };
  {...state, transformRecord: Some(transformRecord)}
};