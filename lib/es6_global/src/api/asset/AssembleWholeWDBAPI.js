

import * as ConvertGLBSystem$Wonderjs from "../../asset/converter/ConvertGLBSystem.js";
import * as AssembleWholeWDBSystem$Wonderjs from "../../asset/assemble/AssembleWholeWDBSystem.js";

function assembleWholeGLB(glb, isSetIMGUIFunc, isBindEvent, isActiveCamera, isRenderLight, isLoadImage, state) {
  var __x = ConvertGLBSystem$Wonderjs.convertGLB(glb);
  return AssembleWholeWDBSystem$Wonderjs.assemble(__x, /* tuple */[
              isSetIMGUIFunc,
              isBindEvent,
              isActiveCamera,
              isRenderLight,
              isLoadImage
            ], state);
}

function assembleWholeWDB(wdb, isSetIMGUIFunc, isBindEvent, isActiveCamera, isRenderLight, isLoadImage, state) {
  return AssembleWholeWDBSystem$Wonderjs.assemble(wdb, /* tuple */[
              isSetIMGUIFunc,
              isBindEvent,
              isActiveCamera,
              isRenderLight,
              isLoadImage
            ], state);
}

export {
  assembleWholeGLB ,
  assembleWholeWDB ,
  
}
/* ConvertGLBSystem-Wonderjs Not a pure module */
