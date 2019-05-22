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
  rotateSpeedMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      rotateSpeed,
      rotateSpeedMap,
    ),
};