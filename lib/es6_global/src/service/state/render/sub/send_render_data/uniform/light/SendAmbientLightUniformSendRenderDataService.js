

import * as SendGLSLDataService$Wonderjs from "../../../../../../record/all/sender/SendGLSLDataService.js";
import * as AllGLSLLocationService$Wonderjs from "../../../../../../record/all/location/AllGLSLLocationService.js";
import * as GetDataRenderAmbientLightService$Wonderjs from "../../../../../../record/render/light/ambient/GetDataRenderAmbientLightService.js";

function send(gl, param, param$1) {
  var name = "u_ambient";
  return SendGLSLDataService$Wonderjs.sendFloat3(gl, param[1], /* tuple */[
              name,
              AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(param[0], name, param[2], gl)
            ], GetDataRenderAmbientLightService$Wonderjs.getColor(param$1[/* sceneRecord */1]));
}

export {
  send ,
  
}
/* SendGLSLDataService-Wonderjs Not a pure module */
