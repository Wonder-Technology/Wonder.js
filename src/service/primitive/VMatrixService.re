let getWorldToCameraMatrix = (cameraToWorldMatrix) =>
  Matrix4Service.invert(cameraToWorldMatrix, Matrix4Service.createIdentityMatrix4());