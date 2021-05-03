

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RecordPointLightMainService$Wonderjs from "../../service/state/main/light/point/RecordPointLightMainService.js";

function _getColor(color) {
  if (color !== undefined) {
    return color;
  } else {
    return /* array */[
            0,
            0,
            0
          ];
  }
}

function _getIntensity(intensity) {
  if (intensity !== undefined) {
    return intensity;
  } else {
    return 1;
  }
}

function _convertPointLights(param, param$1) {
  var range = param$1[/* range */6];
  var quadraticAttenuation = param$1[/* quadraticAttenuation */5];
  var linearAttenuation = param$1[/* linearAttenuation */4];
  var constantAttenuation = param$1[/* constantAttenuation */3];
  return /* tuple */[
          param[0],
          param[1],
          ArrayService$Wonderjs.push(/* record */[
                /* color */_getColor(param$1[/* color */1]),
                /* intensity */_getIntensity(param$1[/* intensity */2]),
                /* constantAttenuation */constantAttenuation !== undefined ? constantAttenuation : 1,
                /* linearAttenuation */linearAttenuation !== undefined ? linearAttenuation : 0,
                /* quadraticAttenuation */quadraticAttenuation !== undefined ? quadraticAttenuation : 0,
                /* range */range !== undefined ? range : RecordPointLightMainService$Wonderjs.getDefaultRange(/* () */0)
              ], param[2])
        ];
}

function convertToLights(param) {
  var extensions = param[/* extensions */14];
  if (extensions !== undefined) {
    var khr_lights = extensions[/* khr_lights */0];
    if (khr_lights !== undefined) {
      return ArrayService$WonderCommonlib.reduceOneParam((function (param, lightData) {
                    var color = lightData[/* color */1];
                    var pointLightArr = param[2];
                    var directionLightArr = param[1];
                    var ambientLightArr = param[0];
                    switch (lightData[/* type_ */0]) {
                      case "ambient" : 
                          return /* tuple */[
                                  ArrayService$Wonderjs.push(/* record */[/* color */_getColor(color)], ambientLightArr),
                                  directionLightArr,
                                  pointLightArr
                                ];
                      case "directional" : 
                          return /* tuple */[
                                  ambientLightArr,
                                  ArrayService$Wonderjs.push(/* record */[
                                        /* color */_getColor(color),
                                        /* intensity */_getIntensity(lightData[/* intensity */2])
                                      ], directionLightArr),
                                  pointLightArr
                                ];
                      case "point" : 
                          return _convertPointLights(/* tuple */[
                                      ambientLightArr,
                                      directionLightArr,
                                      pointLightArr
                                    ], lightData);
                      default:
                        return /* tuple */[
                                ambientLightArr,
                                directionLightArr,
                                pointLightArr
                              ];
                    }
                  }), /* tuple */[
                  /* array */[],
                  /* array */[],
                  /* array */[]
                ], khr_lights[/* lights */0]);
    } else {
      return /* tuple */[
              /* array */[],
              /* array */[],
              /* array */[]
            ];
    }
  } else {
    return /* tuple */[
            /* array */[],
            /* array */[],
            /* array */[]
          ];
  }
}

export {
  _getColor ,
  _getIntensity ,
  _convertPointLights ,
  convertToLights ,
  
}
/* ArrayService-Wonderjs Not a pure module */
