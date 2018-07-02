open Js.Promise;

let assembleGLB = (glb, state) =>
  ConvertGLTFSystem.convertGLB(glb) |. AssembleWDBSystem.assemble(state);