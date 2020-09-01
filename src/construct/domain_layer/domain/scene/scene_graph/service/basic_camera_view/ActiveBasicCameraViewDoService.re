let isActive = cameraView => {
  DpContainer.unsafeGetBasicCameraViewRepoDp().isActive(
    cameraView->BasicCameraViewEntity.value,
  );
};

let active = cameraView => {
  DpContainer.unsafeGetBasicCameraViewRepoDp().setAllNotActive();

  DpContainer.unsafeGetBasicCameraViewRepoDp().setActive(
    cameraView->BasicCameraViewEntity.value,
    true,
  );
};

let unactive = cameraView => {
  DpContainer.unsafeGetBasicCameraViewRepoDp().setActive(
    cameraView->BasicCameraViewEntity.value,
    false,
  );
};

let setActive = (cameraView, isActive) => {
  DpContainer.unsafeGetBasicCameraViewRepoDp().setActive(
    cameraView->BasicCameraViewEntity.value,
    isActive,
  );
};

let getActiveCameraView = () =>
  DpContainer.unsafeGetBasicCameraViewRepoDp().getActiveBasicCameraViews()
  ->Result.mapSuccess(activeCameraViews => {activeCameraViews->ListSt.head});
