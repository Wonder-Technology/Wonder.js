

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as DirtyArrayService$Wonderjs from "../../../primitive/DirtyArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function _setMapValue(cameraProjection, dirtyArray, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraProjection, dirtyArray),
          /* pMatrixMap */record[/* pMatrixMap */2],
          /* nearMap */record[/* nearMap */3],
          /* farMap */record[/* farMap */4],
          /* fovyMap */record[/* fovyMap */5],
          /* aspectMap */record[/* aspectMap */6],
          /* gameObjectMap */record[/* gameObjectMap */7],
          /* disposedIndexArray */record[/* disposedIndexArray */8]
        ];
}

function getFovy(cameraProjection, record) {
  return SparseMapService$WonderCommonlib.get(cameraProjection, record[/* fovyMap */5]);
}

function unsafeGetFovy(cameraProjection, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraProjection, record[/* fovyMap */5]));
}

function setFovy(cameraProjection, fovy, record) {
  return _setMapValue(cameraProjection, record[/* dirtyArray */1], /* record */[
              /* index */record[/* index */0],
              /* dirtyArray */record[/* dirtyArray */1],
              /* pMatrixMap */record[/* pMatrixMap */2],
              /* nearMap */record[/* nearMap */3],
              /* farMap */record[/* farMap */4],
              /* fovyMap */SparseMapService$WonderCommonlib.set(cameraProjection, fovy, record[/* fovyMap */5]),
              /* aspectMap */record[/* aspectMap */6],
              /* gameObjectMap */record[/* gameObjectMap */7],
              /* disposedIndexArray */record[/* disposedIndexArray */8]
            ]);
}

function getAspect(cameraProjection, record) {
  return SparseMapService$WonderCommonlib.get(cameraProjection, record[/* aspectMap */6]);
}

function unsafeGetAspect(cameraProjection, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraProjection, record[/* aspectMap */6]));
}

function setAspect(cameraProjection, aspect, record) {
  return _setMapValue(cameraProjection, record[/* dirtyArray */1], /* record */[
              /* index */record[/* index */0],
              /* dirtyArray */record[/* dirtyArray */1],
              /* pMatrixMap */record[/* pMatrixMap */2],
              /* nearMap */record[/* nearMap */3],
              /* farMap */record[/* farMap */4],
              /* fovyMap */record[/* fovyMap */5],
              /* aspectMap */SparseMapService$WonderCommonlib.set(cameraProjection, aspect, record[/* aspectMap */6]),
              /* gameObjectMap */record[/* gameObjectMap */7],
              /* disposedIndexArray */record[/* disposedIndexArray */8]
            ]);
}

function removeAspect(cameraProjection, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* dirtyArray */DirtyArrayService$Wonderjs.addToDirtyArray(cameraProjection, record[/* dirtyArray */1]),
          /* pMatrixMap */record[/* pMatrixMap */2],
          /* nearMap */record[/* nearMap */3],
          /* farMap */record[/* farMap */4],
          /* fovyMap */record[/* fovyMap */5],
          /* aspectMap */SparseMapService$WonderCommonlib.deleteVal(cameraProjection, record[/* aspectMap */6]),
          /* gameObjectMap */record[/* gameObjectMap */7],
          /* disposedIndexArray */record[/* disposedIndexArray */8]
        ];
}

function getNear(cameraProjection, record) {
  return SparseMapService$WonderCommonlib.get(cameraProjection, record[/* nearMap */3]);
}

function unsafeGetNear(cameraProjection, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraProjection, record[/* nearMap */3]));
}

function setNear(cameraProjection, near, record) {
  return _setMapValue(cameraProjection, record[/* dirtyArray */1], /* record */[
              /* index */record[/* index */0],
              /* dirtyArray */record[/* dirtyArray */1],
              /* pMatrixMap */record[/* pMatrixMap */2],
              /* nearMap */SparseMapService$WonderCommonlib.set(cameraProjection, near, record[/* nearMap */3]),
              /* farMap */record[/* farMap */4],
              /* fovyMap */record[/* fovyMap */5],
              /* aspectMap */record[/* aspectMap */6],
              /* gameObjectMap */record[/* gameObjectMap */7],
              /* disposedIndexArray */record[/* disposedIndexArray */8]
            ]);
}

function getFar(cameraProjection, record) {
  return SparseMapService$WonderCommonlib.get(cameraProjection, record[/* farMap */4]);
}

function getInfiniteFar() {
  return 100000;
}

function unsafeGetFar(cameraProjection, record) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(cameraProjection, record[/* farMap */4]));
}

function setFar(cameraProjection, far, record) {
  return _setMapValue(cameraProjection, record[/* dirtyArray */1], /* record */[
              /* index */record[/* index */0],
              /* dirtyArray */record[/* dirtyArray */1],
              /* pMatrixMap */record[/* pMatrixMap */2],
              /* nearMap */record[/* nearMap */3],
              /* farMap */SparseMapService$WonderCommonlib.set(cameraProjection, far, record[/* farMap */4]),
              /* fovyMap */record[/* fovyMap */5],
              /* aspectMap */record[/* aspectMap */6],
              /* gameObjectMap */record[/* gameObjectMap */7],
              /* disposedIndexArray */record[/* disposedIndexArray */8]
            ]);
}

export {
  _setMapValue ,
  getFovy ,
  unsafeGetFovy ,
  setFovy ,
  getAspect ,
  unsafeGetAspect ,
  setAspect ,
  removeAspect ,
  getNear ,
  unsafeGetNear ,
  setNear ,
  getFar ,
  getInfiniteFar ,
  unsafeGetFar ,
  setFar ,
  
}
/* OptionService-Wonderjs Not a pure module */
