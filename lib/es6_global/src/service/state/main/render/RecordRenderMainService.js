

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as RecordBasicRenderObjectMainService$Wonderjs from "./RecordBasicRenderObjectMainService.js";
import * as RecordLightRenderObjectMainService$Wonderjs from "./RecordLightRenderObjectMainService.js";

function getRecord(state) {
  return OptionService$Wonderjs.unsafeGet(state[/* renderRecord */34]);
}

function create(state) {
  state[/* renderRecord */34] = /* record */[
    /* basicRenderObjectRecord */RecordBasicRenderObjectMainService$Wonderjs.create(state),
    /* lightRenderObjectRecord */RecordLightRenderObjectMainService$Wonderjs.create(state),
    /* cameraRecord */undefined,
    /* textureRecord */undefined
  ];
  return state;
}

export {
  getRecord ,
  create ,
  
}
/* OptionService-Wonderjs Not a pure module */
