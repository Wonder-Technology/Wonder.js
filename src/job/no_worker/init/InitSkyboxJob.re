open StateDataMainType;

let _createSkyboxGameObject = state => {
  let (state, gameObject) = CreateGameObjectMainService.create(state);

  let (state, geometry) = CreateBoxGeometryGeometryMainService.create(state);

  let (state, meshRenderer) = CreateMeshRendererMainService.create(. state);
  /* TODO remove lightMaterial */
  let (state, material) = CreateLightMaterialMainService.create(. state);

  let state =
    state
    |> AddComponentGameObjectMainService.addLightMaterialComponent(
         gameObject,
         material,
       );
  let state =
    state
    |> AddComponentGameObjectMainService.addMeshRendererComponent(
         gameObject,
         meshRenderer,
       );

  let state =
    OperateMeshRendererMainService.setIsRender(meshRenderer, false, state);

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
    state |> InitGameObjectMainService.initGameObject(skyboxGameObject);

  {
    ...state,
    jobDataRecord: {
      ...state.jobDataRecord,
      skyboxData: {
        ...state.jobDataRecord.skyboxData,
        skyboxGameObject: Some(skyboxGameObject),
        cubeTexture:
          (
            DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord)
            |> WonderWebgl.Gl.createTexture
          )
          ->Some,
      },
    },
  };
};