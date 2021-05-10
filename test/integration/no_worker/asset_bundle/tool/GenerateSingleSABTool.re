let prepare = sandbox => PrepareABTool.prepare(sandbox);

module SceneAssetBundleContent = {
  open WDType;

  let getSceneAssetBundleContent = sab: SABType.sceneAssetBundleContent => {
    let (wdFileContent, _, buffer) =
      BufferUtils.decodeWDB(sab, AssembleWholeWDBSystem.checkWDB);

    wdFileContent |> Js.Json.parseExn |> Obj.magic;
  };

  let buildImageData = (~name, ~mimeType="image/png", ~bufferView=0, ()) => {
    name,
    mimeType,
    bufferView,
  };

  let buildGeometryData =
      (~name, ~position=0, ~normal=None, ~texCoord=None, ~index=1, ()) =>
    {
      name,
      position,
      normal:
        normal |> Js.Option.isNone ?
          OptionTool.buildJsonSerializedValueNone() :
          normal |> OptionService.unsafeGetJsonSerializedValue,
      texCoord:
        texCoord |> Js.Option.isNone ?
          OptionTool.buildJsonSerializedValueNone() :
          texCoord |> OptionService.unsafeGetJsonSerializedValue,
      index,
    }
    ->Some;
};

let _createGameObject = state => {
  open GameObjectAPI;
  open LightMaterialAPI;
  open MeshRendererAPI;

  let (state, material) = createLightMaterial(state);

  /* let (state, (texture, _), (source, width, height)) =
       _createTexture1(state);

     ImageUtils.setImageName(source, imageName); */

  /* let state =
     LightMaterialAPI.setLightMaterialDiffuseMap(material, texture, state); */

  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);

  let transform =
    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state);

  (state, gameObject, transform, material);
};

let generateOneSAB = state => {
  let (state, gameObject, transform, material) = _createGameObject(state);

  let state = state |> SceneAPI.addSceneChild(transform);

  GenerateSingleSABSystem.generateSingleSAB(
    SceneAPI.getSceneGameObject(state),
    WonderCommonlib.MutableSparseMapService.createEmpty(),
    true,
    state,
  );
};