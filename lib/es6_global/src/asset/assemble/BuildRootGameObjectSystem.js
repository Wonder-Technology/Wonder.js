

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as AssembleCommon$Wonderjs from "./AssembleCommon.js";
import * as AssembleIsRootUtils$Wonderjs from "./utils/AssembleIsRootUtils.js";
import * as RecordTransformMainService$Wonderjs from "../../service/state/main/transform/RecordTransformMainService.js";
import * as CreateGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/CreateGameObjectMainService.js";
import * as IsRootGameObjectMainService$Wonderjs from "../../service/state/main/gameObject/IsRootGameObjectMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../service/record/main/gameObject/GetComponentGameObjectService.js";

function build(wd, param) {
  var state = param[0];
  var scene = wd[/* scene */1];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var gameObjectArr = param[1];
  var gameObjects = scene[/* gameObjects */0];
  var match = gameObjects.length;
  if (match !== 1) {
    var match$1 = CreateGameObjectMainService$Wonderjs.create(state);
    var gameObject = match$1[1];
    var state$1 = match$1[0];
    var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state$1);
    var parentMap = transformRecord[/* parentMap */15];
    var childMap = transformRecord[/* childMap */16];
    var match$2 = AssembleCommon$Wonderjs.addChildrenToParent(GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(gameObject, gameObjectRecord), scene[/* gameObjects */0].map((function (gameObjectIndex) {
                return GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(gameObjectArr[gameObjectIndex], gameObjectRecord);
              })), /* tuple */[
          parentMap,
          childMap
        ]);
    var state$2 = IsRootGameObjectMainService$Wonderjs.setIsRoot(gameObject, scene[/* isRoot */3], state$1);
    var newrecord = Caml_array.caml_array_dup(state$2);
    var newrecord$1 = Caml_array.caml_array_dup(transformRecord);
    newrecord[/* transformRecord */11] = (newrecord$1[/* parentMap */15] = match$2[0], newrecord$1[/* childMap */16] = match$2[1], newrecord$1);
    return /* tuple */[
            newrecord,
            gameObject
          ];
  } else {
    var rootGameObject = gameObjectArr[Caml_array.caml_array_get(gameObjects, 0)];
    var match$3 = AssembleIsRootUtils$Wonderjs.doesGameObjectHasIsRootData(0, wd[/* gameObjects */3]);
    var state$3 = match$3 ? state : IsRootGameObjectMainService$Wonderjs.setIsRoot(rootGameObject, scene[/* isRoot */3], state);
    return /* tuple */[
            state$3,
            rootGameObject
          ];
  }
}

export {
  build ,
  
}
/* RecordTransformMainService-Wonderjs Not a pure module */
