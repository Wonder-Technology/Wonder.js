

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DirtyArrayService$Wonderjs from "../../../primitive/DirtyArrayService.js";

function markDirty(cameraProjection, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = /* record */[
    /* index */perspectiveCameraProjectionRecord[/* index */0],
    /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraProjection, perspectiveCameraProjectionRecord[/* dirtyArray */1]),
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

function markNotDirty(cameraProjection, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = /* record */[
    /* index */perspectiveCameraProjectionRecord[/* index */0],
    /* dirtyArray */DirtyArrayService$Wonderjs.removeFromDirtyArray(cameraProjection, perspectiveCameraProjectionRecord[/* dirtyArray */1]),
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

export {
  markDirty ,
  markNotDirty ,
  
}
/* DirtyArrayService-Wonderjs Not a pure module */
