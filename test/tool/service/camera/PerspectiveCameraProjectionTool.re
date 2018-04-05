open StateDataMainType;
let isPerspectiveCameraProjection = (cameraProjection) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(cameraProjection) >= 0
};


let unsafeGetPMatrix = (cameraProjection, state: StateDataMainType.state) =>
  PMatrixService.unsafeGetPMatrix(
    cameraProjection,
    state.perspectiveCameraProjectionRecord.pMatrixMap
  );

let getDirtyArray = (state) => state.perspectiveCameraProjectionRecord.dirtyArray;

let init = (state: StateDataMainType.state) =>
  InitPerspectiveCameraProjectionService.init(state.perspectiveCameraProjectionRecord);

let update = (state: StateDataMainType.state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    UpdatePerspectiveCameraProjectionService.update(state.perspectiveCameraProjectionRecord)
};

let updateCameraProjection = (cameraProjection, state: StateDataMainType.state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    UpdatePerspectiveCameraProjectionService.updateCameraProjection(
      cameraProjection,
      state.perspectiveCameraProjectionRecord
    )
};

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
    0.
  |]);