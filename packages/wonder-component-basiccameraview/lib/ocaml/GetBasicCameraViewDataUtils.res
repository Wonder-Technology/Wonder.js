open StateType

let getData = (. state, cameraView, dataName: DataType.dataName): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName if dataName == WonderComponentTypeBasiccameraview.Index.dataName.active =>
    OperateBasicCameraViewUtils.getIsActive(state, cameraView)->Obj.magic->Js.Nullable.return
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
