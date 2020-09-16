'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var CPRepo$Wonderjs = require("../../../../data/container/CPRepo.bs.js");
var DirtyListRepoUtils$Wonderjs = require("../../utils/DirtyListRepoUtils.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");

function getMaxIndex(param) {
  return CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined).maxIndex;
}

function setMaxIndex(maxIndex) {
  var init = CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined);
  return CPRepo$Wonderjs.setPerspectiveCameraProjection({
              maxIndex: maxIndex,
              dirtyList: init.dirtyList,
              pMatrixMap: init.pMatrixMap,
              nearMap: init.nearMap,
              farMap: init.farMap,
              fovyMap: init.fovyMap,
              aspectMap: init.aspectMap,
              gameObjectMap: init.gameObjectMap
            });
}

function getGameObject(cameraProjection) {
  return ImmutableSparseMap$Wonderjs.getNullable(CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined).gameObjectMap, cameraProjection);
}

function setGameObject(cameraProjection, gameObject) {
  var cameraProjectionPO = CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined);
  return CPRepo$Wonderjs.setPerspectiveCameraProjection({
              maxIndex: cameraProjectionPO.maxIndex,
              dirtyList: cameraProjectionPO.dirtyList,
              pMatrixMap: cameraProjectionPO.pMatrixMap,
              nearMap: cameraProjectionPO.nearMap,
              farMap: cameraProjectionPO.farMap,
              fovyMap: cameraProjectionPO.fovyMap,
              aspectMap: cameraProjectionPO.aspectMap,
              gameObjectMap: ImmutableSparseMap$Wonderjs.set(cameraProjectionPO.gameObjectMap, cameraProjection, gameObject)
            });
}

function getPMatrix(cameraProjection) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined).pMatrixMap, cameraProjection);
}

function setPMatrix(cameraProjection, pMatrix) {
  var cameraProjectionPO = CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined);
  return CPRepo$Wonderjs.setPerspectiveCameraProjection({
              maxIndex: cameraProjectionPO.maxIndex,
              dirtyList: cameraProjectionPO.dirtyList,
              pMatrixMap: ImmutableSparseMap$Wonderjs.set(cameraProjectionPO.pMatrixMap, cameraProjection, pMatrix),
              nearMap: cameraProjectionPO.nearMap,
              farMap: cameraProjectionPO.farMap,
              fovyMap: cameraProjectionPO.fovyMap,
              aspectMap: cameraProjectionPO.aspectMap,
              gameObjectMap: cameraProjectionPO.gameObjectMap
            });
}

function getFovy(cameraProjection) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined).fovyMap, cameraProjection);
}

function setFovy(cameraProjection, fovy) {
  var cameraProjectionPO = CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined);
  return CPRepo$Wonderjs.setPerspectiveCameraProjection({
              maxIndex: cameraProjectionPO.maxIndex,
              dirtyList: cameraProjectionPO.dirtyList,
              pMatrixMap: cameraProjectionPO.pMatrixMap,
              nearMap: cameraProjectionPO.nearMap,
              farMap: cameraProjectionPO.farMap,
              fovyMap: ImmutableSparseMap$Wonderjs.set(cameraProjectionPO.fovyMap, cameraProjection, fovy),
              aspectMap: cameraProjectionPO.aspectMap,
              gameObjectMap: cameraProjectionPO.gameObjectMap
            });
}

function getAspect(cameraProjection) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined).aspectMap, cameraProjection);
}

function setAspect(cameraProjection, aspect) {
  var cameraProjectionPO = CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined);
  return CPRepo$Wonderjs.setPerspectiveCameraProjection({
              maxIndex: cameraProjectionPO.maxIndex,
              dirtyList: cameraProjectionPO.dirtyList,
              pMatrixMap: cameraProjectionPO.pMatrixMap,
              nearMap: cameraProjectionPO.nearMap,
              farMap: cameraProjectionPO.farMap,
              fovyMap: cameraProjectionPO.fovyMap,
              aspectMap: ImmutableSparseMap$Wonderjs.set(cameraProjectionPO.aspectMap, cameraProjection, aspect),
              gameObjectMap: cameraProjectionPO.gameObjectMap
            });
}

function getNear(cameraProjection) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined).nearMap, cameraProjection);
}

function setNear(cameraProjection, near) {
  var cameraProjectionPO = CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined);
  return CPRepo$Wonderjs.setPerspectiveCameraProjection({
              maxIndex: cameraProjectionPO.maxIndex,
              dirtyList: cameraProjectionPO.dirtyList,
              pMatrixMap: cameraProjectionPO.pMatrixMap,
              nearMap: ImmutableSparseMap$Wonderjs.set(cameraProjectionPO.nearMap, cameraProjection, near),
              farMap: cameraProjectionPO.farMap,
              fovyMap: cameraProjectionPO.fovyMap,
              aspectMap: cameraProjectionPO.aspectMap,
              gameObjectMap: cameraProjectionPO.gameObjectMap
            });
}

function getFar(cameraProjection) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined).farMap, cameraProjection);
}

function setFar(cameraProjection, far) {
  var cameraProjectionPO = CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined);
  return CPRepo$Wonderjs.setPerspectiveCameraProjection({
              maxIndex: cameraProjectionPO.maxIndex,
              dirtyList: cameraProjectionPO.dirtyList,
              pMatrixMap: cameraProjectionPO.pMatrixMap,
              nearMap: cameraProjectionPO.nearMap,
              farMap: ImmutableSparseMap$Wonderjs.set(cameraProjectionPO.farMap, cameraProjection, far),
              fovyMap: cameraProjectionPO.fovyMap,
              aspectMap: cameraProjectionPO.aspectMap,
              gameObjectMap: cameraProjectionPO.gameObjectMap
            });
}

function _mark(cameraProjection, operateDirtyArrayFunc) {
  var cameraProjectionPO = CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined);
  return CPRepo$Wonderjs.setPerspectiveCameraProjection({
              maxIndex: cameraProjectionPO.maxIndex,
              dirtyList: Curry._2(operateDirtyArrayFunc, cameraProjectionPO.dirtyList, cameraProjection),
              pMatrixMap: cameraProjectionPO.pMatrixMap,
              nearMap: cameraProjectionPO.nearMap,
              farMap: cameraProjectionPO.farMap,
              fovyMap: cameraProjectionPO.fovyMap,
              aspectMap: cameraProjectionPO.aspectMap,
              gameObjectMap: cameraProjectionPO.gameObjectMap
            });
}

function markDirty(cameraProjection) {
  return _mark(cameraProjection, DirtyListRepoUtils$Wonderjs.addToDirtyList);
}

function markNotDirty(cameraProjection) {
  return _mark(cameraProjection, DirtyListRepoUtils$Wonderjs.removeFromDirtyList);
}

function addToDirtyList(cameraProjection) {
  return _mark(cameraProjection, DirtyListRepoUtils$Wonderjs.addToDirtyList);
}

function getDirtyList(param) {
  return CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined).dirtyList;
}

function clearDirtyList(param) {
  var init = CPRepo$Wonderjs.getPerspectiveCameraProjection(undefined);
  return CPRepo$Wonderjs.setPerspectiveCameraProjection({
              maxIndex: init.maxIndex,
              dirtyList: DirtyListRepoUtils$Wonderjs.create(undefined),
              pMatrixMap: init.pMatrixMap,
              nearMap: init.nearMap,
              farMap: init.farMap,
              fovyMap: init.fovyMap,
              aspectMap: init.aspectMap,
              gameObjectMap: init.gameObjectMap
            });
}

exports.getMaxIndex = getMaxIndex;
exports.setMaxIndex = setMaxIndex;
exports.getGameObject = getGameObject;
exports.setGameObject = setGameObject;
exports.getPMatrix = getPMatrix;
exports.setPMatrix = setPMatrix;
exports.getFovy = getFovy;
exports.setFovy = setFovy;
exports.getAspect = getAspect;
exports.setAspect = setAspect;
exports.getNear = getNear;
exports.setNear = setNear;
exports.getFar = getFar;
exports.setFar = setFar;
exports._mark = _mark;
exports.markDirty = markDirty;
exports.markNotDirty = markNotDirty;
exports.addToDirtyList = addToDirtyList;
exports.getDirtyList = getDirtyList;
exports.clearDirtyList = clearDirtyList;
/* CPRepo-Wonderjs Not a pure module */
