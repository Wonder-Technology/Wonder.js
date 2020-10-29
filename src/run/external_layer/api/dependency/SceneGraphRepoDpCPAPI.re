open SceneGraphRepoDpCPType;

let set =
    (
      {sceneRepo, gameObjectRepo, transformRepo}: SceneGraphRepoDpCPType.sceneGraphRepo,
    ) => {
  let {getTransform, getAllGeometryGameObjects} = gameObjectRepo;

  SceneGraphRepoDpRunAPI.set(
    {
      sceneRepo,
      gameObjectRepo: {
        getTransform: gameObject => {
          getTransform(gameObject)->OptionSt.fromNullable;
        },
        getAllGeometryGameObjects: sceneGameObject => {
          getAllGeometryGameObjects(sceneGameObject)->ListSt.fromArray;
        },
      },
      transformRepo,
    }: ISceneGraphRepoDp.sceneGraphRepo,
  );
};
