open StateType

let setData = (.
  state,
  cameraView,
  dataName: DataType.dataName,
  dataValue: WonderCore.IComponentForJs.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == WonderComponentTypeBasiccameraview.Index.dataName.active =>
    OperateBasicCameraViewUtils.setIsActive(state, cameraView, dataValue->Obj.magic)
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
