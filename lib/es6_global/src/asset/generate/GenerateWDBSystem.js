

import * as ConvertGLBSystem$Wonderjs from "../converter/ConvertGLBSystem.js";
import * as GenerateGLBSystem$Wonderjs from "./GenerateGLBSystem.js";

function generateWDB(rootGameObject, imageBase64Map, funcTuple, state) {
  var match = GenerateGLBSystem$Wonderjs.generateGLBData(/* tuple */[
        rootGameObject,
        imageBase64Map
      ], funcTuple, state);
  return /* tuple */[
          state,
          match[1],
          ConvertGLBSystem$Wonderjs.convertGLBData(match[0], match[2])
        ];
}

export {
  generateWDB ,
  
}
/* ConvertGLBSystem-Wonderjs Not a pure module */
