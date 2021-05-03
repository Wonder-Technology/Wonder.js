

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as Matrix4Service$Wonderjs from "../../../atom/Matrix4Service.js";
import * as PMatrixService$Wonderjs from "../../../primitive/PMatrixService.js";
import * as DirtyArrayService$Wonderjs from "../../../primitive/DirtyArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as FrustumPerspectiveCameraProjectionService$Wonderjs from "../../../record/main/perspective_camera_projection/FrustumPerspectiveCameraProjectionService.js";
import * as FrustumPerspectiveCameraProjectionMainService$Wonderjs from "./FrustumPerspectiveCameraProjectionMainService.js";

function updateCameraProjection(index, state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var match = FrustumPerspectiveCameraProjectionService$Wonderjs.getAspect(index, perspectiveCameraProjectionRecord);
  var aspect = match !== undefined ? match : OptionService$Wonderjs.unsafeGet(FrustumPerspectiveCameraProjectionMainService$Wonderjs.computeAspect(state));
  var newrecord = Caml_array.caml_array_dup(state);
  var match$1 = FrustumPerspectiveCameraProjectionService$Wonderjs.getFovy(index, perspectiveCameraProjectionRecord);
  var match$2 = FrustumPerspectiveCameraProjectionService$Wonderjs.getNear(index, perspectiveCameraProjectionRecord);
  var match$3 = FrustumPerspectiveCameraProjectionService$Wonderjs.getFar(index, perspectiveCameraProjectionRecord);
  var tmp;
  var exit = 0;
  if (match$1 !== undefined && match$2 !== undefined && match$3 !== undefined) {
    Matrix4Service$Wonderjs.buildPerspective(/* tuple */[
          match$1,
          aspect,
          match$2,
          match$3
        ], PMatrixService$Wonderjs.unsafeGetPMatrix(index, perspectiveCameraProjectionRecord[/* pMatrixMap */2]));
    tmp = perspectiveCameraProjectionRecord;
  } else {
    exit = 1;
  }
  if (exit === 1) {
    Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("update", "fovy,near,far should all exist", "", "", "cameraProjection: " + (String(index) + "")));
    tmp = perspectiveCameraProjectionRecord;
  }
  newrecord[/* perspectiveCameraProjectionRecord */14] = tmp;
  return newrecord;
}

function _clearDirtyArray(state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* perspectiveCameraProjectionRecord */14] = /* record */[
    /* index */perspectiveCameraProjectionRecord[/* index */0],
    /* dirtyArray */DirtyArrayService$Wonderjs.create(/* () */0),
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

function update(state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  return _clearDirtyArray(ArrayService$WonderCommonlib.reduceOneParam((function (state, dirtyIndex) {
                    return updateCameraProjection(dirtyIndex, state);
                  }), state, ArrayService$WonderCommonlib.removeDuplicateItems(perspectiveCameraProjectionRecord[/* dirtyArray */1])));
}

export {
  updateCameraProjection ,
  _clearDirtyArray ,
  update ,
  
}
/* Log-WonderLog Not a pure module */
