open StateDataMainType;

open WonderWebgl.Gl;

open EditorType;

/* TODO fix */
let _unsafeGetSceneViewActiveBasicCameraView = state => 0;

/* TODO fix */
let _unsafeGetGameViewActiveBasicCameraView = state => 1;

let _unsafeGetSceneViewActivePerspectiveCameraProjection = state =>
  _unsafeGetSceneViewActiveBasicCameraView(state)
  |> BasicCameraViewAPI.unsafeGetBasicCameraViewGameObject(_, state)
  |> GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent(
       _,
       state,
     );

let _unsafeGetGameViewActivePerspectiveCameraProjection = state =>
  _unsafeGetGameViewActiveBasicCameraView(state)
  |> BasicCameraViewAPI.unsafeGetBasicCameraViewGameObject(_, state)
  |> GameObjectAPI.unsafeGetGameObjectPerspectiveCameraProjectionComponent(
       _,
       state,
     );

let _computeAspect = ((_, _, width, height)) =>
  (width |> NumberType.intToFloat) /. (height |> NumberType.intToFloat);

let _activeViewCamera =
    (
      viewRect,
      viewActiveBasicCameraView,
      viewActivePerspectiveCameraProjection,
      state,
    ) => {
  let state =
    switch (
      FrustumPerspectiveCameraProjectionMainService.getAspect(
        viewActivePerspectiveCameraProjection,
        state,
      )
    ) {
    | None =>
      FrustumPerspectiveCameraProjectionMainService.setAspect(
        viewActivePerspectiveCameraProjection,
        _computeAspect(viewRect),
        state,
      )
      |> UpdatePerspectiveCameraProjectionMainService.update
      |> FrustumPerspectiveCameraProjectionMainService.removeAspect(
           viewActivePerspectiveCameraProjection,
         )
      |> PerspectiveCameraProjectionAPI.markPerspectiveCameraProjectionNotDirty(
           viewActivePerspectiveCameraProjection,
         )
    | Some(aspect) => state
    };

  BasicCameraViewAPI.activeBasicCameraView(viewActiveBasicCameraView, state);
};

let _activeSceneViewCamera = state => {
  let {sceneViewRect} as editorState = Editor.getEditorState();

  _activeViewCamera(
    sceneViewRect,
    _unsafeGetSceneViewActiveBasicCameraView(state),
    _unsafeGetSceneViewActivePerspectiveCameraProjection(state),
    state,
  );
};

let _activeGameViewCamera = state => {
  let {gameViewRect} as editorState = Editor.getEditorState();

  _activeViewCamera(
    gameViewRect,
    _unsafeGetGameViewActiveBasicCameraView(state),
    _unsafeGetGameViewActivePerspectiveCameraProjection(state),
    state,
  );
};

let _prepareRenderViewJob = (viewRect, _activeViewCameraFunc, state) =>
  state
  |> DeviceManagerAPI.setViewport(viewRect)
  |> DeviceManagerAPI.setScissorTest(true)
  |> DeviceManagerAPI.setScissor(viewRect)
  |> _activeViewCameraFunc;

let prepareRenderSceneViewJob = (_, state) => {
  let {sceneViewRect} = Editor.getEditorState();

  _prepareRenderViewJob(sceneViewRect, _activeSceneViewCamera, state);
};

let prepareRenderGameViewJob = (_, state) => {
  let {gameViewRect} = Editor.getEditorState();

  _prepareRenderViewJob(gameViewRect, _activeGameViewCamera, state);
};

let restoreJob = (_, state) => {
  /* let gl = DeviceManagerAPI.unsafeGetGl(state); */
  let (x, y, width, height, _, _) as screenData =
    ScreenService.queryFullScreenData();
  let viewportData = (x, y, width, height);

  state
  |> DeviceManagerAPI.setViewport(viewportData)
  |> DeviceManagerAPI.setScissorTest(false);
};

let initDemo = (sceneViewRect, gameViewRect, state) => {
  let state =
    state
    |> JobAPI.registerNoWorkerInitJob(
         "init_event_for_editor",
         InitEventForEditorJob.initEventForEditorJob,
       )
    |> JobAPI.registerNoWorkerLoopJob(
         "prepare_render_scene_view",
         prepareRenderSceneViewJob,
       )
    |> JobAPI.registerNoWorkerLoopJob(
         "prepare_render_game_view",
         prepareRenderGameViewJob,
       )
    |> JobAPI.registerNoWorkerLoopJob("restore", restoreJob);

  let editorState = Editor.getEditorState();
  editorState.sceneViewRect = sceneViewRect;
  editorState.gameViewRect = gameViewRect;

  state;
};

let bindArcballCameraControllerEventForEditor = (cameraController, state) =>
  BindArcballCameraControllerEvent.bindEvent(cameraController, state);

let unsafeGetActiveCameraPerspectiveCameraProjection = state => {
  let {eventTarget} = Editor.getEditorState();

  switch (eventTarget) {
  | Scene => _unsafeGetSceneViewActivePerspectiveCameraProjection(state)
  | Game => _unsafeGetGameViewActivePerspectiveCameraProjection(state)
  };
};

let _getActiveCameraAspect = (activeCameraPerspectiveCameraProjection, state) =>
  switch (
    FrustumPerspectiveCameraProjectionService.getAspect(
      activeCameraPerspectiveCameraProjection,
      state.perspectiveCameraProjectionRecord,
    )
  ) {
  | Some(aspect) => aspect
  | None =>
    let {eventTarget, sceneViewRect, gameViewRect} = Editor.getEditorState();

    _computeAspect(
      switch (eventTarget) {
      | Scene => sceneViewRect
      | Game => gameViewRect
      },
    );
  };

let getActiveCameraAspect = state =>
  _getActiveCameraAspect(
    unsafeGetActiveCameraPerspectiveCameraProjection(state),
    state,
  );

let getActiveCameraPMatrix = state => {
  /* unsafeGetActiveCameraPerspectiveCameraProjection(state)
     |> PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraProjectionPMatrix(
          _,
          state,
        ); */

  let cameraProjection =
    unsafeGetActiveCameraPerspectiveCameraProjection(state);

  Matrix4Service.buildPerspective(
    (
      PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFovy(
        cameraProjection,
        state,
      ),
      _getActiveCameraAspect(cameraProjection, state),
      PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraNear(
        cameraProjection,
        state,
      ),
      PerspectiveCameraProjectionAPI.unsafeGetPerspectiveCameraFar(
        cameraProjection,
        state,
      ),
    ),
    Matrix4Service.createIdentityMatrix4(),
  );
};