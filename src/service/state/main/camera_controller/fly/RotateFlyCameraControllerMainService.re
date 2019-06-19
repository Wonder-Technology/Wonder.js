open StateDataMainType;

open OperateFlyCameraControllerService;

let _setLocalEulerAngleFieldWhenNotExistInMap =
    (
      transformComponent,
      (valueInEngineState, valueInMap),
      setFunc,
      flyCameraControllerRecord,
    ) =>
  switch (valueInMap) {
  | None =>
    setFunc(transformComponent, valueInEngineState, flyCameraControllerRecord)
  | _ => flyCameraControllerRecord
  };

let _getLocalEulerAngle =
    (
      (valueXInMap, valueYInMap, valueZInMap),
      (valueXInEngineState, valueYInEngineState, valueZInEngineState),
    ) => (
  switch (valueXInMap) {
  | None => valueXInEngineState
  | Some(value) => value
  },
  switch (valueYInMap) {
  | None => valueYInEngineState
  | Some(value) => value
  },
  switch (valueZInMap) {
  | None => valueZInEngineState
  | Some(value) => value
  },
);

let getLocalEulerAngleOrInit =
    (transformComponent, {flyCameraControllerRecord} as state) =>
  switch (
    getLocalEulerAngleX(transformComponent, flyCameraControllerRecord),
    getLocalEulerAngleY(transformComponent, flyCameraControllerRecord),
    getLocalEulerAngleZ(transformComponent, flyCameraControllerRecord),
  ) {
  | (Some(x), Some(y), Some(z)) => ((x, y, z), state)
  | (valueX, valueY, valueZ) =>
    let (ex, ey, ez) =
      ModelMatrixTransformService.getLocalEulerAnglesTuple(
        transformComponent,
        RecordTransformMainService.getRecord(state).localRotations,
      );

    let flyCameraControllerRecord =
      flyCameraControllerRecord
      |> _setLocalEulerAngleFieldWhenNotExistInMap(
           transformComponent,
           (ex, valueX),
           setLocalEulerAngleX,
         )
      |> _setLocalEulerAngleFieldWhenNotExistInMap(
           transformComponent,
           (ey, valueY),
           setLocalEulerAngleY,
         )
      |> _setLocalEulerAngleFieldWhenNotExistInMap(
           transformComponent,
           (ez, valueZ),
           setLocalEulerAngleZ,
         );

    (
      _getLocalEulerAngle((valueX, valueY, valueZ), (ex, ey, ez)),
      {...state, flyCameraControllerRecord},
    );
  };

let setAndGetLocalEulerAngleWithDiffValue =
    (
      transformComponent,
      (diffX, diffY, diffZ),
      {flyCameraControllerRecord} as state,
    ) => {
  let ((x, y, z), state) =
    getLocalEulerAngleOrInit(transformComponent, state);

  let flyCameraControllerRecord =
    flyCameraControllerRecord
    |> setLocalEulerAngleX(transformComponent, x -. diffX)
    |> setLocalEulerAngleY(transformComponent, y -. diffY)
    |> setLocalEulerAngleZ(transformComponent, z -. diffZ);

  (
    (
      getLocalEulerAngleX(transformComponent, flyCameraControllerRecord)
      |> OptionService.unsafeGet,
      getLocalEulerAngleY(transformComponent, flyCameraControllerRecord)
      |> OptionService.unsafeGet,
      getLocalEulerAngleZ(transformComponent, flyCameraControllerRecord)
      |> OptionService.unsafeGet,
    ),
    {...state, flyCameraControllerRecord},
  );
};