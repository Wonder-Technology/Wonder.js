open StateDataMainType;

open EventType;

let unsafeGetDistance = (cameraController, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.distanceMap,
  )
  |> OptionService.unsafeGet;

let unsafeGetWheelSpeed = (cameraController, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.wheelSpeedMap,
  )
  |> OptionService.unsafeGet;

let setWheelSpeed = (cameraController, wheelSpeed, {wheelSpeedMap} as record) => {
  ...record,
  wheelSpeedMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      wheelSpeed,
      wheelSpeedMap,
    ),
};

let unsafeGetMinDistance = (cameraController, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.minDistanceMap,
  )
  |> OptionService.unsafeGet;

let setDistance = (cameraController, distance, {distanceMap} as record) => {
  ...record,
  distanceMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      NumberService.bigThan(
        distance,
        unsafeGetMinDistance(cameraController, record),
      ),
      distanceMap,
    ),
};

let setDistanceByEvent =
    (cameraController, pointEvent: pointEvent, {distanceMap} as record) =>
  switch (pointEvent.wheel) {
  | None => record
  | Some(wheel) =>
    setDistance(
      cameraController,
      unsafeGetDistance(cameraController, record)
      -. unsafeGetWheelSpeed(cameraController, record)
      *. (wheel |> NumberType.convertIntToFloat),
      record,
    )
  };

let setMinDistance =
    (cameraController, minDistance, {minDistanceMap} as record) => {
  let record = {
    ...record,
    minDistanceMap:
      WonderCommonlib.MutableSparseMapService.set(
        cameraController,
        minDistance,
        minDistanceMap,
      ),
  };

  minDistance > unsafeGetDistance(cameraController, record) ?
    setDistance(cameraController, minDistance, record) : record;
};

let unsafeGetPhi = (cameraController, record) =>
  WonderCommonlib.MutableSparseMapService.get(cameraController, record.phiMap)
  |> OptionService.unsafeGet;

let setPhi = (cameraController, phi, {phiMap} as record) => {
  ...record,
  phiMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      phi,
      phiMap,
    ),
};

let _constrainTheta = (theta, thetaMargin) =>
  NumberService.clamp(theta, thetaMargin, Js.Math._PI -. thetaMargin);

let unsafeGetTheta = (cameraController, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.thetaMap,
  )
  |> OptionService.unsafeGet;

let unsafeGetThetaMargin = (cameraController, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.thetaMarginMap,
  )
  |> OptionService.unsafeGet;

let setThetaMargin =
    (cameraController, thetaMargin, {thetaMarginMap, thetaMap} as record) => {
  ...record,
  thetaMarginMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      thetaMargin,
      thetaMarginMap,
    ),
  thetaMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      _constrainTheta(unsafeGetTheta(cameraController, record), thetaMargin),
      thetaMap,
    ),
};

let setTheta = (cameraController, theta, {thetaMap} as record) => {
  let thetaMargin = unsafeGetThetaMargin(cameraController, record);

  {
    ...record,
    thetaMap:
      WonderCommonlib.MutableSparseMapService.set(
        cameraController,
        _constrainTheta(theta, thetaMargin),
        thetaMap,
      ),
  };
};

let unsafeGetTarget = (cameraController, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.targetMap,
  )
  |> OptionService.unsafeGet;

let setTarget = (cameraController, target, {targetMap} as record) => {
  ...record,
  targetMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      target,
      targetMap,
    ),
};

let unsafeGetMoveSpeedX = (cameraController, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.moveSpeedXMap,
  )
  |> OptionService.unsafeGet;

let setMoveSpeedX = (cameraController, moveSpeedX, {moveSpeedXMap} as record) => {
  ...record,
  moveSpeedXMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      moveSpeedX,
      moveSpeedXMap,
    ),
};

let unsafeGetMoveSpeedY = (cameraController, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.moveSpeedYMap,
  )
  |> OptionService.unsafeGet;

let setMoveSpeedY = (cameraController, moveSpeedY, {moveSpeedYMap} as record) => {
  ...record,
  moveSpeedYMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      moveSpeedY,
      moveSpeedYMap,
    ),
};

let unsafeGetRotateSpeed = (cameraController, record) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.rotateSpeedMap,
  )
  |> OptionService.unsafeGet;

let setRotateSpeed =
    (cameraController, rotateSpeed, {rotateSpeedMap} as record) => {
  ...record,
  rotateSpeedMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      rotateSpeed,
      rotateSpeedMap,
    ),
};

let unsafeGetDirectionArray =
    (cameraController, record: arcballCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.directionArrayMap,
  )
  |> OptionService.unsafeGet;

let hasDirection = (cameraController, record: arcballCameraControllerRecord) =>
  WonderCommonlib.MutableSparseMapService.get(
    cameraController,
    record.directionArrayMap,
  )
  |> OptionService.unsafeGet
  |> ArrayService.hasItem;

let setDirectionArray =
    (cameraController, directionArray, record: arcballCameraControllerRecord) => {
  ...record,
  directionArrayMap:
    WonderCommonlib.MutableSparseMapService.set(
      cameraController,
      directionArray,
      record.directionArrayMap,
    ),
};