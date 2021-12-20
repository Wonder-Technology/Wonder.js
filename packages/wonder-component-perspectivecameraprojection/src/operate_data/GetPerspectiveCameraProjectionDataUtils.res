open StateType

let getData = (. state, cameraProjection, dataName: DataType.dataName): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName
    if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.pMatrix =>
    OperatePerspectiveCameraProjectionUtils.getPMatrix(state, cameraProjection)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.fovy =>
    OperatePerspectiveCameraProjectionUtils.getFovy(state, cameraProjection)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.aspect =>
    OperatePerspectiveCameraProjectionUtils.getAspect(state, cameraProjection)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.far =>
    OperatePerspectiveCameraProjectionUtils.getFar(state, cameraProjection)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.near =>
    OperatePerspectiveCameraProjectionUtils.getNear(state, cameraProjection)
    ->WonderCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == WonderComponentTypePerspectivecameraprojection.Index.dataName.dirty =>
    DirtyPerspectiveCameraProjectionUtils.isDirty(state, cameraProjection)
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
