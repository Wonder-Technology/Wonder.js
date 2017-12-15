open CameraControllerType;

let getGameObject = (cameraController: cameraController, state: StateDataType.state) =>
  CameraControllerSystem.getGameObject(cameraController, state);

let getCurrentCameraController = (state: StateDataType.state) =>
  CameraControllerSystem.getCurrentCameraController(state);

let getWorldToCameraMatrix = (transform, state: StateDataType.state) =>
  CameraControllerSystem.getWorldToCameraMatrix(transform, state);

let getPMatrix = (cameraController: cameraController, state: StateDataType.state) =>
  CameraControllerSystem.getPMatrix(cameraController, state);

let deepCopyState = CameraControllerSystem.deepCopyState;