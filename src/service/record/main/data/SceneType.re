open GameObjectType;

type ambientLight = {color: array(float)};

type sceneRecord = {
  ambientLight,
  sceneGameObject:gameObject
};