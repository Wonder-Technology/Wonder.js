open Js.Promise;

let assembleWholeGLB = (glb, isSetIMGUIFunc, state) =>
  ConvertGLBSystem.convertGLB(glb)
  |> AssembleWholeWDBSystem.assemble(_, isSetIMGUIFunc, state);

let assembleWholeWDB = (wdb, isSetIMGUIFunc, state) =>
  AssembleWholeWDBSystem.assemble(wdb, isSetIMGUIFunc, state);