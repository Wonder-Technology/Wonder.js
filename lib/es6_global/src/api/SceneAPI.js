

import * as SkyboxSceneMainService$Wonderjs from "../service/state/main/scene/SkyboxSceneMainService.js";
import * as GameObjectSceneMainService$Wonderjs from "../service/state/main/scene/GameObjectSceneMainService.js";
import * as AmbientLightSceneMainService$Wonderjs from "../service/state/main/scene/AmbientLightSceneMainService.js";

var setCubemapTexture = SkyboxSceneMainService$Wonderjs.setCubemapTexture;

var removeCubemapTexture = SkyboxSceneMainService$Wonderjs.removeCubemapTexture;

var getAmbientLightColor = AmbientLightSceneMainService$Wonderjs.getAmbientLightColor;

var setAmbientLightColor = AmbientLightSceneMainService$Wonderjs.setAmbientLightColor;

var getSceneGameObject = GameObjectSceneMainService$Wonderjs.getSceneGameObject;

var setSceneGameObject = GameObjectSceneMainService$Wonderjs.setSceneGameObject;

var addSceneChild = GameObjectSceneMainService$Wonderjs.addChild;

var addSceneChildren = GameObjectSceneMainService$Wonderjs.addChildren;

var findGameObjectsByName = GameObjectSceneMainService$Wonderjs.findGameObjectsByName;

export {
  setCubemapTexture ,
  removeCubemapTexture ,
  getAmbientLightColor ,
  setAmbientLightColor ,
  getSceneGameObject ,
  setSceneGameObject ,
  addSceneChild ,
  addSceneChildren ,
  findGameObjectsByName ,
  
}
/* SkyboxSceneMainService-Wonderjs Not a pure module */
