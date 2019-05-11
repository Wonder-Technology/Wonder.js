type outlineData = {
  outlineColor: array(float),
  gameObjectsNeedDrawOutline: array(GameObjectPrimitiveType.gameObject),
  /* basicGameObjectsNeedDrawOutline: array(GameObjectPrimitiveType.gameObject),
     lightGameObjectsNeedDrawOutline: array(GameObjectPrimitiveType.gameObject), */
};

/* TODO refactor: remove */
type skyboxData = {
  skyboxGameObject: option(GameObjectPrimitiveType.gameObject),
  needUpdateCubeTexture: bool,
  nxImage: option(WonderWebgl.DomExtendType.imageElement),
  pxImage: option(WonderWebgl.DomExtendType.imageElement),
  nyImage: option(WonderWebgl.DomExtendType.imageElement),
  pyImage: option(WonderWebgl.DomExtendType.imageElement),
  nzImage: option(WonderWebgl.DomExtendType.imageElement),
  pzImage: option(WonderWebgl.DomExtendType.imageElement),
  cubeTexture: option(WonderWebgl.GlType.texture),
};

type jobDataRecord = {
  outlineData,
  skyboxData,
};