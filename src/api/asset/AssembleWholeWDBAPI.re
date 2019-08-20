open Js.Promise;

let assembleWholeGLB =
    (
      glb,
      isHandleIMGUI,
      isBindEvent,
      isActiveCamera,
      isRenderLight,
      isLoadImage,
      state,
    ) =>
  ConvertGLBSystem.convertGLB(glb)
  |> AssembleWholeWDBSystem.assemble(
       _,
       (
         isHandleIMGUI,
         isBindEvent,
         isActiveCamera,
         isRenderLight,
         isLoadImage,
       ),
       state,
     );

let assembleWholeWDB =
    (
      wdb,
      isHandleIMGUI,
      isBindEvent,
      isActiveCamera,
      isRenderLight,
      isLoadImage,
      state,
    ) =>
  AssembleWholeWDBSystem.assemble(
    wdb,
    (isHandleIMGUI, isBindEvent, isActiveCamera, isRenderLight, isLoadImage),
    state,
  );