

import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as GameObjectAPI$Wonderjs from "../../../../../api/GameObjectAPI.js";
import * as StateDataMain$Wonderjs from "../../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../state/IsDebugMainService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../../meshRenderer/RecordMeshRendererMainService.js";
import * as RenderArrayMeshRendererMainService$Wonderjs from "../../meshRenderer/RenderArrayMeshRendererMainService.js";

function buildRenderGroup(meshRenderer, material) {
  return /* record */[
          /* meshRenderer */meshRenderer,
          /* material */material
        ];
}

function createRenderGroup(param, state) {
  var match = Curry._1(param[0], state);
  var match$1 = Curry._1(param[1], match[0]);
  return /* tuple */[
          match$1[0],
          /* record */[
            /* meshRenderer */match[1],
            /* material */match$1[1]
          ]
        ];
}

function addRenderGroupComponents(gameObject, param, param$1, state) {
  return Curry._3(param$1[0], gameObject, param[/* meshRenderer */0], Curry._3(param$1[1], gameObject, param[/* material */1], state));
}

function disposeRenderGroupComponents(gameObject, param, param$1, state) {
  return Curry._3(param$1[0], gameObject, param[/* meshRenderer */0], Curry._3(param$1[1], gameObject, param[/* material */1], state));
}

function unsafeGetRenderGroupComponents(gameObject, param, state) {
  return /* record */[
          /* meshRenderer */Curry._2(param[0], gameObject, state),
          /* material */Curry._2(param[1], gameObject, state)
        ];
}

function hasRenderGroupComponents(gameObject, param, state) {
  if (Curry._2(param[0], gameObject, state)) {
    return Curry._2(param[1], gameObject, state);
  } else {
    return false;
  }
}

function replaceMaterial(param, gameObject, param$1, state) {
  var match = param[1];
  var targetMeshRenderer = match[/* meshRenderer */0];
  var match$1 = param[0];
  var sourceMeshRenderer = match$1[/* meshRenderer */0];
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("sourceMeshRenderer === targetMeshRenderer", "not"), (function (param) {
                        return sourceMeshRenderer === targetMeshRenderer;
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var state$1 = RenderArrayMeshRendererMainService$Wonderjs.removeFromRenderGameObjectMap(sourceMeshRenderer, Curry._3(param$1[1], gameObject, match[/* material */1], Curry._3(param$1[0], gameObject, match$1[/* material */1], state)));
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* meshRendererRecord */24] = RenderArrayMeshRendererMainService$Wonderjs.addToRenderGameObjectMap(targetMeshRenderer, gameObject, RecordMeshRendererMainService$Wonderjs.getRecord(state$1), state$1[/* gameObjectRecord */10]);
  return GameObjectAPI$Wonderjs.initGameObject(gameObject, newrecord);
}

export {
  buildRenderGroup ,
  createRenderGroup ,
  addRenderGroupComponents ,
  disposeRenderGroupComponents ,
  unsafeGetRenderGroupComponents ,
  hasRenderGroupComponents ,
  replaceMaterial ,
  
}
/* Log-WonderLog Not a pure module */
