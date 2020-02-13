

import * as GLBTool$Wonderjs from "../../asset/tool/GLBTool.js";
import * as ConvertTool$Wonderjs from "../../asset/tool/ConvertTool.js";

function prepare(sandbox) {
  ConvertTool$Wonderjs.buildFakeLoadImage();
  GLBTool$Wonderjs.buildFakeTextDecoder(GLBTool$Wonderjs.convertUint8ArrayToBuffer);
  GLBTool$Wonderjs.buildFakeTextEncoder();
  return GLBTool$Wonderjs.buildFakeURL(sandbox);
}

export {
  prepare ,
  
}
/* GLBTool-Wonderjs Not a pure module */
