open StateDataMainType;

open CameraGroupType;

let createCameraGroup =
    ((createCameraViewFunc, createCameraProjectionFunc), state) => {
  let (state, cameraView) = createCameraViewFunc(state);
  let (state, cameraProjection) = createCameraProjectionFunc(state);

  (state, {cameraView, cameraProjection});
};

let addCameraGroupComponents =
    (
      gameObject,
      {cameraView, cameraProjection},
      (addCameraViewComponentFunc, addCameraProjectionComponentFunc),
      state,
    ) =>
  state
  |> addCameraViewComponentFunc(gameObject, cameraView)
  |> addCameraProjectionComponentFunc(gameObject, cameraProjection);

let disposeCameraGroupComponents =
    (
      gameObject,
      {cameraView, cameraProjection},
      (disposeCameraViewComponentFunc, disposeCameraProjectionComponentFunc),
      state,
    ) =>
  state
  |> disposeCameraViewComponentFunc(gameObject, cameraView)
  |> disposeCameraProjectionComponentFunc(gameObject, cameraProjection);

let unsafeGetCameraGroupComponents =
    (
      gameObject,
      (
        unsafeGetCameraViewComponentFunc,
        unsafeGetCameraProjectionComponentFunc,
      ),
      state,
    ) => {
  cameraView: state |> unsafeGetCameraViewComponentFunc(gameObject),
  cameraProjection:
    state |> unsafeGetCameraProjectionComponentFunc(gameObject),
};

let hasCameraGroupComponents =
    (
      gameObject,
      (hasCameraViewComponentFunc, hasCameraProjectionComponentFunc),
      state,
    ) =>
  state
  |> hasCameraViewComponentFunc(gameObject)
  && state
  |> hasCameraProjectionComponentFunc(gameObject);