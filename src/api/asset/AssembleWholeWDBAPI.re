open Js.Promise;

let assembleWholeGLB =
    (
      glb,
      isSetIMGUIFunc,
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
         isSetIMGUIFunc,
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
      isSetIMGUIFunc,
      isBindEvent,
      isActiveCamera,
      isRenderLight,
      isLoadImage,
      state,
    ) =>
  AssembleWholeWDBSystem.assemble(
    wdb,
    (isSetIMGUIFunc, isBindEvent, isActiveCamera, isRenderLight, isLoadImage),
    state,
  );