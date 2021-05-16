

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as AmbientLightService$Wonderjs from "../../../primitive/light/AmbientLightService.js";
import * as CreateGameObjectMainService$Wonderjs from "../gameObject/CreateGameObjectMainService.js";

function getRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* sceneRecord */12]);
}

function create(state) {
  var match = CreateGameObjectMainService$Wonderjs.create(state);
  var newrecord = Caml_array.caml_array_dup(match[0]);
  newrecord[/* sceneRecord */12] = /* record */[
    /* ambientLightData : record */[/* color */AmbientLightService$Wonderjs.getDefaultColor(/* () */0)],
    /* skyboxData : record */[
      /* skyboxGameObject */undefined,
      /* cubemapTexture */undefined
    ],
    /* sceneGameObject */match[1]
  ];
  return newrecord;
}

export {
  getRecord ,
  create ,
  
}
/* OptionService-Wonderjs Not a pure module */
