open BasicCameraViewType;

let isBasicCameraView = (basicCameraView) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(basicCameraView) >= 0
};

let getWorldToCameraMatrix = (transform, state: StateDataType.state) =>
  VMatrixService.getWorldToCameraMatrix(
    ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(transform, state.transformRecord)
  );

let getPosition = (transform, state: StateDataType.state) =>
  UpdateTransformService.updateAndGetPositionTuple(
    transform,
    state.globalTempRecord,
    state.transformRecord
  );
/* let getCurrentBasicCameraView = BasicCameraViewSystem.getCurrentBasicCameraView; */
/* let testBuildPMatrix = (stateFunc, execFunc) =>
   Wonder_jest.(
     BasicCameraViewAPI.(
       Expect.(
         Expect.Operators.(
           test(
             "build dirty basicCameraViews' pMatrix",
             () => {
               let (state, basicCameraView) = createBasicCameraViewPerspectiveCamera(stateFunc());
               let state = state |> execFunc;
               state
               |> unsafeGetPerspectiveCameraProjectionPMatrix(basicCameraView)
               |>
               expect == Js.Typed_array.Float32Array.make([|
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
                         |])
             }
           )
         )
       )
     )
   ); */