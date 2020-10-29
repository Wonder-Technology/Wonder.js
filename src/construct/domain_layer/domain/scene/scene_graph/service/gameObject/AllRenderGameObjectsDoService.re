let getAllRenderGameObjects = sceneGameObject => {
  DpContainer.unsafeGetGameObjectRepoDp().getAllGeometryGameObjects(
    sceneGameObject->GameObjectEntity.value,
  )
  ->ListSt.map(GameObjectEntity.create);
};

// let getAllRenderGeometries = () => {
//   DpContainer.unsafeGetGameObjectRepoDp().getAllGameObjectGeometries()
//   ->ListSt.map(GeometryEntity.create);
// };

// let getAllRenderBSDFMaterials = () => {
//   DpContainer.unsafeGetGameObjectRepoDp().getAllGameObjectBSDFMaterials()
//   ->ListSt.map(BSDFMaterialEntity.create);
// };
