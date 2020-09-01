let create = () => {
  PerspectiveCameraProjectionApService.create();
};

let getGameObject = cameraProjection => {
  PerspectiveCameraProjectionApService.getGameObject(cameraProjection);
};

let getPMatrix = cameraProjection => {
  PerspectiveCameraProjectionApService.getPMatrix(cameraProjection);
};

let getFovy = cameraProjection => {
  PerspectiveCameraProjectionApService.getFovy(cameraProjection);
};

let setFovy = (cameraProjection, fovy) => {
  PerspectiveCameraProjectionApService.setFovy(cameraProjection, fovy);
};

let getAspect = cameraProjection => {
  PerspectiveCameraProjectionApService.getAspect(cameraProjection);
};

let setAspect = (cameraProjection, aspect) => {
  PerspectiveCameraProjectionApService.setAspect(cameraProjection, aspect);
};

let getNear = cameraProjection => {
  PerspectiveCameraProjectionApService.getNear(cameraProjection);
};

let setNear = (cameraProjection, near) => {
  PerspectiveCameraProjectionApService.setNear(cameraProjection, near);
};

let getFar = cameraProjection => {
  PerspectiveCameraProjectionApService.getFar(cameraProjection);
};

let setFar = (cameraProjection, far) => {
  PerspectiveCameraProjectionApService.setFar(cameraProjection, far);
};

let markDirty = PerspectiveCameraProjectionApService.markDirty;

let markDirty = PerspectiveCameraProjectionApService.markNotDirty;
