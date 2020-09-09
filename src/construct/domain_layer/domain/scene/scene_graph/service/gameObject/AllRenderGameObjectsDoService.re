let getAllRenderGameObjects = () => {
  DpContainer.unsafeGetGameObjectRepoDp().getAllGeometryGameObjects()
  ->ListSt.map(GameObjectEntity.create);
};

let getAllRenderGeometries = () => {
  DpContainer.unsafeGetGameObjectRepoDp().getAllGameObjectGeometries()
  ->ListSt.map(GeometryEntity.create);
};

let getAllRenderPBRMaterials = () => {
  DpContainer.unsafeGetGameObjectRepoDp().getAllGameObjectPBRMaterials()
  ->ListSt.map(PBRMaterialEntity.create);
};
