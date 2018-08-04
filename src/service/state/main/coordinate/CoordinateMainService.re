open StateDataMainType;

let convertWorldToScreen =
    (
      cameraView,
      cameraProjection,
      (worldX, worldY, worldZ, screenWidth, screenHeight),
      state,
    ) => {
  let (x, y, z, w) as normalizedDeviceCoordinate =
    Matrix4Service.multiply(
      PMatrixService.unsafeGetPMatrix(
        cameraProjection,
        state.perspectiveCameraProjectionRecord.pMatrixMap,
      ),
      ViewMatrixBasicCameraViewMainService.getBasicCameraViewWorldToCameraMatrix(
        cameraView,
        state,
      ),
      Matrix4Service.createIdentityMatrix4(),
    )
    |> Vector4Service.transformMat4Tuple((worldX, worldY, worldZ, 1.));

  w < 0. ?
    ((-100.), (-100.)) :
    {
      let (x, y, z) as ndcSpacePos = (x /. w, y /. w, z /. w);

      (
        Js.Math.round((x +. 1.) /. 2. *. screenWidth),
        Js.Math.round((1. -. y) /. 2. *. screenHeight),
      );
    };
};