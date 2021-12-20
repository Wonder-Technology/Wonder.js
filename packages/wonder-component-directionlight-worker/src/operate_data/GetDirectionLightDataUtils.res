open StateType

let getData = (. {colors, intensities} as state, light, dataName: DataType.dataName): Js.Nullable.t<
  'a,
> => {
  switch dataName {
  | dataName if dataName == WonderComponentTypeDirectionlightWorker.Index.dataName.color =>
    WonderComponentWorkerUtils.OperateTypeArrayDirectionLightUtils.getColor(light, colors)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == WonderComponentTypeDirectionlightWorker.Index.dataName.intensity =>
    WonderComponentWorkerUtils.OperateTypeArrayDirectionLightUtils.getIntensity(
      light,
      intensities,
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
