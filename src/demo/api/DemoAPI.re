open StateDataMainType;

open GlExtend;

open WonderWebgl.Gl;

type rect = (int, int, int, int);

type editorState = {
  mutable sceneViewRect: rect,
  mutable gameViewRect: rect,
  /* mutable gameViewWidth: int,
     mutable gameViewHeight: int,
     mutable offscreenWidth: int,
     mutable offscreenHeight: int,
     mutable framebuffer: option(GlType.framebuffer),
     mutable texture: option(WonderWebgl.GlType.texture), */
  /* mutable sceneViewActiveBasicCameraView: option(ComponentType.component), */
  /* mutable gameViewActiveBasicCameraViewAspect: option(float), */
  /* mutable gameViewCanvasContext: option(CanvasType.canvasContext), */
};

let editorState = {
  sceneViewRect: (0, 0, 0, 0),
  gameViewRect: (0, 0, 0, 0),
  /* gameViewWidth: 0,
     gameViewHeight: 0,
     offscreenWidth: 0,
     offscreenHeight: 0,
     framebuffer: None,
     texture: None,
     /* sceneViewActiveBasicCameraView: None, */
     gameViewActiveBasicCameraViewAspect: None,
     gameViewCanvasContext: None, */
};

let _getEditorState = () => editorState;

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
    | Some(aspect) => state
    };

  BasicCameraViewAPI.activeBasicCameraView(viewActiveBasicCameraView, state);
};

let _activeSceneViewCamera = state => {
  let {sceneViewRect} as editorState = _getEditorState();

  _activeViewCamera(
    sceneViewRect,
    _unsafeGetSceneViewActiveBasicCameraView(state),
    _unsafeGetSceneViewActivePerspectiveCameraProjection(state),
    state,
  );
};

let _activeGameViewCamera = state => {
  let {gameViewRect} as editorState = _getEditorState();

  _activeViewCamera(
    gameViewRect,
    _unsafeGetGameViewActiveBasicCameraView(state),
    _unsafeGetGameViewActivePerspectiveCameraProjection(state),
    state,
  );
};

let prepareRenderSceneViewJob = (_, state) => {
  let gl = DeviceManagerAPI.unsafeGetGl(state);
  let {sceneViewRect} = _getEditorState();

  let (x, y, width, height) = sceneViewRect;

  gl
  |> viewport(
       x |> NumberType.intToFloat,
       y |> NumberType.intToFloat,
       width |> NumberType.intToFloat,
       height |> NumberType.intToFloat,
     );

  gl |> enable(getScissorTest(gl));
  gl |> scissor(x, y, width, height);

  _activeSceneViewCamera(state);
};

let prepareRenderGameViewJob = (_, state) => {
  let gl = DeviceManagerAPI.unsafeGetGl(state);
  let {gameViewRect} = _getEditorState();

  let (x, y, width, height) = gameViewRect;

  gl
  |> viewport(
       x |> NumberType.intToFloat,
       y |> NumberType.intToFloat,
       width |> NumberType.intToFloat,
       height |> NumberType.intToFloat,
     );

  gl |> enable(getScissorTest(gl));
  gl |> scissor(x, y, width, height);

  _activeGameViewCamera(state);
};

let restoreJob = (_, state) => {
  let gl = DeviceManagerAPI.unsafeGetGl(state);
  let (x, y, width, height, _, _) as screenData =
    ScreenService.queryFullScreenData();
  let viewportData = (x, y, width, height);

  gl |> disable(getScissorTest(gl));
  gl |> viewport(x, y, width, height);

  state;
};

let initDemo = (sceneViewRect, gameViewRect, state) => {
  let state =
    state
    |> JobAPI.registerNoWorkerLoopJob(
         "prepare_render_scene_view",
         prepareRenderSceneViewJob,
       )
    |> JobAPI.registerNoWorkerLoopJob(
         "prepare_render_game_view",
         prepareRenderGameViewJob,
       )
    |> JobAPI.registerNoWorkerLoopJob("restore", restoreJob);

  let editorState = _getEditorState();
  editorState.sceneViewRect = sceneViewRect;
  editorState.gameViewRect = gameViewRect;

  state;
};