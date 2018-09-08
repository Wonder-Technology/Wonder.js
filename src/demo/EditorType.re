type rect = (int, int, int, int);

type domEventName =
  | Contextmenu
  | Click
  | MouseDown
  | MouseUp
  | MouseMove
  | MouseWheel
  | MouseDrag
  | KeyUp
  | KeyDown
  | KeyPress
  | TouchTap
  | TouchEnd
  | TouchMove
  | TouchStart
  | TouchDrag
  | KeyUp_editor
  | KeyDown_editor
  | KeyPress_editor;

type eventTarget =
  | Scene
  | Game;

type editorState = {
  mutable sceneViewRect: rect,
  mutable gameViewRect: rect,
  mutable eventTarget,
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