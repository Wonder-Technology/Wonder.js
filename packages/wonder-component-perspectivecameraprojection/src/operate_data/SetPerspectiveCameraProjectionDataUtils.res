open StateType

let setData = (.
  state,
  cameraProjection,
  dataName: DataType.dataName,
  dataValue: WonderCore.IComponentForJs.dataValue,
): StateType.state => {
  switch dataName {
  | dataName
    if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.pMatrix =>
    OperatePerspectiveCameraProjectionUtils.setPMatrix(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName
    if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.fovy =>
    OperatePerspectiveCameraProjectionUtils.setFovy(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName
    if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.aspect =>
    OperatePerspectiveCameraProjectionUtils.setAspect(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.far =>
    OperatePerspectiveCameraProjectionUtils.setFar(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName
    if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.near =>
    OperatePerspectiveCameraProjectionUtils.setNear(
      state,
      cameraProjection,
      dataValue->Obj.magic,
    )->DirtyPerspectiveCameraProjectionUtils.mark(cameraProjection, true)
  | dataName
    if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.dirty =>
    DirtyPerspectiveCameraProjectionUtils.mark(state, cameraProjection, dataValue->Obj.magic)
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
