open StateDataMainType;

let getSkyboxGameObject = state =>
  RecordSceneMainService.getRecord(state).skyboxData.skyboxGameObject;

let unsafeGetSkyboxGameObject = state =>
  getSkyboxGameObject(state) |> OptionService.unsafeGet;

let setSkyboxGameObject = (skyboxGameObject, state) => {
  let sceneRecord = RecordSceneMainService.getRecord(state);

  {
    ...state,
    sceneRecord:
      Some({
        ...sceneRecord,
        skyboxData: {
          ...sceneRecord.skyboxData,
          skyboxGameObject: Some(skyboxGameObject),
        },
      }),
  };
};

let getCubemapTexture = state =>
  RecordSceneMainService.getRecord(state).skyboxData.cubemapTexture;

let setCubemapTexture = (cubemapTexture, state) => {
  let sceneRecord = RecordSceneMainService.getRecord(state);

  {
    ...state,
    sceneRecord:
      Some({
        ...sceneRecord,
        skyboxData: {
          ...sceneRecord.skyboxData,
          cubemapTexture: Some(cubemapTexture),
        },
      }),
  };
};

let removeCubemapTexture = state => {
  let sceneRecord = RecordSceneMainService.getRecord(state);

  {
    ...state,
    sceneRecord:
      Some({
        ...sceneRecord,
        skyboxData: {
          ...sceneRecord.skyboxData,
          cubemapTexture: None,
        },
      }),
  };
};