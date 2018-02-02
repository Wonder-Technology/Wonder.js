open CameraControllerType;

let getTransformFromCameraController =
    (cameraController: cameraController, state: StateDataType.state) =>
  switch (CameraControllerAdmin.getGameObject(cameraController, state)) {
  | None =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getTransformFromCameraController",
        ~description={j|cameraController's gameObject should exist|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|cameraController: $cameraController|j}
      )
    )
  | Some(gameObject) => GameObjectAdmin.unsafeGetTransformComponent(gameObject, state)
  };