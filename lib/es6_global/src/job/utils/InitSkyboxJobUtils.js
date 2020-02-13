

import * as SkyboxSceneMainService$Wonderjs from "../../service/state/main/scene/SkyboxSceneMainService.js";
import * as InitGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/InitGameObjectMainService.js";
import * as CreateGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/CreateGameObjectMainService.js";
import * as InitCubemapTextureMainService$Wonderjs from "../../service/state/main/texture/cubemap/InitCubemapTextureMainService.js";
import * as AddComponentGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/AddComponentGameObjectMainService.js";
import * as CreateBoxGeometryGeometryMainService$Wonderjs from "../../service/state/main/geometry/CreateBoxGeometryGeometryMainService.js";

function _createSkyboxGameObject(state) {
  var match = CreateGameObjectMainService$Wonderjs.create(state);
  var gameObject = match[1];
  var match$1 = CreateBoxGeometryGeometryMainService$Wonderjs.create(match[0]);
  AddComponentGameObjectMainService$Wonderjs.addGeometryComponent(gameObject, match$1[1], match$1[0]);
  return gameObject;
}

function exec(state) {
  var skyboxGameObject = _createSkyboxGameObject(state);
  var state$1 = SkyboxSceneMainService$Wonderjs.setSkyboxGameObject(skyboxGameObject, InitGameObjectMainService$Wonderjs.initGameObject(skyboxGameObject, state));
  var match = SkyboxSceneMainService$Wonderjs.getCubemapTexture(state$1);
  if (match !== undefined) {
    return InitCubemapTextureMainService$Wonderjs.initTexture(match, state$1);
  } else {
    return state$1;
  }
}

export {
  _createSkyboxGameObject ,
  exec ,
  
}
/* SkyboxSceneMainService-Wonderjs Not a pure module */
