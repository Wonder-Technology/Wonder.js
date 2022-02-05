external transformToComponent: WonderComponentTypeTransform.Index.transform => WonderEngineCore.RegisterComponentType.component =
  "%identity"

external geometryToComponent: WonderComponentTypeGeometry.Index.geometry => WonderEngineCore.RegisterComponentType.component =
  "%identity"

external componentToGeometry: WonderEngineCore.RegisterComponentType.component => WonderComponentTypeGeometry.Index.geometry =
  "%identity"

external directionLightToComponent: WonderComponentTypeDirectionlight.Index.directionLight => WonderEngineCore.RegisterComponentType.component =
  "%identity"

external basicCameraViewToComponent: WonderComponentTypeBasiccameraview.Index.basicCameraView => WonderEngineCore.RegisterComponentType.component =
  "%identity"

external componentToBasicCameraView: WonderEngineCore.RegisterComponentType.component => WonderComponentTypeBasiccameraview.Index.basicCameraView =
  "%identity"

external perspectiveCameraProjectionToComponent: WonderComponentTypePerspectivecameraprojection.Index.perspectiveCameraProjection => WonderEngineCore.RegisterComponentType.component =
  "%identity"
