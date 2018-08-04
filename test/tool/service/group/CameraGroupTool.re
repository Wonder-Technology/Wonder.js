let createCameraGroup = state =>
  CameraGroupAPI.createCameraGroup(
    (
      BasicCameraViewAPI.createBasicCameraView,
      PerspectiveCameraProjectionAPI.createPerspectiveCameraProjection,
    ),
    state,
  );

let addGameObjectCameraGroupComponents = (gameObject, cameraGroup, state) =>
  CameraGroupAPI.addGameObjectCameraGroupComponents(
    gameObject,
    cameraGroup,
    (
      GameObjectAPI.addGameObjectBasicCameraViewComponent,
      GameObjectAPI.addGameObjectPerspectiveCameraProjectionComponent,
    ),
    state,
  );

let disposeGameObjectCameraGroupComponents = (gameObject, cameraGroup, state) =>
  CameraGroupAPI.disposeGameObjectCameraGroupComponents(
    gameObject,
    cameraGroup,
    (
      GameObjectAPI.disposeGameObjectBasicCameraViewComponent,
      GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent,
    ),
    state,
  );

let unsafeGetGameObjectCameraGroupComponents = (gameObject, state) =>
  CameraGroupAPI.unsafeGetGameObjectCameraGroupComponents(
    gameObject,
    (
      GameObjectAPI.unsafeGetGameObjectBasicCameraViewComponent,
      GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent,
    ),
    state,
  );

let hasGameObjectCameraGroupComponents = (gameObject, state) =>
  CameraGroupAPI.hasGameObjectCameraGroupComponents(
    gameObject,
    (
      GameObjectAPI.hasGameObjectBasicCameraViewComponent,
      GameObjectAPI.hasGameObjectPerspectiveCameraProjectionComponent,
    ),
    state,
  );