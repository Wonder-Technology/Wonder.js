let getDirection = (
  directionLightData,
  transformData,
  light: WonderComponentTypeDirectionlight.Index.directionLight,
): Js.Nullable.t<(float, float, float)> =>
  WonderEngineCore.Main.getComponentGameObjects(
    directionLightData,
    light->VOTypeConvert.directionLightToComponent,
  )
  ->WonderCommonlib.ArraySt.getFirst
  ->WonderCommonlib.OptionSt.bind(gameObject =>
    WonderEngineCore.Main.getComponent(transformData, gameObject)
    ->WonderCommonlib.OptionSt.fromNullable
    ->WonderCommonlib.OptionSt.map(transform =>
      WonderEngineCore.Main.getComponentData(
        transformData,
        transform,
        WonderComponentTypeTransform.Index.dataName.eulerAngles->Obj.magic,
      )
      ->Obj.magic
      ->WonderCommonlib.Quaternion.setFromEulerAngles
      ->WonderCommonlib.Vector3.transformQuat((0., 0., 1.))
    )
  )
  ->WonderCommonlib.OptionSt.toNullable
