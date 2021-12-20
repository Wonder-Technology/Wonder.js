open StateType

let getData = (. {diffuseColors, speculars}, material, dataName: DataType.dataName): 'a => {
  switch dataName {
  | dataName if dataName == WonderComponentTypePbrmaterialWorker.Index.dataName.diffuseColor =>
    WonderComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getDiffuseColor(
      material,
      diffuseColors,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypePbrmaterialWorker.Index.dataName.specular =>
    WonderComponentWorkerUtils.OperateTypeArrayPBRMaterialUtils.getSpecular(material, speculars)
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
