let getAllRenderGameObjects = () => {
  DpContainer.unsafeGetGameObjectRepoDp().getAllGeometryGameObjects()
  ->ListSt.map(GameObjectEntity.create);
};

let getAllRenderGeometries = () => {
  DpContainer.unsafeGetGameObjectRepoDp().getAllGameObjectGeometries()
  ->ListSt.map(GeometryEntity.create);
};

let getAllRenderBRDFMaterials = () => {
  DpContainer.unsafeGetGameObjectRepoDp().getAllGameObjectBRDFMaterials()
  ->ListSt.map(BRDFMaterialEntity.create);
};
