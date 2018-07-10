open StateDataMainType;

open EventType;

let unsafeGetDistance = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(cameraController, record.distanceMap) |> OptionService.unsafeGet;

let unsafeGetWheelSpeed = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.wheelSpeedMap,
  ) |> OptionService.unsafeGet;

let setWheelSpeed =
    (cameraController, wheelSpeed, {wheelSpeedMap, dirtyArray} as record) => {
  ...record,
  wheelSpeedMap:
    WonderCommonlib.SparseMapService.set(
      cameraController,
      wheelSpeed,
      wheelSpeedMap,
    ),
};

let unsafeGetMinDistance = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.minDistanceMap,
  ) |> OptionService.unsafeGet;

let setDistance =
    (cameraController, distance, {distanceMap, dirtyArray} as record) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  distanceMap:
    WonderCommonlib.SparseMapService.set(
      cameraController,
      NumberService.bigThan(
        distance,
        unsafeGetMinDistance(cameraController, record),
      ),
      distanceMap,
    ),
};

let setDistanceByEvent =
    (
      cameraController,
      pointEvent: pointEvent,
      {distanceMap, dirtyArray} as record,
    ) =>
  switch (pointEvent.wheel) {
  | None => record
  | Some(wheel) =>
    setDistance(
      cameraController,
      unsafeGetDistance(cameraController, record)
      -. unsafeGetWheelSpeed(cameraController, record)
      *. (wheel |> NumberType.intToFloat),
      record,
    )
  };

let setMinDistance =
    (cameraController, minDistance, {minDistanceMap, dirtyArray} as record) => {
  let record = {
    ...record,
    dirtyArray:
      DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
    minDistanceMap:
      WonderCommonlib.SparseMapService.set(
        cameraController,
        minDistance,
        minDistanceMap,
      ),
  };

  minDistance > unsafeGetDistance(cameraController, record) ?
    setDistance(cameraController, minDistance, record) : record;
};

let unsafeGetPhi = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(cameraController, record.phiMap) |> OptionService.unsafeGet;

let setPhi = (cameraController, phi, {phiMap, dirtyArray} as record) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  phiMap: WonderCommonlib.SparseMapService.set(cameraController, phi, phiMap),
};

let _constrainTheta = (theta, thetaMargin) =>
  NumberService.clamp(theta, thetaMargin, Js.Math._PI -. thetaMargin);

let unsafeGetTheta = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(cameraController, record.thetaMap) |> OptionService.unsafeGet;

let unsafeGetThetaMargin = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.thetaMarginMap,
  ) |> OptionService.unsafeGet;

let setThetaMargin =
    (
      cameraController,
      thetaMargin,
      {thetaMarginMap, thetaMap, dirtyArray} as record,
    ) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  thetaMarginMap:
    WonderCommonlib.SparseMapService.set(
      cameraController,
      thetaMargin,
      thetaMarginMap,
    ),
  thetaMap:
    WonderCommonlib.SparseMapService.set(
      cameraController,
      _constrainTheta(unsafeGetTheta(cameraController, record), thetaMargin),
      thetaMap,
    ),
};

let setTheta = (cameraController, theta, {thetaMap, dirtyArray} as record) => {
  let thetaMargin = unsafeGetThetaMargin(cameraController, record);

  {
    ...record,
    dirtyArray:
      DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
    thetaMap:
      WonderCommonlib.SparseMapService.set(
        cameraController,
        _constrainTheta(theta, thetaMargin),
        thetaMap,
      ),
  };
};

let unsafeGetTarget = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(cameraController, record.targetMap) |> OptionService.unsafeGet;

let setTarget = (cameraController, target, {targetMap, dirtyArray} as record) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  targetMap:
    WonderCommonlib.SparseMapService.set(cameraController, target, targetMap),
};

let unsafeGetMoveSpeedX = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.moveSpeedXMap,
  ) |> OptionService.unsafeGet;

let setMoveSpeedX =
    (cameraController, moveSpeedX, {moveSpeedXMap, dirtyArray} as record) => {
  ...record,
  moveSpeedXMap:
    WonderCommonlib.SparseMapService.set(
      cameraController,
      moveSpeedX,
      moveSpeedXMap,
    ),
};

let unsafeGetMoveSpeedY = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.moveSpeedYMap,
  ) |> OptionService.unsafeGet;

let setMoveSpeedY =
    (cameraController, moveSpeedY, {moveSpeedYMap, dirtyArray} as record) => {
  ...record,
  moveSpeedYMap:
    WonderCommonlib.SparseMapService.set(
      cameraController,
      moveSpeedY,
      moveSpeedYMap,
    ),
};

let unsafeGetRotateSpeed = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.rotateSpeedMap,
  ) |> OptionService.unsafeGet;

let setRotateSpeed =
    (cameraController, rotateSpeed, {rotateSpeedMap, dirtyArray} as record) => {
  ...record,
  rotateSpeedMap:
    WonderCommonlib.SparseMapService.set(
      cameraController,
      rotateSpeed,
      rotateSpeedMap,
    ),
};