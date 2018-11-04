open Js.Promise;

let assembleWholeGLB =
    (glb, isSetIMGUIFunc, isBindEvent, isActiveCamera, isRenderLight, state) =>
  ConvertGLBSystem.convertGLB(glb)
  |> AssembleWholeWDBSystem.assemble(
       _,
       (isSetIMGUIFunc, isBindEvent, isActiveCamera, isRenderLight),
       state,
     );

let assembleWholeWDB =
    (wdb, isSetIMGUIFunc, isBindEvent, isActiveCamera, isRenderLight, state) =>
  AssembleWholeWDBSystem.assemble(
    wdb,
    (isSetIMGUIFunc, isBindEvent, isActiveCamera, isRenderLight),
    state,
  );