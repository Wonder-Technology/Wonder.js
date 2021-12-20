let _getAspect = (data, cameraProjection) => {
  WonderCore.Main.getComponentData(
    data,
    cameraProjection,
    WonderComponentTypePerspectivecameraprojection.Index.dataName.aspect->Obj.magic,
  )
  ->Obj.magic
  ->WonderCommonlib.OptionSt.fromNullable
}

let _getFovy = (data, cameraProjection) => {
  WonderCore.Main.getComponentData(
    data,
    cameraProjection,
    WonderComponentTypePerspectivecameraprojection.Index.dataName.fovy->Obj.magic,
  )
  ->Obj.magic
  ->WonderCommonlib.OptionSt.fromNullable
}

let _getNear = (data, cameraProjection) => {
  WonderCore.Main.getComponentData(
    data,
    cameraProjection,
    WonderComponentTypePerspectivecameraprojection.Index.dataName.near->Obj.magic,
  )
  ->Obj.magic
  ->WonderCommonlib.OptionSt.fromNullable
}

let _getFar = (data, cameraProjection) => {
  WonderCore.Main.getComponentData(
    data,
    cameraProjection,
    WonderComponentTypePerspectivecameraprojection.Index.dataName.far->Obj.magic,
  )
  ->Obj.magic
  ->WonderCommonlib.OptionSt.fromNullable
}

let _getFovy = (data, cameraProjection) => {
  WonderCore.Main.getComponentData(
    data,
    cameraProjection,
    WonderComponentTypePerspectivecameraprojection.Index.dataName.fovy->Obj.magic,
  )
  ->WonderCommonlib.OptionSt.fromNullable
  ->Obj.magic
}

let _setPMatrix = (data, cameraProjection, pMatrix) => {
  WonderCore.Main.setComponentData(
    data,
    cameraProjection,
    WonderComponentTypePerspectivecameraprojection.Index.dataName.pMatrix->Obj.magic,
    pMatrix->Obj.magic,
  )
}

let updatePerspectiveCameraProjection = (
  data,
  isDebug,
  cameraProjection: WonderComponentTypePerspectivecameraprojection.Index.perspectiveCameraProjection,
  canvasSize,
) => {
  let cameraProjection = cameraProjection->VOTypeConvert.perspectiveCameraProjectionToComponent

  let aspect =
    _getAspect(data, cameraProjection)->WonderCommonlib.OptionSt.getWithDefault(
      FrustumPerspectiveCameraProjectionService.computeAspect(canvasSize),
    )

  switch (
    _getFovy(data, cameraProjection),
    _getNear(data, cameraProjection),
    _getFar(data, cameraProjection),
  ) {
  | (Some(fovy), Some(near), Some(far)) =>
    WonderCommonlib.Matrix4.createIdentityMatrix4()
    ->WonderCommonlib.Matrix4.buildPerspective(isDebug, (fovy, aspect, near, far))
    ->_setPMatrix(data, cameraProjection, _)
  | (_, _, _) =>
    WonderCommonlib.Exception.throwErr(
      WonderCommonlib.Log.buildFatalMessage(
        ~title="update",
        ~description=j`fovy,near,far should all exist`,
        ~reason="",
        ~solution=j``,
        ~params=j`cameraProjection: $cameraProjection`,
      ),
    )
  }
}
