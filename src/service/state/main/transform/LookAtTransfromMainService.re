open StateDataMainType;

/* TODO test */
let lookAt = (transform, target, {globalTempRecord} as state) => {
  let transformRecord = RecordTransformMainService.getRecord(state);
  let up = (0., 1., 0.);

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