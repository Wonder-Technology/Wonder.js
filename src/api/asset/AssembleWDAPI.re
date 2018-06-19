open Js.Promise;

let assembleWD = (wdRecord, state) =>
  AssembleWDSystem.assemble(wdRecord, state);

let assembleGLTF = (gltfFileContent: string, state) =>
  ConvertGLTFSystem.convert(gltfFileContent)
  |. AssembleWDSystem.assemble(state);