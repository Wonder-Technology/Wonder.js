open StateDataMainType;

open EventType;

let getDistance = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(cameraController, record.distanceMap);

let unsafeGetDistance = (cameraController, record) =>
  getDistance(cameraController, record) |> OptionService.unsafeGet;

let getWheelSpeed = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.wheelSpeedMap,
  );

let unsafeGetWheelSpeed = (cameraController, record) =>
  getWheelSpeed(cameraController, record) |> OptionService.unsafeGet;

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

let getMinDistance = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.minDistanceMap,
  );

let unsafeGetMinDistance = (cameraController, record) =>
  getMinDistance(cameraController, record) |> OptionService.unsafeGet;

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
      unsafeGetWheelSpeed(cameraController, record)
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

let getPhi = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(cameraController, record.phiMap);

let unsafeGetPhi = (cameraController, record) =>
  getPhi(cameraController, record) |> OptionService.unsafeGet;

let setPhi = (cameraController, phi, {phiMap, dirtyArray} as record) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  phiMap: WonderCommonlib.SparseMapService.set(cameraController, phi, phiMap),
};

let _constrainTheta = (theta, thetaMargin) =>
  NumberService.clamp(theta, thetaMargin, Js.Math._PI -. thetaMargin);

let getTheta = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(cameraController, record.thetaMap);

let unsafeGetTheta = (cameraController, record) =>
  getTheta(cameraController, record) |> OptionService.unsafeGet;

let getThetaMargin = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.thetaMarginMap,
  );

let unsafeGetThetaMargin = (cameraController, record) =>
  getThetaMargin(cameraController, record) |> OptionService.unsafeGet;

let setThetaMargin =
    (cameraController, thetaMargin, {thetaMarginMap, dirtyArray} as record) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  thetaMarginMap:
    WonderCommonlib.SparseMapService.set(
      cameraController,
      _constrainTheta(unsafeGetTheta(cameraController, record), thetaMargin),
      thetaMarginMap,
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

let getTarget = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(cameraController, record.targetMap);

let unsafeGetTarget = (cameraController, record) =>
  getTarget(cameraController, record) |> OptionService.unsafeGet;

let setTarget = (cameraController, target, {targetMap, dirtyArray} as record) => {
  ...record,
  dirtyArray: DirtyArrayService.addToDirtyArray(cameraController, dirtyArray),
  targetMap:
    WonderCommonlib.SparseMapService.set(cameraController, target, targetMap),
};

let getMoveSpeedX = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.moveSpeedXMap,
  );

let unsafeGetMoveSpeedX = (cameraController, record) =>
  getMoveSpeedX(cameraController, record) |> OptionService.unsafeGet;

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

let getMoveSpeedY = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.moveSpeedYMap,
  );

let unsafeGetMoveSpeedY = (cameraController, record) =>
  getMoveSpeedY(cameraController, record) |> OptionService.unsafeGet;

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

let getRotateSpeed = (cameraController, record) =>
  WonderCommonlib.SparseMapService.get(
    cameraController,
    record.rotateSpeedMap,
  );

let unsafeGetRotateSpeed = (cameraController, record) =>
  getRotateSpeed(cameraController, record) |> OptionService.unsafeGet;

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