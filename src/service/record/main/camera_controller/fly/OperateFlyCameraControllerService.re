open StateDataMainType;

open EventType;

let unsafeGetMoveSpeed = (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.moveSpeedMap,
  )
  |> OptionService.unsafeGet;

let setMoveSpeed =
    (
      cameraController,
      moveSpeed,
      {moveSpeedMap} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  moveSpeedMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      moveSpeed,
      moveSpeedMap,
    ),
};

let unsafeGetWheelSpeed =
    (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.wheelSpeedMap,
  )
  |> OptionService.unsafeGet;

let setWheelSpeed =
    (
      cameraController,
      wheelSpeed,
      {wheelSpeedMap} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  wheelSpeedMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      wheelSpeed,
      wheelSpeedMap,
    ),
};

let unsafeGetRotateSpeed =
    (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.rotateSpeedMap,
  )
  |> OptionService.unsafeGet;

let setRotateSpeed =
    (
      cameraController,
      rotateSpeed,
      {rotateSpeedMap} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  rotateSpeedMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      rotateSpeed,
      rotateSpeedMap,
    ),
};

let unsafeGetPhi = (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(cameraController, record.phiMap)
  |> OptionService.unsafeGet;

let setPhi =
    (cameraController, phi, {phiMap} as record: flyCameraControllerRecord) => {
  ...record,
  phiMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      phi,
      phiMap,
    ),
};

let unsafeGetTheta = (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.thetaMap,
  )
  |> OptionService.unsafeGet;

let setTheta =
    (
      cameraController,
      theta,
      {thetaMap} as record: flyCameraControllerRecord,
    ) => {
  let thetaMargin = 0.05;
  {
    ...record,
    thetaMap:
      WonderCommonlib.MutableSparseMapService.set(
        cameraController,
        NumberService.clamp(theta, thetaMargin, Js.Math._PI -. thetaMargin),
        thetaMap,
      ),
  };
};

let unsafeGetEulerAngleDiff =
    (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.eulerAngleDiffMap,
  )
  |> OptionService.unsafeGet;

let setEulerAngleDiff =
    (
      cameraController,
      value,
      {eulerAngleDiffMap} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  eulerAngleDiffMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      value,
      eulerAngleDiffMap,
    ),
};

let unsafeGetTranslationDiff =
    (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.translationDiffMap,
  )
  |> OptionService.unsafeGet;

let setTranslationDiff =
    (
      cameraController,
      value,
      {translationDiffMap} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  translationDiffMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      value,
      translationDiffMap,
    ),
};

let unsafeGetDirectionArray =
    (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.directionArrayMap,
  )
  |> OptionService.unsafeGet;

let hasDirection = (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.directionArrayMap,
  )
  |> OptionService.unsafeGet
  |> ArrayService.hasItem;

let setDirectionArray =
    (cameraController, directionArray, record: flyCameraControllerRecord) => {
  ...record,
  directionArrayMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      directionArray,
      record.directionArrayMap,
    ),
};