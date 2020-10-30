let getPMatrix = cameraProjection => {
  PMatrixPerspectiveCameraProjectionDoService.getPMatrix(cameraProjection);
};

let getFovy = cameraProjection => {
  FrustumPerspectiveCameraProjectionDoService.getFovy(cameraProjection);
};

let getAspect = cameraProjection => {
  FrustumPerspectiveCameraProjectionDoService.getAspect(cameraProjection);
};

let getNear = cameraProjection => {
  FrustumPerspectiveCameraProjectionDoService.getNear(cameraProjection);
};

let getFar = cameraProjection => {
  FrustumPerspectiveCameraProjectionDoService.getFar(cameraProjection);
};
