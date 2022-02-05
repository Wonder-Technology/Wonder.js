open StateType

let getData = (.
  {localToWorldMatrices} as state,
  transform,
  dataName: DataType.dataName,
): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName if dataName == WonderComponentTypeTransformWorker.Index.dataName.localToWorldMatrix =>
    WonderComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
      localToWorldMatrices,
      transform,
    )
    ->Obj.magic
    ->Js.Nullable.return
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
