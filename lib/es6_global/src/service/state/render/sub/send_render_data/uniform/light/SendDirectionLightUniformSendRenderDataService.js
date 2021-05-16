

import * as Caml_array from "../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../../main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SendGLSLDataService$Wonderjs from "../../../../../../record/all/sender/SendGLSLDataService.js";
import * as DirectionLightService$Wonderjs from "../../../../../../primitive/light/DirectionLightService.js";
import * as AllGLSLLocationService$Wonderjs from "../../../../../../record/all/location/AllGLSLLocationService.js";
import * as BufferDirectionLightService$Wonderjs from "../../../../../../record/main/light/direction/BufferDirectionLightService.js";
import * as GetDataRenderDirectionLightService$Wonderjs from "../../../../../../record/render/light/direction/GetDataRenderDirectionLightService.js";

function send(gl, param, param$1) {
  var directionLightRecord = param$1[/* directionLightRecord */2];
  var uniformLocationMap = param[2];
  var uniformCacheMap = param[1];
  var program = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          var maxCount = BufferDirectionLightService$Wonderjs.getBufferMaxCount(/* () */0);
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("max buffer count === 4", "is " + (String(maxCount) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](maxCount, 4);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var lightGLSLDataStructureMemberNameArr = /* array */[
    /* record */[
      /* direction */"u_directionLights[0].direction",
      /* color */"u_directionLights[0].color",
      /* intensity */"u_directionLights[0].intensity"
    ],
    /* record */[
      /* direction */"u_directionLights[1].direction",
      /* color */"u_directionLights[1].color",
      /* intensity */"u_directionLights[1].intensity"
    ],
    /* record */[
      /* direction */"u_directionLights[2].direction",
      /* color */"u_directionLights[2].color",
      /* intensity */"u_directionLights[2].intensity"
    ],
    /* record */[
      /* direction */"u_directionLights[3].direction",
      /* color */"u_directionLights[3].color",
      /* intensity */"u_directionLights[3].intensity"
    ]
  ];
  var directionMap = directionLightRecord[/* directionMap */4];
  ArrayService$WonderCommonlib.reduceOneParami((function (directionLightRecord, light, index) {
          var match = Caml_array.caml_array_get(lightGLSLDataStructureMemberNameArr, index);
          var intensity = match[/* intensity */2];
          var color = match[/* color */1];
          var direction = match[/* direction */0];
          SendGLSLDataService$Wonderjs.sendVec3(gl, uniformCacheMap, /* tuple */[
                direction,
                AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, direction, uniformLocationMap, gl)
              ], DirectionLightService$Wonderjs.getDirection(light, directionMap));
          SendGLSLDataService$Wonderjs.sendFloat3(gl, uniformCacheMap, /* tuple */[
                color,
                AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, color, uniformLocationMap, gl)
              ], GetDataRenderDirectionLightService$Wonderjs.getColor(light, directionLightRecord));
          SendGLSLDataService$Wonderjs.sendFloat(gl, uniformCacheMap, /* tuple */[
                intensity,
                AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, intensity, uniformLocationMap, gl)
              ], GetDataRenderDirectionLightService$Wonderjs.getIntensity(light, directionLightRecord));
          return directionLightRecord;
        }), directionLightRecord, directionLightRecord[/* renderLightArr */3]);
  return /* () */0;
}

export {
  send ,
  
}
/* Log-WonderLog Not a pure module */
