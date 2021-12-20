let lookAt = (
  ~data,
  ~transform: WonderComponentTypeTransform.Index.transform,
  ~target,
  ~up=(0., 1., 0.),
  (),
) => {
  let transform = transform->VOTypeConvert.transformToComponent

  WonderCore.Main.setComponentData(
    data,
    transform,
    WonderComponentTypeTransform.Index.dataName.rotation->Obj.magic,
    WonderCommonlib.Matrix4.setLookAt(
      WonderCore.Main.getComponentData(
        data,
        transform,
        WonderComponentTypeTransform.Index.dataName.position->Obj.magic,
      )
      ->WonderCommonlib.NullableTool.getExn
      ->Obj.magic,
      target,
      up,
    )->WonderCommonlib.Quaternion.setFromMatrix,
  )
}
