let getGameObject = cameraView => {
  GameObjectBasicCameraViewDoService.getGameObject(cameraView);
};

let getViewWorldToCameraMatrix = cameraView => {
  ViewMatrixBasicCameraViewDoService.getViewWorldToCameraMatrix(cameraView);
};

let getActiveBasicCameraView = sceneGameObject =>
  ActiveBasicCameraViewDoService.getActiveCameraView(sceneGameObject);
