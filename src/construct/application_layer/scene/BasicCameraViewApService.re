let create = () => {
  CreateBasicCameraViewDoService.create();
};

let getGameObject = cameraView => {
  GameObjectBasicCameraViewDoService.getGameObject(cameraView);
};

let getViewWorldToCameraMatrix = cameraView => {
  ViewMatrixBasicCameraViewDoService.getViewWorldToCameraMatrix(cameraView);
};

let isActive = cameraView => {
  ActiveBasicCameraViewDoService.isActive(cameraView);
};

let active = cameraView => {
  ActiveBasicCameraViewDoService.active(cameraView);
};

let unactive = cameraView => {
  ActiveBasicCameraViewDoService.unactive(cameraView);
};

let setActive = (cameraView, isActive) => {
  ActiveBasicCameraViewDoService.setActive(cameraView, isActive);
};

let getActiveBasicCameraView = () =>
  ActiveBasicCameraViewDoService.getActiveCameraView();
