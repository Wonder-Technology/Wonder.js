open StateDataMainType;

open EventType;

let unsafeGetMoveSpeedX =
    (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.moveSpeedXMap,
  )
  |> OptionService.unsafeGet;

let setMoveSpeedX =
    (
      cameraController,
      moveSpeedX,
      {moveSpeedXMap, dirtyArray} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  moveSpeedXMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      moveSpeedX,
      moveSpeedXMap,
    ),
};

let unsafeGetMoveSpeedY =
    (cameraController, record: flyCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.moveSpeedYMap,
  )
  |> OptionService.unsafeGet;

let setMoveSpeedY =
    (
      cameraController,
      moveSpeedY,
      {moveSpeedYMap, dirtyArray} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  moveSpeedYMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      moveSpeedY,
      moveSpeedYMap,
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