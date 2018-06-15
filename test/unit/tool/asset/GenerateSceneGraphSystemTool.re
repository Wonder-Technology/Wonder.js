let _contain = (targetJsonStr: string, wdJson: Js.Json.t) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        targetJsonStr
        |> Js.String.trim
        |> Js.Json.parseExn
        |> expect == (wdJson |> Obj.magic)
      )
    )
  );

let testGLTFResult = (gltf, targetJson, state) =>
  AssembleWDSystemTool.testResult(
    gltf,
    ((state, sceneGameObject)) =>
      GenerateSceneGraphSystem.generateEmbededGLTF(sceneGameObject, state)
      |> _contain(targetJson),
    state^,
  );