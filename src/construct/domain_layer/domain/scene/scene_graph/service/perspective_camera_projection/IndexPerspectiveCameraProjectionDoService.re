let getMaxIndex = () => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().getMaxIndex();
};

let setMaxIndex = maxIndex => {
  DpContainer.unsafeGetPerspectiveCameraProjectionRepoDp().setMaxIndex(
    maxIndex,
  );
};
