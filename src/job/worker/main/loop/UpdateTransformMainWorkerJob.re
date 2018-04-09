/* TODO duplicate */
open StateDataMainType;

open TransformType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {globalTempRecord} as state = StateDataMainService.unsafeGetState(stateData);
      let {index} as transformRecord = RecordTransformMainService.getRecord(state);
      state.transformRecord =
        Some(
          ArrayService.range(0, index - 1)
          |> WonderCommonlib.ArrayService.reduceOneParam(
               [@bs]
               (
                 (transformRecord, transform) =>
                   transformRecord
                   |> UpdateTransformMainService.update(transform, globalTempRecord)
               ),
               transformRecord
             )
        );
      None
    }
  );