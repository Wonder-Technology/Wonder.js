let create = () => {
  BasicCameraViewApService.create();
};

let getGameObject = cameraView => {
  BasicCameraViewApService.getGameObject(cameraView);
};

let getViewWorldToCameraMatrix = cameraView => {
  BasicCameraViewApService.getViewWorldToCameraMatrix(cameraView);
};

let isActive = cameraView => {
  BasicCameraViewApService.isActive(cameraView);
};

let active = cameraView => {
  BasicCameraViewApService.active(cameraView);
};

let unactive = cameraView => {
  BasicCameraViewApService.unactive(cameraView);
};

let setActive = (cameraView, isActive) => {
  BasicCameraViewApService.setActive(cameraView, isActive);
};

let getActiveBasicCameraView = () =>
  BasicCameraViewApService.getActiveBasicCameraView();
