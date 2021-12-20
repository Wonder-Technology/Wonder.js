open StateType

let setData = (.
  {colors, intensities} as state,
  light,
  dataName: DataType.dataName,
  dataValue: WonderCore.IComponentForJs.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == WonderComponentTypeDirectionlight.Index.dataName.color =>
    OperateTypeArrayDirectionLightUtils.setColor(light, dataValue->Obj.magic, colors)
  | dataName if dataName == WonderComponentTypeDirectionlight.Index.dataName.intensity =>
    OperateTypeArrayDirectionLightUtils.setIntensity(light, dataValue->Obj.magic, intensities)
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
