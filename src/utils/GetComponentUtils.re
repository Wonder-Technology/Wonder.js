open CameraControllerType;

let getTransformFromCameraController =
    (cameraController: cameraController, state: StateDataType.state) =>
  switch (CameraControllerAdmin.getGameObject(cameraController, state)) {
  /* TODO use fatal instead of throwMessage */
  | None => ExceptionHandleSystem.throwMessage("cameraController's gameObject should exist")
  | Some(gameObject) => GameObjectAdmin.unsafeGetTransformComponent(gameObject, state)
  };