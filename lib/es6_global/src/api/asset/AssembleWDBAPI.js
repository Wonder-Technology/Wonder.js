

import * as ConvertGLBSystem$Wonderjs from "../../asset/converter/ConvertGLBSystem.js";
import * as AssembleWDBSystem$Wonderjs from "../../asset/assemble/AssembleWDBSystem.js";

function assembleGLB(glb, state) {
  return AssembleWDBSystem$Wonderjs.assemble(ConvertGLBSystem$Wonderjs.convertGLB(glb), state);
}

var assembleWDB = AssembleWDBSystem$Wonderjs.assemble;

export {
  assembleGLB ,
  assembleWDB ,
  
}
/* ConvertGLBSystem-Wonderjs Not a pure module */
