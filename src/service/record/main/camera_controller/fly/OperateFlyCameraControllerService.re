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
      {moveSpeedMap, dirtyArray} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
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
      {wheelSpeedMap, dirtyArray} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
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
      {rotateSpeedMap, dirtyArray} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  rotateSpeedMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      rotateSpeed,
      rotateSpeedMap,
    ),
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
      {eulerAngleDiffMap, dirtyArray} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
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
      {translationDiffMap, dirtyArray} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  translationDiffMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      value,
      translationDiffMap,
    ),
};

let getDirectionArray = (record: flyCameraControllerRecord) =>
  record.directionArray;

let hasDirection = (record: flyCameraControllerRecord) =>
  record.directionArray |> ArrayService.hasItem;

let setDirectionArray =
    (
      cameraController,
      directionArray,
      {dirtyArray} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  directionArray,
};