

import * as GLSLLocationService$Wonderjs from "../../../record/all/location/GLSLLocationService.js";
import * as SendGLSLDataService$Wonderjs from "../../../record/all/sender/SendGLSLDataService.js";

function sendBuffer(gl, param, buffer, state) {
  var pos = param[1];
  var match = GLSLLocationService$Wonderjs.isAttributeLocationExist(pos);
  if (match) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, param[0], gl.FLOAT, false, 0, 0);
    SendGLSLDataService$Wonderjs.enableVertexAttribArray(gl, pos, state[/* vertexAttribHistoryArray */0]);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

export {
  sendBuffer ,
  
}
/* SendGLSLDataService-Wonderjs Not a pure module */
