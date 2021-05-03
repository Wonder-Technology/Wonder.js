

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordRenderMainService$Wonderjs from "../../../service/state/main/render/RecordRenderMainService.js";
import * as CreateLightRenderObjectBufferJobUtils$Wonderjs from "../../utils/CreateLightRenderObjectBufferJobUtils.js";

function execJob(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = RecordRenderMainService$Wonderjs.getRecord(state);
  newrecord[/* renderRecord */34] = /* record */[
    /* basicRenderObjectRecord */init[/* basicRenderObjectRecord */0],
    /* lightRenderObjectRecord */CreateLightRenderObjectBufferJobUtils$Wonderjs.execJob(state),
    /* cameraRecord */init[/* cameraRecord */2],
    /* textureRecord */init[/* textureRecord */3]
  ];
  return newrecord;
}

export {
  execJob ,
  
}
/* RecordRenderMainService-Wonderjs Not a pure module */
