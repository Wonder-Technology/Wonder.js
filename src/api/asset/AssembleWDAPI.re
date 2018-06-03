open Js.Promise;

let assembleWD = (wdDataTuple, state) =>
  AssembleWDSystem.assemble(wdDataTuple, state);

let assembleGLTF = (gltfFileContent: string, state) => {
  let data = ref(Obj.magic(1));
  ConvertGLTFSystem.convert(gltfFileContent)
  |> Most.forEach(wdData => {
       data := AssembleWDSystem.assemble(wdData, state);
       ();
     })
  |> then_(() => data^ |> resolve);
};