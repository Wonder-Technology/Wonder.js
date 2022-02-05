open StateType

let getDistance = (state, cameraController) =>
  state.distanceMap->WonderCommonlib.ImmutableSparseMap.get(cameraController)

let setDistance = (state, cameraController, distance) => {
  let {distanceMap} = state

  {
    ...state,
    distanceMap: distanceMap->WonderCommonlib.ImmutableSparseMap.set(
      cameraController,
      distance,
    ),
  }
}

let getMinDistance = (state, cameraController) =>
  state.minDistanceMap->WonderCommonlib.ImmutableSparseMap.get(cameraController)

let setMinDistance = (state, cameraController, minDistance) => {
  let {minDistanceMap} = state

  {
    ...state,
    minDistanceMap: minDistanceMap->WonderCommonlib.ImmutableSparseMap.set(
      cameraController,
      minDistance,
    ),
  }
}

let getWheelSpeed = (state, cameraController) =>
  state.wheelSpeedMap->WonderCommonlib.ImmutableSparseMap.get(cameraController)

let setWheelSpeed = (state, cameraController, wheelSpeed) => {
  let {wheelSpeedMap} = state

  {
    ...state,
    wheelSpeedMap: wheelSpeedMap->WonderCommonlib.ImmutableSparseMap.set(
      cameraController,
      wheelSpeed,
    ),
  }
}

let getPhi = (state, cameraController) =>
  state.phiMap->WonderCommonlib.ImmutableSparseMap.get(cameraController)

let setPhi = (state, cameraController, phi) => {
  let {phiMap} = state

  {
    ...state,
    phiMap: phiMap->WonderCommonlib.ImmutableSparseMap.set(cameraController, phi),
  }
}

let getTheta = (state, cameraController) =>
  state.thetaMap->WonderCommonlib.ImmutableSparseMap.get(cameraController)

let setTheta = (state, cameraController, theta) => {
  let {thetaMap} = state

  {
    ...state,
    thetaMap: thetaMap->WonderCommonlib.ImmutableSparseMap.set(cameraController, theta),
  }
}

let getThetaMargin = (state, cameraController) =>
  state.thetaMarginMap->WonderCommonlib.ImmutableSparseMap.get(cameraController)

let setThetaMargin = (state, cameraController, thetaMargin) => {
  let {thetaMarginMap} = state

  {
    ...state,
    thetaMarginMap: thetaMarginMap->WonderCommonlib.ImmutableSparseMap.set(
      cameraController,
      thetaMargin,
    ),
  }
}

let getTarget = (state, cameraController) =>
  state.targetMap->WonderCommonlib.ImmutableSparseMap.get(cameraController)

let setTarget = (state, cameraController, target) => {
  let {targetMap} = state

  {
    ...state,
    targetMap: targetMap->WonderCommonlib.ImmutableSparseMap.set(cameraController, target),
  }
}

let getMoveSpeedX = (state, cameraController) =>
  state.moveSpeedXMap->WonderCommonlib.ImmutableSparseMap.get(cameraController)

let setMoveSpeedX = (state, cameraController, moveSppedX) => {
  let {moveSpeedXMap} = state

  {
    ...state,
    moveSpeedXMap: moveSpeedXMap->WonderCommonlib.ImmutableSparseMap.set(
      cameraController,
      moveSppedX,
    ),
  }
}

let getMoveSpeedY = (state, cameraController) =>
  state.moveSpeedYMap->WonderCommonlib.ImmutableSparseMap.get(cameraController)

let setMoveSpeedY = (state, cameraController, moveSppedY) => {
  let {moveSpeedYMap} = state

  {
    ...state,
    moveSpeedYMap: moveSpeedYMap->WonderCommonlib.ImmutableSparseMap.set(
      cameraController,
      moveSppedY,
    ),
  }
}

let getRotateSpeed = (state, cameraController) =>
  state.rotateSpeedMap->WonderCommonlib.ImmutableSparseMap.get(cameraController)

let setRotateSpeed = (state, cameraController, rotateSpeed) => {
  let {rotateSpeedMap} = state

  {
    ...state,
    rotateSpeedMap: rotateSpeedMap->WonderCommonlib.ImmutableSparseMap.set(
      cameraController,
      rotateSpeed,
    ),
  }
}
