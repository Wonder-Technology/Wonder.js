open SceneGraphRepoDpCPType;

let set =
    (
      {
        sceneRepo,
        gameObjectRepo,
        transformRepo,
        directionLightRepo,
        basicCameraViewRepo,
        perspectiveCameraProjectionRepo,
      }: SceneGraphRepoDpCPType.sceneGraphRepo,
    ) => {
  let {
    getTransform,
    getDirectionLight,
    getBasicCameraView,
    getPerspectiveCameraProjection,
    getAllGeometryGameObjects,
  } = gameObjectRepo;
  let {getColor, getIntensity, getDirection, getAllLights}: SceneGraphRepoDpCPType.directionLightRepo = directionLightRepo;
  let {getGameObject, getViewWorldToCameraMatrix, getActiveBasicCameraView}: SceneGraphRepoDpCPType.basicCameraViewRepo = basicCameraViewRepo;

  SceneGraphRepoDpRunAPI.set(
    {
      sceneRepo,
      gameObjectRepo: {
        getTransform: gameObject => {
          getTransform(gameObject)->OptionSt.fromNullable;
        },
        getDirectionLight: gameObject => {
          getDirectionLight(gameObject)->OptionSt.fromNullable;
        },
        getBasicCameraView: gameObject => {
          getBasicCameraView(gameObject)->OptionSt.fromNullable;
        },
        getPerspectiveCameraProjection: gameObject => {
          getPerspectiveCameraProjection(gameObject)->OptionSt.fromNullable;
        },
        getAllGeometryGameObjects: sceneGameObject => {
          getAllGeometryGameObjects(sceneGameObject)->ListSt.fromArray;
        },
      },
      transformRepo,
      directionLightRepo: {
        getColor,
        getIntensity,
        getDirection,
        getAllLights: sceneGameObject => {
          getAllLights(sceneGameObject)->ListSt.fromArray;
        },
      },
      basicCameraViewRepo: {
        getGameObject,
        getViewWorldToCameraMatrix,
        getActiveBasicCameraView: gameObject => {
          getActiveBasicCameraView(gameObject)->OptionSt.fromNullable;
        },
      },
      perspectiveCameraProjectionRepo,
    }: ISceneGraphRepoDp.sceneGraphRepo,
  );
};
