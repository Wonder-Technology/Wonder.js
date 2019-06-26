type ambientLightData = {color: array(float)};

type skyboxData = {
  skyboxGameObject: option(GameObjectPrimitiveType.gameObject),
  cubemapTexture: option(CubemapTextureType.cubemapTexture),
};

type sceneRecord = {
  ambientLightData,
  skyboxData,
  sceneGameObject: GameObjectPrimitiveType.gameObject,
};