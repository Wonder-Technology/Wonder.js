let getAllLights = sceneGameObject => {
  DpContainer.unsafeGetDirectionLightRepoDp().getAllLights(
    sceneGameObject->GameObjectEntity.value,
  )
  ->ListSt.map(DirectionLightEntity.create);
};

let getLightCount = sceneGameObject => {
  getAllLights(sceneGameObject)->ListSt.length;
};
