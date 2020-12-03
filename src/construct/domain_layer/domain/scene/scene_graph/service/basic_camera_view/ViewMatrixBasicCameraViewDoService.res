let getViewWorldToCameraMatrix = cameraView =>
  DpContainer.unsafeGetBasicCameraViewRepoDp().getViewWorldToCameraMatrix(
    cameraView->BasicCameraViewEntity.value,
  )->ViewMatrixVO.create
