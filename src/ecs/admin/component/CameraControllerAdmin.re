open CameraControllerType;

let getGameObject = (cameraController: cameraController, state: StateDataType.state) =>
  CameraControllerSystem.getGameObject(cameraController, state);

let getCurrentCameraController = (state: StateDataType.state) =>
  CameraControllerSystem.getCurrentCameraController(state);

let getWorldToCameraMatrix = (transform, state: StateDataType.state) =>
  CameraControllerSystem.getWorldToCameraMatrix(transform, state);

let getNormalMatrix = (transform, state: StateDataType.state) =>
  CameraControllerSystem.getNormalMatrix(transform, state);

let getPosition = (transform, state: StateDataType.state) =>
  CameraControllerSystem.getPosition(transform, state);

let unsafeGetPMatrix = (cameraController: cameraController, state: StateDataType.state) =>
  CameraControllerSystem.unsafeGetPMatrix(cameraController, state);

let deepCopyStateForRestore = CameraControllerSystem.deepCopyStateForRestore;