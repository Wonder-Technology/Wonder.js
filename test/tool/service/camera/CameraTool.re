let createBasicCameraViewPerspectiveCamera = (state) => {
  open BasicCameraViewAPI;
  open PerspectiveCameraProjectionAPI;
  let (state, perspectiveCameraProjection) = createPerspectiveCameraProjection(state);
  let (state, basicCameraView) = createBasicCameraView(state);
  let state =
    state
    |> setPerspectiveCameraNear(perspectiveCameraProjection, 0.1)
    |> setPerspectiveCameraFar(perspectiveCameraProjection, 1000.)
    |> setPerspectiveCameraFovy(perspectiveCameraProjection, 60.)
    |> setPerspectiveCameraAspect(perspectiveCameraProjection, 1.);
  (state, basicCameraView, perspectiveCameraProjection)
};

let createCameraGameObject = (state) => {
  open GameObjectAPI;
  open BasicCameraViewAPI;
  let (state, basicCameraView, perspectiveCameraProjection) =
    createBasicCameraViewPerspectiveCamera(state);
  /* TODO refactor */
  let (state, gameObject) = state |> GameObject.createGameObject;
  let state = state |> addGameObjectBasicCameraViewComponent(gameObject, basicCameraView);
  let state =
    state
    |> addGameObjectPerspectiveCameraProjectionComponent(gameObject, perspectiveCameraProjection);
  (
    state,
    gameObject,
  /* TODO refactor */
    GameObject.getGameObjectTransformComponent(gameObject, state),
    (basicCameraView, perspectiveCameraProjection)
  )
};

let testBuildPMatrix = (stateFunc, execFunc) =>
  Wonder_jest.(
    PerspectiveCameraProjectionAPI.(
      Expect.(
        Expect.Operators.(
          test(
            "build dirty pMatrix",
            () => {
              let (state, basicCameraView, perspectiveCameraProjection) =
                createBasicCameraViewPerspectiveCamera(stateFunc());
              let state = state |> execFunc;
              state
              |> unsafeGetPerspectiveCameraProjectionPMatrix(perspectiveCameraProjection)
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
  );