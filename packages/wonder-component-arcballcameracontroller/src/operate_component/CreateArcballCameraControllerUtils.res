let _setDefaultValue = (state, cameraController) => {
  state
  ->OperateArcballCameraControllerUtils.setDistance(cameraController, 10.)
  ->OperateArcballCameraControllerUtils.setMinDistance(cameraController, 0.05)
  ->OperateArcballCameraControllerUtils.setPhi(cameraController, Js.Math._PI /. 2.)
  ->OperateArcballCameraControllerUtils.setTheta(cameraController, Js.Math._PI /. 2.)
  ->OperateArcballCameraControllerUtils.setThetaMargin(cameraController, 0.05)
  ->OperateArcballCameraControllerUtils.setTarget(cameraController, (0., 0., 0.))
  ->OperateArcballCameraControllerUtils.setMoveSpeedX(cameraController, 1.)
  ->OperateArcballCameraControllerUtils.setMoveSpeedY(cameraController, 1.)
  ->OperateArcballCameraControllerUtils.setRotateSpeed(cameraController, 1.)
  ->OperateArcballCameraControllerUtils.setWheelSpeed(cameraController, 1.)
}

let create = (state: StateType.state): (StateType.state, StateType.arcballCameraController) => {
  let index = state.maxIndex
  let newIndex = index->WonderCommonlib.IndexComponentUtils.generateIndex

  let state = state->DirtyArcballCameraControllerUtils.mark(index, true)->_setDefaultValue(index)

  (
    {
      ...state,
      maxIndex: newIndex,
    },
    index,
  )
}
