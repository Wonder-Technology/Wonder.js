open StateDataMainType;

let getAmbientLightColor = state =>
  AmbientLightSceneMainService.getAmbientLightColor(state);

let setAmbientLightColor = (color, state) =>
  AmbientLightSceneMainService.setAmbientLightColor(color, state);

let getSceneGameObject = GameObjectSceneMainService.getSceneGameObject;

let setSceneGameObject = GameObjectSceneMainService.setSceneGameObject;

let addSceneChild = GameObjectSceneMainService.addChild;

let addSceneChildren = GameObjectSceneMainService.addChildren;