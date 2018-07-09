open StateDataMainType;

let lookAt = (~transform, ~target, ~state, ~up=(0., 1., 0.), ()) => {
  let {globalTempRecord} = state;
  let transformRecord = RecordTransformMainService.getRecord(state);

  state.transformRecord =
    Matrix4Service.setLookAt(
      UpdateTransformMainService.updateAndGetPositionTuple(
        transform,
        globalTempRecord,
        transformRecord,
      ),
      target,
      up,
    )
    |> QuaternionService.setFromMatrix
    |> UpdateTransformMainService.updateAndSetRotationByTuple(
         transform,
         _,
         globalTempRecord,
         transformRecord,
       )
    |. Some;

  state;
};