let prepare = sandbox => GenerateSingleABTool.prepare(sandbox);

module SceneAssetBundleContent = {
  let getSceneAssetBundleContent = sab: SABType.sceneAssetBundleContent => {
    let (wdFileContent, _, buffer) =
      BufferUtils.decodeWDB(sab, AssembleWholeWDBSystem.checkWDB);

    wdFileContent |> Js.Json.parseExn |> Obj.magic;
  };
};