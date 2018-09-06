open StateDataMainType;

let isPerspectiveCameraProjection = cameraProjection => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(cameraProjection) >= 0;
};

let unsafeGetPMatrix = (cameraProjection, state: StateDataMainType.state) =>
  PMatrixService.unsafeGetPMatrix(
    cameraProjection,
    state.perspectiveCameraProjectionRecord.pMatrixMap,
  );

let getDirtyArray = state =>
  state.perspectiveCameraProjectionRecord.dirtyArray;

let init = (state: StateDataMainType.state) =>
  InitPerspectiveCameraProjectionMainService.init(state);

let update = (state: StateDataMainType.state) =>
  UpdatePerspectiveCameraProjectionMainService.update(state);

let updateCameraProjection =
    (cameraProjection, state: StateDataMainType.state) =>
  UpdatePerspectiveCameraProjectionMainService.updateCameraProjection(
    cameraProjection,
    state,
  );

let getPMatrixOfCreateBasicCameraViewPerspectiveCamera = () =>
  Js.Typed_array.Float32Array.make([|
    1.7320508075688776,
    0.,
    0.,
    0.,
    0.,
    1.7320508075688776,
    0.,
    0.,
    0.,
    0.,
    (-1.0002000200020003),
    (-1.),
    0.,
    0.,
    (-0.2000200020002),
    0.,
  |]);

let unsafeGetNear = (cameraProjection, state: StateDataMainType.state) =>
  FrustumPerspectiveCameraProjectionService.unsafeGetNear(
    cameraProjection,
    state.perspectiveCameraProjectionRecord,
  );

let unsafeGetFar = (cameraProjection, state: StateDataMainType.state) =>
  FrustumPerspectiveCameraProjectionService.unsafeGetFar(
    cameraProjection,
    state.perspectiveCameraProjectionRecord,
  );

let unsafeGetFovy = (cameraProjection, state: StateDataMainType.state) =>
  FrustumPerspectiveCameraProjectionService.unsafeGetFovy(
    cameraProjection,
    state.perspectiveCameraProjectionRecord,
  );

let unsafeGetAspect = (cameraProjection, state: StateDataMainType.state) =>
  PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraAspect(
    cameraProjection,
    state,
  );

let getAspect = (cameraProjection, state: StateDataMainType.state) =>
  FrustumPerspectiveCameraProjectionService.getAspect(
    cameraProjection,
    state.perspectiveCameraProjectionRecord,
  );