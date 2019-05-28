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

let unsafeGetRotation = (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.rotationMap,
  )
  |> OptionService.unsafeGet;

let setRotation =
    (
      cameraController,
      rotation,
      {rotationMap, dirtyArray} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  rotationMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      rotation,
      rotationMap,
    ),
};

let unsafeGetPosition = (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.positionMap,
  )
  |> OptionService.unsafeGet;

let setPosition =
    (
      cameraController,
      position,
      {positionMap, dirtyArray} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  positionMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      position,
      positionMap,
    ),
};