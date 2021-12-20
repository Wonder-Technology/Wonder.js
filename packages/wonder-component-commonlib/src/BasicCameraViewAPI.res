let getViewWorldToCameraMatrix = (
  basicCameraViewData,
  transformData,
  cameraView: WonderComponentTypeBasiccameraview.Index.basicCameraView,
) => {
  WonderCore.Main.getComponentGameObjects(
    basicCameraViewData,
    cameraView->VOTypeConvert.basicCameraViewToComponent,
  )
  ->WonderCommonlib.ArraySt.getFirst
  ->WonderCommonlib.OptionSt.bind(gameObject =>
    WonderCore.Main.getComponent(
      transformData,
      gameObject,
    )->WonderCommonlib.OptionSt.fromNullable
  )
  ->WonderCommonlib.OptionSt.bind(transform =>
    WonderCore.Main.getComponentData(
      transformData,
      transform,
      WonderComponentTypeTransform.Index.dataName.localToWorldMatrix->Obj.magic,
    )
    ->Obj.magic
    ->WonderCommonlib.OptionSt.fromNullable
    ->WonderCommonlib.OptionSt.map(localToWorldMatrix => {
      WonderCommonlib.Matrix4.createIdentityMatrix4()->WonderCommonlib.Matrix4.invert(
        localToWorldMatrix,
      )
    })
  )
  ->WonderCommonlib.OptionSt.toNullable
}

let _isActive = (data, cameraView): bool => {
  WonderCore.Main.getComponentData(
    data,
    cameraView,
    WonderComponentTypeBasiccameraview.Index.dataName.active->Obj.magic,
  )
  ->WonderCommonlib.NullableTool.getExn
  ->Obj.magic
}

let _checkAtMostTwo = (activeCameraViews, isDebug) => {
  activeCameraViews->WonderCommonlib.Contract.ensureCheck(r => {
    open WonderCommonlib.Contract
    open Operators

    test(
      WonderCommonlib.Log.buildAssertMessage(
        ~expect=j`only has one active cameraView at most`,
        ~actual=j`not`,
      ),
      () => r->WonderCommonlib.Log.printForDebug->WonderCommonlib.ArraySt.length <= 1,
    )
  }, isDebug)
}

let getActiveCameraView = (data, isDebug) => {
  WonderCore.Main.getAllComponents(data)
  ->WonderCommonlib.ArraySt.filter(_isActive(data))
  ->_checkAtMostTwo(isDebug)
  ->WonderCommonlib.ArraySt.getFirst
  ->WonderCommonlib.OptionSt.map(VOTypeConvert.componentToBasicCameraView)
  ->WonderCommonlib.OptionSt.toNullable
}
