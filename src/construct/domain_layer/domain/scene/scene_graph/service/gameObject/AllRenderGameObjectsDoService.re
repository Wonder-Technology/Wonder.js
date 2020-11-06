let getAllRenderGameObjects = sceneGameObject => {
  DpContainer.unsafeGetGameObjectRepoDp().getAllGeometryGameObjects(
    sceneGameObject->GameObjectEntity.value,
  )
  ->ListSt.map(GameObjectEntity.create);
};

let getAllRenderGeometries = (sceneGameObject) => {
  DpContainer.unsafeGetGameObjectRepoDp().getAllGameObjectGeometries(
    sceneGameObject->GameObjectEntity.value,
  )
  ->ListSt.map(GeometryEntity.create);
};

let getAllRenderBSDFMaterials = sceneGameObject => {
  DpContainer.unsafeGetGameObjectRepoDp().getAllGameObjectBSDFMaterials(
    sceneGameObject->GameObjectEntity.value,
  )
  ->ListSt.map(BSDFMaterialEntity.create);
};
