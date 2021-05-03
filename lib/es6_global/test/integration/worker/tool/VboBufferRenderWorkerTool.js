

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as VboBufferTool$Wonderjs from "../../../tool/service/vboBuffer/VboBufferTool.js";

function addVboBufferToSourceInstanceBufferMap(sourceInstanceIndex, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* vboBufferRecord */25] = VboBufferTool$Wonderjs.addVboBufferToSourceInstanceBufferMapByRecord(sourceInstanceIndex, state[/* vboBufferRecord */25]);
  return newrecord;
}

export {
  addVboBufferToSourceInstanceBufferMap ,
  
}
/* VboBufferTool-Wonderjs Not a pure module */
