

import * as ConvertGLBSystem$Wonderjs from "../converter/ConvertGLBSystem.js";
import * as GenerateGLBSystem$Wonderjs from "./GenerateGLBSystem.js";

function generateWDB(rootGameObject, imageBase64Map, state) {
  return /* tuple */[
          state,
          ConvertGLBSystem$Wonderjs.convertGLBData(GenerateGLBSystem$Wonderjs.generateGLBData(rootGameObject, imageBase64Map, state))
        ];
}

export {
  generateWDB ,
  
}
/* ConvertGLBSystem-Wonderjs Not a pure module */
