

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DirtyArrayService$Wonderjs from "../../../primitive/DirtyArrayService.js";

function _mark(cameraProjection, operateDirtyArrayFunc, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = /* record */[
    /* index */perspectiveCameraProjectionRecord[/* index */0],
    /* dirtyArray */Curry._2(operateDirtyArrayFunc, cameraProjection, perspectiveCameraProjectionRecord[/* dirtyArray */1]),
    /* pMatrixMap */perspectiveCameraProjectionRecord[/* pMatrixMap */2],
    /* nearMap */perspectiveCameraProjectionRecord[/* nearMap */3],
    /* farMap */perspectiveCameraProjectionRecord[/* farMap */4],
    /* fovyMap */perspectiveCameraProjectionRecord[/* fovyMap */5],
    /* aspectMap */perspectiveCameraProjectionRecord[/* aspectMap */6],
    /* gameObjectMap */perspectiveCameraProjectionRecord[/* gameObjectMap */7],
    /* disposedIndexArray */perspectiveCameraProjectionRecord[/* disposedIndexArray */8]
  ];
  return newrecord;
}

function markDirty(cameraProjection, state) {
  return _mark(cameraProjection, DirtyArrayService$Wonderjs.addToDirtyArray, state);
}

function markNotDirty(cameraProjection, state) {
  return _mark(cameraProjection, DirtyArrayService$Wonderjs.removeFromDirtyArray, state);
}

export {
  _mark ,
  markDirty ,
  markNotDirty ,
  
}
/* DirtyArrayService-Wonderjs Not a pure module */
