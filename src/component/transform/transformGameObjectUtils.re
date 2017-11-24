open TransformType;

open TransformStateUtils;

open ComponentSystem;

let getGameObject = (transform: transform, transformData) => {
  getComponentGameObject(transform, transformData.gameObjectMap)
};