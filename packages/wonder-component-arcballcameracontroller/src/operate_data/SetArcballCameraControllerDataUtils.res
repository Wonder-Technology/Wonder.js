open StateType

let _constrainTheta = (isDebug, theta, thetaMargin) =>
  WonderCommonlib.NumberUtils.clamp(isDebug, theta, thetaMargin, Js.Math._PI -. thetaMargin)

let setData = (.
  state,
  cameraController,
  dataName: DataType.dataName,
  dataValue: WonderCore.IComponentForJs.dataValue,
): StateType.state => {
  switch dataName {
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.distance =>
    OperateArcballCameraControllerUtils.setDistance(
      state,
      cameraController,
      WonderCommonlib.NumberUtils.bigThan(
        dataValue->Obj.magic,
        OperateArcballCameraControllerUtils.getMinDistance(
          state,
          cameraController,
        )->WonderCommonlib.OptionSt.getExn,
      ),
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.minDistance =>
    OperateArcballCameraControllerUtils.setMinDistance(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.wheelSpeed =>
    OperateArcballCameraControllerUtils.setWheelSpeed(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.phi =>
    OperateArcballCameraControllerUtils.setPhi(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.theta =>
    OperateArcballCameraControllerUtils.setTheta(
      state,
      cameraController,
      _constrainTheta(
        ConfigUtils.getIsDebug(state),
        dataValue->Obj.magic,
        OperateArcballCameraControllerUtils.getThetaMargin(
          state,
          cameraController,
        )->WonderCommonlib.OptionSt.getExn,
      ),
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.thetaMargin =>
    let thetaMargin = dataValue->Obj.magic

    let state = OperateArcballCameraControllerUtils.setThetaMargin(
      state,
      cameraController,
      thetaMargin,
    )

    OperateArcballCameraControllerUtils.setTheta(
      state,
      cameraController,
      _constrainTheta(
        ConfigUtils.getIsDebug(state),
        OperateArcballCameraControllerUtils.getTheta(
          state,
          cameraController,
        )->WonderCommonlib.OptionSt.getExn,
        thetaMargin,
      ),
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.target =>
    OperateArcballCameraControllerUtils.setTarget(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.moveSpeedX =>
    OperateArcballCameraControllerUtils.setMoveSpeedX(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.moveSpeedY =>
    OperateArcballCameraControllerUtils.setMoveSpeedY(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.rotateSpeed =>
    OperateArcballCameraControllerUtils.setRotateSpeed(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.dirty =>
    DirtyArcballCameraControllerUtils.mark(state, cameraController, dataValue->Obj.magic)
  | _ =>
    WonderCommonlib.Exception.throwErr(
      WonderCommonlib.Log.buildFatalMessage(
        ~title="setData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
