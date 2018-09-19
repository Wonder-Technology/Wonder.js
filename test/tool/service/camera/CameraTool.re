let createBasicCameraViewPerspectiveCamera = state => {
  open BasicCameraViewAPI;
  open PerspectiveCameraProjectionAPI;
  let (state, perspectiveCameraProjection) =
    createPerspectiveCameraProjection(state);
  let (state, basicCameraView) = createBasicCameraView(state);
  let state =
    state
    |> setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.1)
    |> setPerspectiveCameraProjectionFar(perspectiveCameraProjection, 1000.)
    |> setPerspectiveCameraProjectionFovy(perspectiveCameraProjection, 60.)
    |> setPerspectiveCameraProjectionAspect(perspectiveCameraProjection, 1.);
  (state, basicCameraView, perspectiveCameraProjection);
};

let createBasicCameraViewPerspectiveCameraWithoutAspect = state => {
  let (state, basicCameraView, perspectiveCameraProjection) =
    createBasicCameraViewPerspectiveCamera(state);

  let state =
    PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionAspect(
      perspectiveCameraProjection,
      Js.Nullable.undefined |> Obj.magic,
      state,
    );
  (state, basicCameraView, perspectiveCameraProjection);
};

let createCameraGameObjectWithFunc =
    (createBasicCameraViewPerspectiveCameraFunc, state) => {
  open GameObjectAPI;
  open BasicCameraViewAPI;
  let (state, basicCameraView, perspectiveCameraProjection) =
    createBasicCameraViewPerspectiveCameraFunc(state);
  let (state, gameObject) = state |> GameObjectAPI.createGameObject;
  let state =
    state
    |> addGameObjectBasicCameraViewComponent(gameObject, basicCameraView);
  let state =
    state
    |> addGameObjectPerspectiveCameraProjectionComponent(
         gameObject,
         perspectiveCameraProjection,
       );

  let state =
    BasicCameraViewAPI.activeBasicCameraView(basicCameraView, state);

  (
    state,
    gameObject,
    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
    (basicCameraView, perspectiveCameraProjection),
  );
};

let createCameraGameObject = state =>
  createCameraGameObjectWithFunc(
    createBasicCameraViewPerspectiveCamera,
    state,
  );

let createCameraGameObjectWithoutAspect = state => {
  let (state, gameObject, transform, (basicCameraView, cameraProjection)) =
    createCameraGameObject(state);

  let state =
    PerspectiveCameraProjectionAPI.setPerspectiveCameraProjectionAspect(
      cameraProjection,
      Js.Nullable.undefined |> Obj.magic,
      state,
    );

  (state, gameObject, transform, (basicCameraView, cameraProjection));
};

let testBuildPMatrix = (stateFunc, execFunc) =>
  Wonder_jest.(
    PerspectiveCameraProjectionAPI.(
      Expect.(
        Expect.Operators.(
          test("build dirty pMatrix", () => {
            let (state, basicCameraView, perspectiveCameraProjection) =
              createBasicCameraViewPerspectiveCamera(stateFunc());
            let state = state |> execFunc;
            state
            |> unsafeGetPerspectiveCameraProjectionPMatrix(
                 perspectiveCameraProjection,
               )
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
                        0.,
                      |]);
          })
        )
      )
    )
  );