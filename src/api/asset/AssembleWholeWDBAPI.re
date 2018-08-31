open Js.Promise;

let assembleWholeGLB = (glb, isSetIMGUIFunc, isBindEvent, state) =>
  ConvertGLBSystem.convertGLB(glb)
  |> AssembleWholeWDBSystem.assemble(_, (isSetIMGUIFunc, isBindEvent), state);

let assembleWholeWDB = (wdb, isSetIMGUIFunc, isBindEvent, state) =>
  AssembleWholeWDBSystem.assemble(wdb, (isSetIMGUIFunc, isBindEvent), state);