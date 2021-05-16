

import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _convertToBasicCameraViewsByCameras(cameras) {
  if (cameras !== undefined) {
    var cameras$1 = cameras;
    if (cameras$1.length > 0) {
      return ArrayService$WonderCommonlib.reduceOneParam((function (arr, param) {
                    return ArrayService$Wonderjs.push(/* record */[/* isActive */false], arr);
                  }), /* array */[/* record */[/* isActive */true]], cameras$1.slice(1));
    } else {
      return /* array */[];
    }
  } else {
    return /* array */[];
  }
}

function convertToBasicCameraViews(param) {
  var extras = param[/* extras */15];
  var cameras = param[/* cameras */9];
  if (extras !== undefined) {
    var basicCameraViews = extras[/* basicCameraViews */0];
    if (basicCameraViews !== undefined) {
      var basicCameraViews$1 = basicCameraViews;
      if (basicCameraViews$1.length > 0) {
        return ArrayService$WonderCommonlib.reduceOneParam((function (arr, param) {
                      return ArrayService$Wonderjs.push(/* record */[/* isActive */param[/* isActive */0]], arr);
                    }), /* array */[], basicCameraViews$1);
      } else {
        return _convertToBasicCameraViewsByCameras(cameras);
      }
    } else {
      return _convertToBasicCameraViewsByCameras(cameras);
    }
  } else {
    return _convertToBasicCameraViewsByCameras(cameras);
  }
}

function _getFirstNodeIndexWhichUseFirstCamera(nodes) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (index, param, i) {
                var camera = param[/* camera */1];
                if (camera !== undefined && camera === 0) {
                  return i;
                } else {
                  return index;
                }
              }), undefined, nodes);
}

function _getFirstNodeIndexWhichUseBasicCameraView(nodes, basicCameraViewIndex) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (index, param, i) {
                var extras = param[/* extras */8];
                if (extras !== undefined) {
                  var basicCameraView = extras[/* basicCameraView */0];
                  if (basicCameraView !== undefined && basicCameraView === basicCameraViewIndex) {
                    return i;
                  } else {
                    return index;
                  }
                } else {
                  return index;
                }
              }), undefined, nodes);
}

function _getActiveBasicCameraViewIndex(basicCameraViews) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (index, param, i) {
                var match = param[/* isActive */0] === true;
                if (match) {
                  return i;
                } else {
                  return index;
                }
              }), undefined, basicCameraViews);
}

function getActiveCameraNodeIndex(param) {
  var extras = param[/* extras */15];
  var nodes = param[/* nodes */10];
  var cameras = param[/* cameras */9];
  if (extras !== undefined) {
    var basicCameraViews = extras[/* basicCameraViews */0];
    if (basicCameraViews !== undefined) {
      var basicCameraViews$1 = basicCameraViews;
      if (basicCameraViews$1.length > 0) {
        var match = _getActiveBasicCameraViewIndex(basicCameraViews$1);
        if (match !== undefined) {
          return _getFirstNodeIndexWhichUseBasicCameraView(nodes, match);
        } else {
          return undefined;
        }
      } else {
        return _getFirstNodeIndexWhichUseFirstCamera(nodes);
      }
    } else {
      return _getFirstNodeIndexWhichUseFirstCamera(nodes);
    }
  } else if (cameras !== undefined && cameras.length > 0) {
    return _getFirstNodeIndexWhichUseFirstCamera(nodes);
  } else {
    return undefined;
  }
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

function convertToFlyCameraControllers(param) {
  var extras = param[/* extras */15];
  if (extras !== undefined) {
    var flyCameraControllers = extras[/* flyCameraControllers */1];
    if (flyCameraControllers !== undefined) {
      return flyCameraControllers;
    } else {
      return /* array */[];
    }
  } else {
    return /* array */[];
  }
}

function convertToArcballCameraControllers(param) {
  var extras = param[/* extras */15];
  if (extras !== undefined) {
    var arcballCameraControllers = extras[/* arcballCameraControllers */2];
    if (arcballCameraControllers !== undefined) {
      return arcballCameraControllers;
    } else {
      return /* array */[];
    }
  } else {
    return /* array */[];
  }
}

export {
  _convertToBasicCameraViewsByCameras ,
  convertToBasicCameraViews ,
  _getFirstNodeIndexWhichUseFirstCamera ,
  _getFirstNodeIndexWhichUseBasicCameraView ,
  _getActiveBasicCameraViewIndex ,
  getActiveCameraNodeIndex ,
  _convertRadiansToDegree ,
  convertToPerspectiveCameraProjections ,
  convertToFlyCameraControllers ,
  convertToArcballCameraControllers ,
  
}
/* ArrayService-Wonderjs Not a pure module */
