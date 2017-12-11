open CameraControllerType;

let getTransformFromCameraController =
    (cameraController: cameraController, state: StateDataType.state) =>
  switch (CameraControllerAdmin.getGameObject(cameraController, state)) {
  | None => ExceptionHandleSystem.throwMessage("cameraController's gameObject should exist")
  | Some(gameObject) => GameObjectAdmin.unsafeGetTransformComponent(gameObject, state)
  };