

import * as Caml_array from "../../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../../../../../main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../../../../main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SendGLSLDataService$Wonderjs from "../../../../../../record/all/sender/SendGLSLDataService.js";
import * as LightPositionService$Wonderjs from "../../../../../../primitive/light/LightPositionService.js";
import * as AllGLSLLocationService$Wonderjs from "../../../../../../record/all/location/AllGLSLLocationService.js";
import * as BufferPointLightService$Wonderjs from "../../../../../../record/main/light/point/BufferPointLightService.js";
import * as GetDataRenderPointLightService$Wonderjs from "../../../../../../record/render/light/point/GetDataRenderPointLightService.js";

function getLightGLSLDataStructureMemberNameArr(param) {
  return /* array */[
          /* record */[
            /* position */"u_pointLights[0].position",
            /* color */"u_pointLights[0].color",
            /* intensity */"u_pointLights[0].intensity",
            /* constant */"u_pointLights[0].constant",
            /* linear */"u_pointLights[0].linear",
            /* quadratic */"u_pointLights[0].quadratic",
            /* range */"u_pointLights[0].range"
          ],
          /* record */[
            /* position */"u_pointLights[1].position",
            /* color */"u_pointLights[1].color",
            /* intensity */"u_pointLights[1].intensity",
            /* constant */"u_pointLights[1].constant",
            /* linear */"u_pointLights[1].linear",
            /* quadratic */"u_pointLights[1].quadratic",
            /* range */"u_pointLights[1].range"
          ],
          /* record */[
            /* position */"u_pointLights[2].position",
            /* color */"u_pointLights[2].color",
            /* intensity */"u_pointLights[2].intensity",
            /* constant */"u_pointLights[2].constant",
            /* linear */"u_pointLights[2].linear",
            /* quadratic */"u_pointLights[2].quadratic",
            /* range */"u_pointLights[2].range"
          ],
          /* record */[
            /* position */"u_pointLights[3].position",
            /* color */"u_pointLights[3].color",
            /* intensity */"u_pointLights[3].intensity",
            /* constant */"u_pointLights[3].constant",
            /* linear */"u_pointLights[3].linear",
            /* quadratic */"u_pointLights[3].quadratic",
            /* range */"u_pointLights[3].range"
          ]
        ];
}

function _sendAttenuation(light, param, param$1, pointLightRecord) {
  var range = param$1[/* range */6];
  var quadratic = param$1[/* quadratic */5];
  var linear = param$1[/* linear */4];
  var constant = param$1[/* constant */3];
  var uniformLocationMap = param[3];
  var uniformCacheMap = param[2];
  var program = param[1];
  var gl = param[0];
  SendGLSLDataService$Wonderjs.sendFloat(gl, uniformCacheMap, /* tuple */[
        constant,
        AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, constant, uniformLocationMap, gl)
      ], GetDataRenderPointLightService$Wonderjs.getConstant(light, pointLightRecord));
  SendGLSLDataService$Wonderjs.sendFloat(gl, uniformCacheMap, /* tuple */[
        linear,
        AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, linear, uniformLocationMap, gl)
      ], GetDataRenderPointLightService$Wonderjs.getLiear(light, pointLightRecord));
  SendGLSLDataService$Wonderjs.sendFloat(gl, uniformCacheMap, /* tuple */[
        quadratic,
        AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, quadratic, uniformLocationMap, gl)
      ], GetDataRenderPointLightService$Wonderjs.getQuadratic(light, pointLightRecord));
  SendGLSLDataService$Wonderjs.sendFloat(gl, uniformCacheMap, /* tuple */[
        range,
        AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, range, uniformLocationMap, gl)
      ], GetDataRenderPointLightService$Wonderjs.getRange(light, pointLightRecord));
  return pointLightRecord;
}

function send(gl, param, param$1) {
  var pointLightRecord = param$1[/* pointLightRecord */3];
  var uniformLocationMap = param[2];
  var uniformCacheMap = param[1];
  var program = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          var maxCount = BufferPointLightService$Wonderjs.getBufferMaxCount(/* () */0);
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("max buffer count === 4", "is " + (String(maxCount) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](maxCount, 4);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var lightGLSLDataStructureMemberNameArr = getLightGLSLDataStructureMemberNameArr(/* () */0);
  var positionMap = pointLightRecord[/* positionMap */8];
  ArrayService$WonderCommonlib.reduceOneParami((function (pointLightRecord, light, index) {
          var structureMemberNameData = Caml_array.caml_array_get(lightGLSLDataStructureMemberNameArr, index);
          var intensity = structureMemberNameData[/* intensity */2];
          var color = structureMemberNameData[/* color */1];
          var position = structureMemberNameData[/* position */0];
          SendGLSLDataService$Wonderjs.sendVec3(gl, uniformCacheMap, /* tuple */[
                position,
                AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, position, uniformLocationMap, gl)
              ], LightPositionService$Wonderjs.getPosition(light, positionMap));
          SendGLSLDataService$Wonderjs.sendFloat3(gl, uniformCacheMap, /* tuple */[
                color,
                AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, color, uniformLocationMap, gl)
              ], GetDataRenderPointLightService$Wonderjs.getColor(light, pointLightRecord));
          SendGLSLDataService$Wonderjs.sendFloat(gl, uniformCacheMap, /* tuple */[
                intensity,
                AllGLSLLocationService$Wonderjs.getUniformLocationAndCache(program, intensity, uniformLocationMap, gl)
              ], GetDataRenderPointLightService$Wonderjs.getIntensity(light, pointLightRecord));
          return _sendAttenuation(light, /* tuple */[
                      gl,
                      program,
                      uniformCacheMap,
                      uniformLocationMap
                    ], structureMemberNameData, pointLightRecord);
        }), pointLightRecord, pointLightRecord[/* renderLightArr */7]);
  return /* () */0;
}

export {
  getLightGLSLDataStructureMemberNameArr ,
  _sendAttenuation ,
  send ,
  
}
/* Log-WonderLog Not a pure module */
