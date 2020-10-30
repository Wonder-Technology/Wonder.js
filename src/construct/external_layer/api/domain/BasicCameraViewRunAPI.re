let getGameObject = cameraView => {
  BasicCameraViewApService.getGameObject(cameraView);
};

let getViewWorldToCameraMatrix = cameraView => {
  BasicCameraViewApService.getViewWorldToCameraMatrix(cameraView);
};

let getActiveBasicCameraView = sceneGameObject =>
  BasicCameraViewApService.getActiveBasicCameraView(sceneGameObject);
