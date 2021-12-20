open StateType

let setData = (.
  {diffuseColors, speculars} as state,
  material,
  dataName: DataType.dataName,
  dataValue: WonderCore.IComponentForJs.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == WonderComponentTypePbrmaterial.Index.dataName.diffuseColor =>
    OperateTypeArrayPBRMaterialUtils.setDiffuseColor(material, dataValue->Obj.magic, diffuseColors)
  | dataName if dataName == WonderComponentTypePbrmaterial.Index.dataName.specular =>
    OperateTypeArrayPBRMaterialUtils.setSpecular(material, dataValue->Obj.magic, speculars)

  //   TODO finish more
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

  state
}
