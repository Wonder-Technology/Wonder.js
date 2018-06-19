let generateEmbededWD = (sceneGameObject, imageBase64Map, state) => {
  open Js.Promise;
  let data = ref(Obj.magic(1));
  (
    state,
    GenerateGLTFSystem.generateEmbededGLTF(
      sceneGameObject,
      imageBase64Map,
      state,
    )
    |> Js.Json.stringify
    |> ConvertGLTFSystem.convert,
  );
};