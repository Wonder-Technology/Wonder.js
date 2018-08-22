open Js.Promise;

let assembleGLB = (glb, state) =>
  ConvertGLBSystem.convertGLB(glb) |. AssembleWholeWDBSystem.assemble(state);

let assembleWDB = (wdb, state) => AssembleWholeWDBSystem.assemble(wdb, state);