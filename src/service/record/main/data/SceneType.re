open GameObjectType;

type ambientLight = {color: array(float)};

type sceneRecord = {
  currentCameraGameObject: option(gameObject),
  ambientLight,
  sceneGameObject:gameObject
};