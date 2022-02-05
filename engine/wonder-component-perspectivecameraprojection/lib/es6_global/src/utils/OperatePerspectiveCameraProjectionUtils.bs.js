

import * as ImmutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function getPMatrix(state, cameraProjection) {
  return ImmutableSparseMap$WonderCommonlib.get(state.pMatrixMap, cameraProjection);
}

function setPMatrix(state, cameraProjection, pMatrix) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: ImmutableSparseMap$WonderCommonlib.set(state.pMatrixMap, cameraProjection, pMatrix),
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap
        };
}

function getFovy(state, cameraProjection) {
  return ImmutableSparseMap$WonderCommonlib.get(state.fovyMap, cameraProjection);
}

function setFovy(state, cameraProjection, fovy) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: ImmutableSparseMap$WonderCommonlib.set(state.fovyMap, cameraProjection, fovy),
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap
        };
}

function getAspect(state, cameraProjection) {
  return ImmutableSparseMap$WonderCommonlib.get(state.aspectMap, cameraProjection);
}

function setAspect(state, cameraProjection, aspect) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: ImmutableSparseMap$WonderCommonlib.set(state.aspectMap, cameraProjection, aspect),
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap
        };
}

function getFar(state, cameraProjection) {
  return ImmutableSparseMap$WonderCommonlib.get(state.farMap, cameraProjection);
}

function setFar(state, cameraProjection, far) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: state.nearMap,
          farMap: ImmutableSparseMap$WonderCommonlib.set(state.farMap, cameraProjection, far),
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap
        };
}

function getNear(state, cameraProjection) {
  return ImmutableSparseMap$WonderCommonlib.get(state.nearMap, cameraProjection);
}

function setNear(state, cameraProjection, near) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          dirtyMap: state.dirtyMap,
          pMatrixMap: state.pMatrixMap,
          nearMap: ImmutableSparseMap$WonderCommonlib.set(state.nearMap, cameraProjection, near),
          farMap: state.farMap,
          fovyMap: state.fovyMap,
          aspectMap: state.aspectMap,
          gameObjectMap: state.gameObjectMap,
          gameObjectPerspectiveCameraProjectionMap: state.gameObjectPerspectiveCameraProjectionMap
        };
}

export {
  getPMatrix ,
  setPMatrix ,
  getFovy ,
  setFovy ,
  getAspect ,
  setAspect ,
  getFar ,
  setFar ,
  getNear ,
  setNear ,
  
}
/* No side effect */
