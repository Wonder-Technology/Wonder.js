open StateDataMainType;

open GameObjectType;

open ComponentMapService;

let getBasicCameraViewComponent =
  [@bs] ((uid: int, {basicCameraViewMap}) => basicCameraViewMap |> getComponent(uid));

let unsafeGetBasicCameraViewComponent = (uid: int, {basicCameraViewMap}) =>
  basicCameraViewMap |> unsafeGetComponent(uid);

let getPerspectiveCameraProjectionComponent =
  [@bs]
  (
    (uid: int, {perspectiveCameraProjectionMap}) =>
      perspectiveCameraProjectionMap |> getComponent(uid)
  );

let unsafeGetPerspectiveCameraProjectionComponent = (uid: int, {perspectiveCameraProjectionMap}) =>
  perspectiveCameraProjectionMap |> unsafeGetComponent(uid);

let getTransformComponent =
  [@bs] ((uid: int, {transformMap}) => transformMap |> getComponent(uid));

let unsafeGetTransformComponent = (uid: int, {transformMap}) =>
  transformMap |> unsafeGetComponent(uid);

let unsafeGetGeometryComponentData = (uid, {currentGeometryDataMap}) =>
  CurrentComponentDataMapRenderService.unsafeGetComponentData(uid, currentGeometryDataMap);

let getGeometryComponentData =
  [@bs]
  (
    (uid: int, {currentGeometryDataMap}) =>
      currentGeometryDataMap |> CurrentComponentDataMapRenderService.getComponentData(uid)
  );

let unsafeGetGeometryComponent = (uid: int, {currentGeometryDataMap}) => {
  let (component, _) =
    currentGeometryDataMap |> CurrentComponentDataMapRenderService.unsafeGetComponentData(uid);
  component
};

let getBasicMaterialComponent =
  [@bs] ((uid: int, {basicMaterialMap}) => basicMaterialMap |> getComponent(uid));

let getLightMaterialComponent =
  [@bs] ((uid: int, {lightMaterialMap}) => lightMaterialMap |> getComponent(uid));

let unsafeGetBasicMaterialComponent =
  [@bs] ((uid: int, {basicMaterialMap}) => basicMaterialMap |> unsafeGetComponent(uid));

let unsafeGetLightMaterialComponent =
  [@bs] ((uid: int, {lightMaterialMap}) => lightMaterialMap |> unsafeGetComponent(uid));

let getMeshRendererComponent =
  [@bs] ((uid: int, {meshRendererMap}) => meshRendererMap |> getComponent(uid));

let unsafeGetMeshRendererComponent = (uid: int, {meshRendererMap}) =>
  meshRendererMap |> unsafeGetComponent(uid);

let getAmbientLightComponent =
  [@bs] ((uid: int, {ambientLightMap}) => ambientLightMap |> getComponent(uid));

let unsafeGetAmbientLightComponent = (uid: int, {ambientLightMap}) =>
  ambientLightMap |> unsafeGetComponent(uid);

let getDirectionLightComponent =
  [@bs] ((uid: int, {directionLightMap}) => directionLightMap |> getComponent(uid));

let unsafeGetDirectionLightComponent = (uid: int, {directionLightMap}) =>
  directionLightMap |> unsafeGetComponent(uid);

let getPointLightComponent =
  [@bs] ((uid: int, {pointLightMap}) => pointLightMap |> getComponent(uid));

let unsafeGetPointLightComponent = (uid: int, {pointLightMap}) =>
  pointLightMap |> unsafeGetComponent(uid);

let getSourceInstanceComponent =
  [@bs] ((uid: int, {sourceInstanceMap}) => sourceInstanceMap |> getComponent(uid));

let unsafeGetSourceInstanceComponent = (uid: int, {sourceInstanceMap}) =>
  sourceInstanceMap |> unsafeGetComponent(uid);

let getObjectInstanceComponent =
  [@bs] ((uid: int, {objectInstanceMap}) => objectInstanceMap |> getComponent(uid));

let unsafeGetObjectInstanceComponent = (uid: int, {objectInstanceMap}) =>
  objectInstanceMap |> unsafeGetComponent(uid);