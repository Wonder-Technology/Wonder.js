external transformToComponent: WonderComponentTypeTransform.Index.transform => WonderCore.RegisterComponentType.component =
  "%identity"

external geometryToComponent: WonderComponentTypeGeometry.Index.geometry => WonderCore.RegisterComponentType.component =
  "%identity"

external componentToGeometry: WonderCore.RegisterComponentType.component => WonderComponentTypeGeometry.Index.geometry =
  "%identity"

external directionLightToComponent: WonderComponentTypeDirectionlight.Index.directionLight => WonderCore.RegisterComponentType.component =
  "%identity"

external basicCameraViewToComponent: WonderComponentTypeBasiccameraview.Index.basicCameraView => WonderCore.RegisterComponentType.component =
  "%identity"

external componentToBasicCameraView: WonderCore.RegisterComponentType.component => WonderComponentTypeBasiccameraview.Index.basicCameraView =
  "%identity"

external perspectiveCameraProjectionToComponent: WonderComponentTypePerspectivecameraprojection.Index.perspectiveCameraProjection => WonderCore.RegisterComponentType.component =
  "%identity"
