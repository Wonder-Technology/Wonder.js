open Js.Promise;

let assembleWholeGLB = (glb, state) =>
  ConvertGLBSystem.convertGLB(glb) |. AssembleWholeWDBSystem.assemble(state);

let assembleWholeWDB = (wdb, state) =>
  AssembleWholeWDBSystem.assemble(wdb, state);