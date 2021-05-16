

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordSceneMainService$Wonderjs from "./RecordSceneMainService.js";

function getAmbientLightColor(state) {
  return RecordSceneMainService$Wonderjs.getRecord(state)[/* ambientLightData */0][/* color */0];
}

function setAmbientLightColor(color, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = RecordSceneMainService$Wonderjs.getRecord(state);
  newrecord[/* sceneRecord */12] = /* record */[
    /* ambientLightData : record */[/* color */color],
    /* skyboxData */init[/* skyboxData */1],
    /* sceneGameObject */init[/* sceneGameObject */2]
  ];
  return newrecord;
}

export {
  getAmbientLightColor ,
  setAmbientLightColor ,
  
}
/* RecordSceneMainService-Wonderjs Not a pure module */
