

import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";

function createGameObjectWithSharedMaterial(material, state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match[0]);
  return /* tuple */[
          state$1,
          gameObject,
          material
        ];
}

export {
  createGameObjectWithSharedMaterial ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
