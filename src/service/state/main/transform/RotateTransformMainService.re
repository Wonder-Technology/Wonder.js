open StateDataMainType;

open TransformType;

let rotateLocalOnAxis = (transform, (angle, localAxis), state) => {
  let rot = QuaternionService.setFromAxisAngle(angle, localAxis);
  let {localRotations} as transformRecord =
    state |> RecordTransformMainService.getRecord;

  state.transformRecord =
    Some(
      transformRecord
      |> ModelMatrixTransformService.setLocalRotationByTuple(
           transform,
           QuaternionService.multiply(
             ModelMatrixTransformService.getLocalRotationTuple(
               transform,
               localRotations,
             ),
             rot,
           ),
         ),
    );

  state;
};

let rotateWorldOnAxis = (transform, (angle, localAxis), state) => {
  let rot = QuaternionService.setFromAxisAngle(angle, localAxis);
  let {localRotations} as transformRecord =
    state |> RecordTransformMainService.getRecord;

  state.transformRecord =
    Some(
      transformRecord
      |> ModelMatrixTransformService.setLocalRotationByTuple(
           transform,
           QuaternionService.multiply(
             rot,
             ModelMatrixTransformService.getLocalRotationTuple(
               transform,
               localRotations,
             ),
           ),
         ),
    );

  state;
};