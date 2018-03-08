let getWorldToCameraMatrix = (cameraToWorldMatrix) =>
  Matrix4System.invert(cameraToWorldMatrix, Matrix4System.createIdentityMatrix4());