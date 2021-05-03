

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as RecordSceneMainService$Wonderjs from "./RecordSceneMainService.js";

function getSkyboxGameObject(state) {
  return RecordSceneMainService$Wonderjs.getRecord(state)[/* skyboxData */1][/* skyboxGameObject */0];
}

function unsafeGetSkyboxGameObject(state) {
  return OptionService$Wonderjs.unsafeGet(RecordSceneMainService$Wonderjs.getRecord(state)[/* skyboxData */1][/* skyboxGameObject */0]);
}

function setSkyboxGameObject(skyboxGameObject, state) {
  var sceneRecord = RecordSceneMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  var init = sceneRecord[/* skyboxData */1];
  newrecord[/* sceneRecord */12] = /* record */[
    /* ambientLightData */sceneRecord[/* ambientLightData */0],
    /* skyboxData : record */[
      /* skyboxGameObject */skyboxGameObject,
      /* cubemapTexture */init[/* cubemapTexture */1]
    ],
    /* sceneGameObject */sceneRecord[/* sceneGameObject */2]
  ];
  return newrecord;
}

function getCubemapTexture(state) {
  return RecordSceneMainService$Wonderjs.getRecord(state)[/* skyboxData */1][/* cubemapTexture */1];
}

function setCubemapTexture(cubemapTexture, state) {
  var sceneRecord = RecordSceneMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  var init = sceneRecord[/* skyboxData */1];
  newrecord[/* sceneRecord */12] = /* record */[
    /* ambientLightData */sceneRecord[/* ambientLightData */0],
    /* skyboxData : record */[
      /* skyboxGameObject */init[/* skyboxGameObject */0],
      /* cubemapTexture */cubemapTexture
    ],
    /* sceneGameObject */sceneRecord[/* sceneGameObject */2]
  ];
  return newrecord;
}

function removeCubemapTexture(state) {
  var sceneRecord = RecordSceneMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  var init = sceneRecord[/* skyboxData */1];
  newrecord[/* sceneRecord */12] = /* record */[
    /* ambientLightData */sceneRecord[/* ambientLightData */0],
    /* skyboxData : record */[
      /* skyboxGameObject */init[/* skyboxGameObject */0],
      /* cubemapTexture */undefined
    ],
    /* sceneGameObject */sceneRecord[/* sceneGameObject */2]
  ];
  return newrecord;
}

export {
  getSkyboxGameObject ,
  unsafeGetSkyboxGameObject ,
  setSkyboxGameObject ,
  getCubemapTexture ,
  setCubemapTexture ,
  removeCubemapTexture ,
  
}
/* OptionService-Wonderjs Not a pure module */
