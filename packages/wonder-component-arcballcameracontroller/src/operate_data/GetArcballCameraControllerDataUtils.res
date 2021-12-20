open StateType

let getData = (. state, cameraController, dataName: DataType.dataName): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.distance =>
    OperateArcballCameraControllerUtils.getDistance(state, cameraController)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.minDistance =>
    OperateArcballCameraControllerUtils.getMinDistance(state, cameraController)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.phi =>
    OperateArcballCameraControllerUtils.getPhi(state, cameraController)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.theta =>
    OperateArcballCameraControllerUtils.getTheta(state, cameraController)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.thetaMargin =>
    OperateArcballCameraControllerUtils.getThetaMargin(state, cameraController)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.target =>
    OperateArcballCameraControllerUtils.getTarget(state, cameraController)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.moveSpeedX =>
    OperateArcballCameraControllerUtils.getMoveSpeedX(state, cameraController)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.moveSpeedY =>
    OperateArcballCameraControllerUtils.getMoveSpeedY(state, cameraController)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.wheelSpeed =>
    OperateArcballCameraControllerUtils.getWheelSpeed(state, cameraController)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.rotateSpeed =>
    OperateArcballCameraControllerUtils.getRotateSpeed(state, cameraController)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName if dataName == WonderComponentTypeArcballcameracontroller.Index.dataName.dirty =>
    DirtyArcballCameraControllerUtils.isDirty(state, cameraController)
    ->Obj.magic
    ->WonderCommonlib.OptionSt.toNullable
  | _ =>
    WonderCommonlib.Exception.throwErr(
      WonderCommonlib.Log.buildFatalMessage(
        ~title="getData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
