open StateDataMainType;

let _createSkyboxGameObject = state => {
  let (state, gameObject) = CreateGameObjectMainService.create(state);

  let (state, geometry) = CreateBoxGeometryGeometryMainService.create(state);

  let state =
    state
    |> AddComponentGameObjectMainService.addGeometryComponent(
         gameObject,
         geometry,
       );

  gameObject;
};

let execJob = (flags, state) => {
  let skyboxGameObject = _createSkyboxGameObject(state);

  let state =
    state
    |> InitGameObjectMainService.initGameObject(skyboxGameObject)
    |> SkyboxSceneMainService.setSkyboxGameObject(skyboxGameObject);

  let state =
    switch (SkyboxSceneMainService.getCubemapTexture(state)) {
    | Some(cubemapTexture) =>
      InitCubemapTextureMainService.initTexture(cubemapTexture, state)
    | None => state
    };

  state;
};