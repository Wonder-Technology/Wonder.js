

import * as CountInitLightMaterialPointLightService$Wonderjs from "../../../../../record/init_material/init_lightMaterial/light/point/CountInitLightMaterialPointLightService.js";
import * as CountInitLightMaterialDirectionLightService$Wonderjs from "../../../../../record/init_material/init_lightMaterial/light/direction/CountInitLightMaterialDirectionLightService.js";

function execHandle(param) {
  var directionLightCount = CountInitLightMaterialDirectionLightService$Wonderjs.getLightCount(param[0]);
  var pointLightCount = CountInitLightMaterialPointLightService$Wonderjs.getLightCount(param[1]);
  return /* record */[
          /* top */"",
          /* define */"#define DIRECTION_LIGHTS_COUNT " + (String(directionLightCount) + ("\n#define POINT_LIGHTS_COUNT " + (String(pointLightCount) + ""))),
          /* varDeclare */"",
          /* funcDeclare */"",
          /* funcDefine */"",
          /* body */""
        ];
}

export {
  execHandle ,
  
}
/* CountInitLightMaterialPointLightService-Wonderjs Not a pure module */
