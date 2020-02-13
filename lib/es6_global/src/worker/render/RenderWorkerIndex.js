

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as RenderWorkerSystem$Wonderjs from "./RenderWorkerSystem.js";

var defineOnError = (
       function(param) {
           onerror = (msg, fileName, lineno) => {
RenderWorkerSystem$Wonderjs.onerrorHandler(msg, fileName, lineno);
           }
       }
        );

Curry._1(defineOnError, /* () */0);

var useThisToImportRenderWorkerSystem = RenderWorkerSystem$Wonderjs.onerrorHandler;

export {
  useThisToImportRenderWorkerSystem ,
  defineOnError ,
  
}
/* defineOnError Not a pure module */
