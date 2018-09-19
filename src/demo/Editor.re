open EditorType;

let editorState = {
  sceneViewRect: (0, 0, 0, 0),
  gameViewRect: (0, 0, 0, 0),
  eventTarget: Game,
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

let getEditorState = () => editorState;

let getPointDownEventName = () => "wd_editor_pointdown";

let getPointUpEventName = () => "wd_editor_pointup";

let getPointTapEventName = () => "wd_editor_pointtap";

let getPointMoveEventName = () => "wd_editor_pointmove";

let getPointScaleEventName = () => "wd_editor_pointscale";

let getPointDragEventName = () => "wd_editor_pointdrag";


