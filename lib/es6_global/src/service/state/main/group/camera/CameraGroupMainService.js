

import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";

function createCameraGroup(param, state) {
  var match = Curry._1(param[0], state);
  var match$1 = Curry._1(param[1], match[0]);
  return /* tuple */[
          match$1[0],
          /* record */[
            /* cameraView */match[1],
            /* cameraProjection */match$1[1]
          ]
        ];
}

function addCameraGroupComponents(gameObject, param, param$1, state) {
  return Curry._3(param$1[1], gameObject, param[/* cameraProjection */1], Curry._3(param$1[0], gameObject, param[/* cameraView */0], state));
}

function disposeCameraGroupComponents(gameObject, param, param$1, state) {
  return Curry._3(param$1[1], gameObject, param[/* cameraProjection */1], Curry._3(param$1[0], gameObject, param[/* cameraView */0], state));
}

function unsafeGetCameraGroupComponents(gameObject, param, state) {
  return /* record */[
          /* cameraView */Curry._2(param[0], gameObject, state),
          /* cameraProjection */Curry._2(param[1], gameObject, state)
        ];
}

function hasCameraGroupComponents(gameObject, param, state) {
  if (Curry._2(param[0], gameObject, state)) {
    return Curry._2(param[1], gameObject, state);
  } else {
    return false;
  }
}

export {
  createCameraGroup ,
  addCameraGroupComponents ,
  disposeCameraGroupComponents ,
  unsafeGetCameraGroupComponents ,
  hasCameraGroupComponents ,
  
}
/* No side effect */
