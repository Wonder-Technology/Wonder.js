open BasicCameraViewType;

let isBasicCameraView = (basicCameraView) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(basicCameraView) >= 0
};

let getWorldToCameraMatrix = (transform, state: StateDataType.state) =>
  VMatrixService.getWorldToCameraMatrix(
    TransformSystem.getLocalToWorldMatrixTypeArray(transform, state)
  );

let getPosition = (transform, state: StateDataType.state) =>
  TransformSystem.getPositionTuple(transform, state);

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
              |> unsafeGetBasicCameraViewPMatrix(basicCameraView)
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