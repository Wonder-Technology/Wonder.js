let generateEmbededWD = (sceneGameObject, state) => {
  open Js.Promise;
  let data = ref(Obj.magic(1));
  GenerateGLTFSystem.generateEmbededGLTF(sceneGameObject, state)
  |> Js.Json.stringify
  |> ConvertGLTFSystem.convert
  |> Most.forEach(convertResultDataTuple => {
       data := convertResultDataTuple;
       ();
     })
  |> then_(() => (state, data^) |> resolve);
};