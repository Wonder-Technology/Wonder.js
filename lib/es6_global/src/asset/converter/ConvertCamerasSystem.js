

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function convertToBasicCameraViews(param) {
  var cameras = param[/* cameras */9];
  return /* record */[/* count */cameras !== undefined ? cameras.length : 0];
}

function _convertRadiansToDegree(angle) {
  return angle * 180 / Math.PI;
}

function convertToPerspectiveCameraProjections(param) {
  var cameras = param[/* cameras */9];
  if (cameras !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (arr, param) {
                  if (param[/* type_ */0] === "perspective") {
                    var match = OptionService$Wonderjs.unsafeGet(param[/* perspective */1]);
                    return ArrayService$Wonderjs.push(/* record */[
                                /* near */match[/* znear */3],
                                /* far */match[/* zfar */2],
                                /* fovy */_convertRadiansToDegree(match[/* yfov */1]),
                                /* aspect */match[/* aspectRatio */0]
                              ], arr);
                  } else {
                    return arr;
                  }
                }), /* array */[], cameras);
  } else {
    return /* array */[];
  }
}

function convertToArcballCameraControllers(param) {
  var extras = param[/* extras */15];
  if (extras !== undefined) {
    var arcballCameraControllers = extras[/* arcballCameraControllers */0];
    if (arcballCameraControllers !== undefined) {
      return ArrayService$WonderCommonlib.reduceOneParam((function (arr, data) {
                    return ArrayService$Wonderjs.push(data, arr);
                  }), /* array */[], arcballCameraControllers);
    } else {
      return /* array */[];
    }
  } else {
    return /* array */[];
  }
}

export {
  convertToBasicCameraViews ,
  _convertRadiansToDegree ,
  convertToPerspectiveCameraProjections ,
  convertToArcballCameraControllers ,
  
}
/* ArrayService-Wonderjs Not a pure module */
