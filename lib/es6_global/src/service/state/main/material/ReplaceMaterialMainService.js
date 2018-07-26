

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as GameObjectAPI$Wonderjs from "../../../../api/GameObjectAPI.js";
import * as CreateMeshRendererService$Wonderjs from "../../../record/main/meshRenderer/CreateMeshRendererService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as AddComponentGameObjectMainService$Wonderjs from "../gameObject/AddComponentGameObjectMainService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../gameObject/DisposeComponentGameObjectMainService.js";

function replaceMaterial(param, gameObject, param$1, state) {
  var state$1 = Curry._3(param$1[0], gameObject, param[0], state);
  var state$2 = Curry._3(param$1[1], gameObject, param[1], state$1);
  var match = GetComponentGameObjectService$Wonderjs.getMeshRendererComponent(gameObject, state$2[/* gameObjectRecord */10]);
  var state$3;
  if (match !== undefined) {
    var state$4 = DisposeComponentGameObjectMainService$Wonderjs.deferDisposeMeshRendererComponent(gameObject, match, state$2);
    var match$1 = CreateMeshRendererService$Wonderjs.create(state$4[/* meshRendererRecord */24]);
    var newrecord = Caml_array.caml_array_dup(state$4);
    state$3 = AddComponentGameObjectMainService$Wonderjs.addMeshRendererComponent(gameObject, match$1[1], (newrecord[/* meshRendererRecord */24] = match$1[0], newrecord));
  } else {
    state$3 = state$2;
  }
  return GameObjectAPI$Wonderjs.initGameObject(gameObject, state$3);
}

export {
  replaceMaterial ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
