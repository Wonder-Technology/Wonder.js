let _createTexture1 = state => {
  let (state, texture) =
    BasicSourceTextureAPI.createBasicSourceTexture(state);

  let name = "texture_1";

  let state =
    BasicSourceTextureAPI.setBasicSourceTextureName(texture, name, state);

  let state =
    BasicSourceTextureAPI.setBasicSourceTextureWrapS(
      texture,
      TextureType.Repeat,
      state,
    )
    |> BasicSourceTextureAPI.setBasicSourceTextureMagFilter(
         texture,
         TextureType.Linear,
       );

  let width = 30;
  let height = 50;

  let source = BasicSourceTextureTool.buildSource(width, height);

  let state =
    BasicSourceTextureAPI.setBasicSourceTextureSource(texture, source, state);

  (state, (texture, name), (source, width, height));
};

let createGameObjectWithMap = (imageName, state) => {
  open GameObjectAPI;
  open LightMaterialAPI;
  open MeshRendererAPI;

  let (state, material) = createLightMaterial(state);

  let (state, (texture, _), (source, width, height)) =
    _createTexture1(state);

  ImageUtils.setImageName(source, imageName);

  let state =
    LightMaterialAPI.setLightMaterialDiffuseMap(material, texture, state);

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

  (state, gameObject, transform, (material, texture));
};