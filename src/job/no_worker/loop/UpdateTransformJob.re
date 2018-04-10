open StateDataMainType;

open TransformType;

let execJob = (_, {globalTempRecord} as state) => {
  let {index} as transformRecord = RecordTransformMainService.getRecord(state);
  {
    ...state,
    transformRecord:
      Some(
        ArrayService.range(0, index - 1)
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             (
               (transformRecord, transform) =>
                 transformRecord |> UpdateTransformMainService.update(transform, globalTempRecord)
             ),
             transformRecord
           )
      )
  }
};