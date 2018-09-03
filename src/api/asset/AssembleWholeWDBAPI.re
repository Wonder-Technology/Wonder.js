open Js.Promise;

let assembleWholeGLB =
    (glb, isSetIMGUIFunc, isBindEvent, isActiveCamera, state) =>
  ConvertGLBSystem.convertGLB(glb)
  |> AssembleWholeWDBSystem.assemble(
       _,
       (isSetIMGUIFunc, isBindEvent, isActiveCamera),
       state,
     );

let assembleWholeWDB =
    (wdb, isSetIMGUIFunc, isBindEvent, isActiveCamera, state) =>
  AssembleWholeWDBSystem.assemble(
    wdb,
    (isSetIMGUIFunc, isBindEvent, isActiveCamera),
    state,
  );