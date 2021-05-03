

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordRenderMainService$Wonderjs from "../../../service/state/main/render/RecordRenderMainService.js";
import * as CreateBasicRenderObjectBufferJobUtils$Wonderjs from "../../utils/CreateBasicRenderObjectBufferJobUtils.js";

function execJob(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = RecordRenderMainService$Wonderjs.getRecord(state);
  newrecord[/* renderRecord */34] = /* record */[
    /* basicRenderObjectRecord */CreateBasicRenderObjectBufferJobUtils$Wonderjs.execJob(state),
    /* lightRenderObjectRecord */init[/* lightRenderObjectRecord */1],
    /* cameraRecord */init[/* cameraRecord */2],
    /* textureRecord */init[/* textureRecord */3]
  ];
  return newrecord;
}

export {
  execJob ,
  
}
/* RecordRenderMainService-Wonderjs Not a pure module */
