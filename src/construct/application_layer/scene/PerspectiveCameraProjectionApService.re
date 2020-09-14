let create = () => {
  CreatePerspectiveCameraProjectionDoService.create();
};

let getGameObject = cameraProjection => {
  GameObjectPerspectiveCameraProjectionDoService.getGameObject(
    cameraProjection,
  );
};

let getPMatrix = cameraProjection => {
  PMatrixPerspectiveCameraProjectionDoService.getPMatrix(cameraProjection);
};

let getFovy = cameraProjection => {
  FrustumPerspectiveCameraProjectionDoService.getFovy(cameraProjection);
};

let setFovy = (cameraProjection, fovy) => {
  FrustumPerspectiveCameraProjectionDoService.setFovy(cameraProjection, fovy);
};

let getAspect = cameraProjection => {
  FrustumPerspectiveCameraProjectionDoService.getAspect(cameraProjection);
};

let setAspect = (cameraProjection, aspect) => {
  FrustumPerspectiveCameraProjectionDoService.setAspect(
    cameraProjection,
    aspect,
  );
};

let getNear = cameraProjection => {
  FrustumPerspectiveCameraProjectionDoService.getNear(cameraProjection);
};

let setNear = (cameraProjection, near) => {
  FrustumPerspectiveCameraProjectionDoService.setNear(cameraProjection, near);
};

let getFar = cameraProjection => {
  FrustumPerspectiveCameraProjectionDoService.getFar(cameraProjection);
};

let setFar = (cameraProjection, far) => {
  FrustumPerspectiveCameraProjectionDoService.setFar(cameraProjection, far);
};

let markDirty = DirtyPerspectiveCameraProjectionDoService.markDirty;

let markNotDirty = DirtyPerspectiveCameraProjectionDoService.markNotDirty;

let update = UpdatePerspectiveCameraProjectionDoService.update;
