

import * as CreateTransformMainService$Wonderjs from "../transform/CreateTransformMainService.js";
import * as AddComponentGameObjectMainService$Wonderjs from "./AddComponentGameObjectMainService.js";
import * as CreateGameObjectGameObjectService$Wonderjs from "../../../record/main/gameObject/CreateGameObjectGameObjectService.js";

function create(state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = CreateGameObjectGameObjectService$Wonderjs.create(gameObjectRecord);
  var uid = match[1];
  state[/* gameObjectRecord */10] = match[0];
  var match$1 = CreateTransformMainService$Wonderjs.create(state);
  return /* tuple */[
          AddComponentGameObjectMainService$Wonderjs.addTransformComponent(uid, match$1[1], match$1[0]),
          uid
        ];
}

export {
  create ,
  
}
/* CreateTransformMainService-Wonderjs Not a pure module */
