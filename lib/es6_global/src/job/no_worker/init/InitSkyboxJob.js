

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as DeviceManagerService$Wonderjs from "../../../service/record/all/device/DeviceManagerService.js";
import * as InitGameObjectMainService$Wonderjs from "../../../service/state/main/gameObject/InitGameObjectMainService.js";
import * as CreateGameObjectMainService$Wonderjs from "../../../service/state/main/gameObject/CreateGameObjectMainService.js";
import * as AddComponentGameObjectMainService$Wonderjs from "../../../service/state/main/gameObject/AddComponentGameObjectMainService.js";
import * as CreateBoxGeometryGeometryMainService$Wonderjs from "../../../service/state/main/geometry/CreateBoxGeometryGeometryMainService.js";

function _createSkyboxGameObject(state) {
  var match = CreateGameObjectMainService$Wonderjs.create(state);
  var gameObject = match[1];
  var match$1 = CreateBoxGeometryGeometryMainService$Wonderjs.create(match[0]);
  AddComponentGameObjectMainService$Wonderjs.addGeometryComponent(gameObject, match$1[1], match$1[0]);
  return gameObject;
}

function execJob(flags, state) {
  var skyboxGameObject = _createSkyboxGameObject(state);
  var state$1 = InitGameObjectMainService$Wonderjs.initGameObject(skyboxGameObject, state);
  var newrecord = Caml_array.caml_array_dup(state$1);
  var init = state$1[/* jobDataRecord */44];
  var init$1 = state$1[/* jobDataRecord */44][/* skyboxData */1];
  newrecord[/* jobDataRecord */44] = /* record */[
    /* outlineData */init[/* outlineData */0],
    /* skyboxData : record */[
      /* skyboxGameObject */skyboxGameObject,
      /* needUpdateCubeTexture */init$1[/* needUpdateCubeTexture */1],
      /* nxImage */init$1[/* nxImage */2],
      /* pxImage */init$1[/* pxImage */3],
      /* nyImage */init$1[/* nyImage */4],
      /* pyImage */init$1[/* pyImage */5],
      /* nzImage */init$1[/* nzImage */6],
      /* pzImage */init$1[/* pzImage */7],
      /* cubeTexture */Caml_option.some(DeviceManagerService$Wonderjs.unsafeGetGl(state$1[/* deviceManagerRecord */9]).createTexture())
    ]
  ];
  return newrecord;
}

export {
  _createSkyboxGameObject ,
  execJob ,
  
}
/* DeviceManagerService-Wonderjs Not a pure module */
