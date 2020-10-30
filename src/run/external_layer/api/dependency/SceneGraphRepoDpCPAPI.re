open SceneGraphRepoDpCPType;

let set =
    (
      {sceneRepo, gameObjectRepo, transformRepo, directionLightRepo}: SceneGraphRepoDpCPType.sceneGraphRepo,
    ) => {
  let {getTransform, getDirectionLight, getAllGeometryGameObjects} = gameObjectRepo;
  let {getColor, getIntensity, getDirection, getAllLights}: SceneGraphRepoDpCPType.directionLightRepo = directionLightRepo;

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
    }: ISceneGraphRepoDp.sceneGraphRepo,
  );
};
