open Js.Promise;

let assembleWD = (wdRecord, state) =>
  AssembleWDSystem.assemble(wdRecord, state);

let assembleGLTF = (gltfFileContent: string, state) =>
  ConvertGLTFSystem.convert(gltfFileContent)
  |. AssembleWDSystem.assemble(state);

let assembleGLB = (glb, state) =>
  ConvertGLTFSystem.convertGlb(glb) |. AssembleWDSystem.assemble(state);