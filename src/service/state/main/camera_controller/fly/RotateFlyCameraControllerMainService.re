open StateDataMainType;

open OperateFlyCameraControllerService;

let getLocalEulerAngleOrInit =
    (transformComponent, {flyCameraControllerRecord} as state) =>
  switch (getLocalEulerAngle(transformComponent, flyCameraControllerRecord)) {
  | Some((x, y, z)) => ((x, y, z), state)
  | None =>
    let localEulerAngle =
      ModelMatrixTransformService.getLocalEulerAnglesTuple(
        transformComponent,
        RecordTransformMainService.getRecord(state).localRotations,
      );

    let flyCameraControllerRecord =
      flyCameraControllerRecord
      |> setLocalEulerAngle(transformComponent, localEulerAngle);

    (localEulerAngle, {...state, flyCameraControllerRecord});
  };

let getLocalEulerAngleWithDiffValueAndSetToMap =
    (
      transformComponent,
      (diffX, diffY),
      {flyCameraControllerRecord} as state,
    ) => {
  let ((x, y, z), state) =
    getLocalEulerAngleOrInit(transformComponent, state);

  let flyCameraControllerRecord =
    flyCameraControllerRecord
    |> setLocalEulerAngle(transformComponent, (x -. diffX, y -. diffY, z));

  (
    getLocalEulerAngle(transformComponent, flyCameraControllerRecord)
    |> OptionService.unsafeGet,
    {...state, flyCameraControllerRecord},
  );
};