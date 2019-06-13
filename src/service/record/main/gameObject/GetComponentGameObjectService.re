open StateDataMainType;

open GameObjectType;

open ComponentMapService;

let getScriptComponent =
  (. uid: int, {scriptMap}) => scriptMap |> getComponent(uid);

let unsafeGetScriptComponent = (uid: int, {scriptMap}) =>
  scriptMap |> unsafeGetComponent(uid);

let getBasicCameraViewComponent =
  (. uid: int, {basicCameraViewMap}) =>
    basicCameraViewMap |> getComponent(uid);

let unsafeGetBasicCameraViewComponent = (uid: int, {basicCameraViewMap}) =>
  basicCameraViewMap |> unsafeGetComponent(uid);

let getPerspectiveCameraProjectionComponent =
  (. uid: int, {perspectiveCameraProjectionMap}) =>
    perspectiveCameraProjectionMap |> getComponent(uid);

let unsafeGetPerspectiveCameraProjectionComponent =
    (uid: int, {perspectiveCameraProjectionMap}) =>
  perspectiveCameraProjectionMap |> unsafeGetComponent(uid);

let getFlyCameraControllerComponent =
  (. uid: int, {flyCameraControllerMap}) =>
    flyCameraControllerMap |> getComponent(uid);

let unsafeGetFlyCameraControllerComponent =
    (uid: int, {flyCameraControllerMap}) =>
  flyCameraControllerMap |> unsafeGetComponent(uid);

let getArcballCameraControllerComponent =
  (. uid: int, {arcballCameraControllerMap}) =>
    arcballCameraControllerMap |> getComponent(uid);

let unsafeGetArcballCameraControllerComponent =
    (uid: int, {arcballCameraControllerMap}) =>
  arcballCameraControllerMap |> unsafeGetComponent(uid);

let getTransformComponent =
  (. uid: int, {transformMap}) => transformMap |> getComponent(uid);

let unsafeGetTransformComponent = (uid: int, {transformMap}) =>
  transformMap |> unsafeGetComponent(uid);

let getGeometryComponent =
  (. uid: int, {geometryMap}) => geometryMap |> getComponent(uid);

let unsafeGetGeometryComponent = (uid: int, {geometryMap}) =>
  geometryMap |> unsafeGetComponent(uid);

let getBasicMaterialComponent =
  (. uid: int, {basicMaterialMap}) => basicMaterialMap |> getComponent(uid);

let getLightMaterialComponent =
  (. uid: int, {lightMaterialMap}) => lightMaterialMap |> getComponent(uid);

let unsafeGetBasicMaterialComponent =
  (. uid: int, {basicMaterialMap}) =>
    basicMaterialMap |> unsafeGetComponent(uid);

let unsafeGetLightMaterialComponent =
  (. uid: int, {lightMaterialMap}) =>
    lightMaterialMap |> unsafeGetComponent(uid);

let getMeshRendererComponent =
  (. uid: int, {meshRendererMap}) => meshRendererMap |> getComponent(uid);

let unsafeGetMeshRendererComponent = (uid: int, {meshRendererMap}) =>
  meshRendererMap |> unsafeGetComponent(uid);

let getDirectionLightComponent =
  (. uid: int, {directionLightMap}) =>
    directionLightMap |> getComponent(uid);

let unsafeGetDirectionLightComponent = (uid: int, {directionLightMap}) =>
  directionLightMap |> unsafeGetComponent(uid);

let getPointLightComponent =
  (. uid: int, {pointLightMap}) => pointLightMap |> getComponent(uid);

let unsafeGetPointLightComponent = (uid: int, {pointLightMap}) =>
  pointLightMap |> unsafeGetComponent(uid);

let getSourceInstanceComponent =
  (. uid: int, {sourceInstanceMap}) =>
    sourceInstanceMap |> getComponent(uid);

let unsafeGetSourceInstanceComponent = (uid: int, {sourceInstanceMap}) =>
  sourceInstanceMap |> unsafeGetComponent(uid);

let getObjectInstanceComponent =
  (. uid: int, {objectInstanceMap}) =>
    objectInstanceMap |> getComponent(uid);

let unsafeGetObjectInstanceComponent = (uid: int, {objectInstanceMap}) =>
  objectInstanceMap |> unsafeGetComponent(uid);