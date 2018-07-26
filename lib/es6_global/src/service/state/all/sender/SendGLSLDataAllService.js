

import * as GLSLLocationService$Wonderjs from "../../../record/all/location/GLSLLocationService.js";
import * as SendGLSLDataService$Wonderjs from "../../../record/render/sender/SendGLSLDataService.js";

function sendBuffer(gl, param, buffer, state) {
  var pos = param[1];
  var match = GLSLLocationService$Wonderjs.isAttributeLocationExist(pos);
  if (match) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, param[0], gl.FLOAT, false, 0, 0);
    SendGLSLDataService$Wonderjs.enableVertexAttribArray(gl, pos, state[/* glslSenderRecord */3][/* vertexAttribHistoryArray */9]);
  }
  return state;
}

export {
  sendBuffer ,
  
}
/* GLSLLocationService-Wonderjs Not a pure module */
