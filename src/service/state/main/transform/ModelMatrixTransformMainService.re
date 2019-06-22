open StateDataMainType;

let setLocalEulerAnglesByTuple = (transform, eulerAngles, state) => {
  let transformRecord =
    ModelMatrixTransformService.setLocalEulerAnglesByTuple(
      transform,
      eulerAngles,
      RecordTransformMainService.getRecord(state),
    );

  state;
};