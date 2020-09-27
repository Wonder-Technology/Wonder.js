'use strict';

var CPRepo$Wonderjs = require("../../../../data/container/CPRepo.bs.js");
var ListSt$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");
var OperateTypeArrayTransformCPRepoUtils$Wonderjs = require("./utils/OperateTypeArrayTransformCPRepoUtils.bs.js");

function getMaxIndex(param) {
  return CPRepo$Wonderjs.getExnTransform(undefined).maxIndex;
}

function setMaxIndex(maxIndex) {
  var init = CPRepo$Wonderjs.getExnTransform(undefined);
  return CPRepo$Wonderjs.setTransform({
              maxIndex: maxIndex,
              buffer: init.buffer,
              localToWorldMatrices: init.localToWorldMatrices,
              localPositions: init.localPositions,
              localRotations: init.localRotations,
              localScales: init.localScales,
              defaultLocalToWorldMatrix: init.defaultLocalToWorldMatrix,
              defaultLocalPosition: init.defaultLocalPosition,
              defaultLocalRotation: init.defaultLocalRotation,
              defaultLocalScale: init.defaultLocalScale,
              parentMap: init.parentMap,
              childrenMap: init.childrenMap,
              gameObjectMap: init.gameObjectMap,
              dirtyMap: init.dirtyMap
            });
}

function getGameObject(transform) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnTransform(undefined).gameObjectMap, transform);
}

function setGameObject(transform, gameObject) {
  var transformPO = CPRepo$Wonderjs.getExnTransform(undefined);
  return CPRepo$Wonderjs.setTransform({
              maxIndex: transformPO.maxIndex,
              buffer: transformPO.buffer,
              localToWorldMatrices: transformPO.localToWorldMatrices,
              localPositions: transformPO.localPositions,
              localRotations: transformPO.localRotations,
              localScales: transformPO.localScales,
              defaultLocalToWorldMatrix: transformPO.defaultLocalToWorldMatrix,
              defaultLocalPosition: transformPO.defaultLocalPosition,
              defaultLocalRotation: transformPO.defaultLocalRotation,
              defaultLocalScale: transformPO.defaultLocalScale,
              parentMap: transformPO.parentMap,
              childrenMap: transformPO.childrenMap,
              gameObjectMap: ImmutableSparseMap$Wonderjs.set(transformPO.gameObjectMap, transform, gameObject),
              dirtyMap: transformPO.dirtyMap
            });
}

function getParent(transform) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnTransform(undefined).parentMap, transform);
}

function setParent(parent, child) {
  var transformPO = CPRepo$Wonderjs.getExnTransform(undefined);
  return CPRepo$Wonderjs.setTransform({
              maxIndex: transformPO.maxIndex,
              buffer: transformPO.buffer,
              localToWorldMatrices: transformPO.localToWorldMatrices,
              localPositions: transformPO.localPositions,
              localRotations: transformPO.localRotations,
              localScales: transformPO.localScales,
              defaultLocalToWorldMatrix: transformPO.defaultLocalToWorldMatrix,
              defaultLocalPosition: transformPO.defaultLocalPosition,
              defaultLocalRotation: transformPO.defaultLocalRotation,
              defaultLocalScale: transformPO.defaultLocalScale,
              parentMap: ImmutableSparseMap$Wonderjs.set(transformPO.parentMap, child, parent),
              childrenMap: transformPO.childrenMap,
              gameObjectMap: transformPO.gameObjectMap,
              dirtyMap: transformPO.dirtyMap
            });
}

function hasParent(transform) {
  return ImmutableSparseMap$Wonderjs.has(CPRepo$Wonderjs.getExnTransform(undefined).parentMap, transform);
}

function removeParent(transform) {
  var transformPO = CPRepo$Wonderjs.getExnTransform(undefined);
  return CPRepo$Wonderjs.setTransform({
              maxIndex: transformPO.maxIndex,
              buffer: transformPO.buffer,
              localToWorldMatrices: transformPO.localToWorldMatrices,
              localPositions: transformPO.localPositions,
              localRotations: transformPO.localRotations,
              localScales: transformPO.localScales,
              defaultLocalToWorldMatrix: transformPO.defaultLocalToWorldMatrix,
              defaultLocalPosition: transformPO.defaultLocalPosition,
              defaultLocalRotation: transformPO.defaultLocalRotation,
              defaultLocalScale: transformPO.defaultLocalScale,
              parentMap: ImmutableSparseMap$Wonderjs.remove(transformPO.parentMap, transform),
              childrenMap: transformPO.childrenMap,
              gameObjectMap: transformPO.gameObjectMap,
              dirtyMap: transformPO.dirtyMap
            });
}

function getChildren(transform) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnTransform(undefined).childrenMap, transform);
}

function setChildren(parent, children) {
  var transformPO = CPRepo$Wonderjs.getExnTransform(undefined);
  return CPRepo$Wonderjs.setTransform({
              maxIndex: transformPO.maxIndex,
              buffer: transformPO.buffer,
              localToWorldMatrices: transformPO.localToWorldMatrices,
              localPositions: transformPO.localPositions,
              localRotations: transformPO.localRotations,
              localScales: transformPO.localScales,
              defaultLocalToWorldMatrix: transformPO.defaultLocalToWorldMatrix,
              defaultLocalPosition: transformPO.defaultLocalPosition,
              defaultLocalRotation: transformPO.defaultLocalRotation,
              defaultLocalScale: transformPO.defaultLocalScale,
              parentMap: transformPO.parentMap,
              childrenMap: ImmutableSparseMap$Wonderjs.set(transformPO.childrenMap, parent, children),
              gameObjectMap: transformPO.gameObjectMap,
              dirtyMap: transformPO.dirtyMap
            });
}

function addChild(parent, child) {
  var transformPO = CPRepo$Wonderjs.getExnTransform(undefined);
  var childrenMap = transformPO.childrenMap;
  var children = ImmutableSparseMap$Wonderjs.get(childrenMap, parent);
  var children$1 = children !== undefined ? children : /* [] */0;
  return CPRepo$Wonderjs.setTransform({
              maxIndex: transformPO.maxIndex,
              buffer: transformPO.buffer,
              localToWorldMatrices: transformPO.localToWorldMatrices,
              localPositions: transformPO.localPositions,
              localRotations: transformPO.localRotations,
              localScales: transformPO.localScales,
              defaultLocalToWorldMatrix: transformPO.defaultLocalToWorldMatrix,
              defaultLocalPosition: transformPO.defaultLocalPosition,
              defaultLocalRotation: transformPO.defaultLocalRotation,
              defaultLocalScale: transformPO.defaultLocalScale,
              parentMap: transformPO.parentMap,
              childrenMap: ImmutableSparseMap$Wonderjs.set(childrenMap, parent, {
                    hd: child,
                    tl: children$1
                  }),
              gameObjectMap: transformPO.gameObjectMap,
              dirtyMap: transformPO.dirtyMap
            });
}

function removeChild(parent, child) {
  var transformPO = CPRepo$Wonderjs.getExnTransform(undefined);
  var childrenMap = transformPO.childrenMap;
  var children = ImmutableSparseMap$Wonderjs.get(childrenMap, parent);
  if (children !== undefined) {
    return CPRepo$Wonderjs.setTransform({
                maxIndex: transformPO.maxIndex,
                buffer: transformPO.buffer,
                localToWorldMatrices: transformPO.localToWorldMatrices,
                localPositions: transformPO.localPositions,
                localRotations: transformPO.localRotations,
                localScales: transformPO.localScales,
                defaultLocalToWorldMatrix: transformPO.defaultLocalToWorldMatrix,
                defaultLocalPosition: transformPO.defaultLocalPosition,
                defaultLocalRotation: transformPO.defaultLocalRotation,
                defaultLocalScale: transformPO.defaultLocalScale,
                parentMap: transformPO.parentMap,
                childrenMap: ImmutableSparseMap$Wonderjs.set(childrenMap, parent, ListSt$Wonderjs.remove(children, child)),
                gameObjectMap: transformPO.gameObjectMap,
                dirtyMap: transformPO.dirtyMap
              });
  }
  
}

function getIsDirty(transform) {
  return ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getExnTransform(undefined).dirtyMap, transform);
}

function setIsDirty(transform, isDirty) {
  var transformPO = CPRepo$Wonderjs.getExnTransform(undefined);
  return CPRepo$Wonderjs.setTransform({
              maxIndex: transformPO.maxIndex,
              buffer: transformPO.buffer,
              localToWorldMatrices: transformPO.localToWorldMatrices,
              localPositions: transformPO.localPositions,
              localRotations: transformPO.localRotations,
              localScales: transformPO.localScales,
              defaultLocalToWorldMatrix: transformPO.defaultLocalToWorldMatrix,
              defaultLocalPosition: transformPO.defaultLocalPosition,
              defaultLocalRotation: transformPO.defaultLocalRotation,
              defaultLocalScale: transformPO.defaultLocalScale,
              parentMap: transformPO.parentMap,
              childrenMap: transformPO.childrenMap,
              gameObjectMap: transformPO.gameObjectMap,
              dirtyMap: ImmutableSparseMap$Wonderjs.set(transformPO.dirtyMap, transform, isDirty)
            });
}

function getLocalToWorldMatrix(transform) {
  return OperateTypeArrayTransformCPRepoUtils$Wonderjs.getLocalToWorldMatrixTypeArray(transform, CPRepo$Wonderjs.getExnTransform(undefined).localToWorldMatrices);
}

function getLocalPosition(transform) {
  return OperateTypeArrayTransformCPRepoUtils$Wonderjs.getLocalPositionTuple(transform, CPRepo$Wonderjs.getExnTransform(undefined).localPositions);
}

function setLocalPosition(transform, position) {
  return OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalPosition(transform, position, CPRepo$Wonderjs.getExnTransform(undefined).localPositions);
}

function getLocalRotation(transform) {
  return OperateTypeArrayTransformCPRepoUtils$Wonderjs.getLocalRotationTuple(transform, CPRepo$Wonderjs.getExnTransform(undefined).localRotations);
}

function setLocalRotation(transform, rotation) {
  return OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalRotation(transform, rotation, CPRepo$Wonderjs.getExnTransform(undefined).localRotations);
}

function getLocalScale(transform) {
  return OperateTypeArrayTransformCPRepoUtils$Wonderjs.getLocalScaleTuple(transform, CPRepo$Wonderjs.getExnTransform(undefined).localScales);
}

function setLocalScale(transform, scale) {
  return OperateTypeArrayTransformCPRepoUtils$Wonderjs.setLocalScale(transform, scale, CPRepo$Wonderjs.getExnTransform(undefined).localScales);
}

exports.getMaxIndex = getMaxIndex;
exports.setMaxIndex = setMaxIndex;
exports.getGameObject = getGameObject;
exports.setGameObject = setGameObject;
exports.getParent = getParent;
exports.setParent = setParent;
exports.hasParent = hasParent;
exports.removeParent = removeParent;
exports.getChildren = getChildren;
exports.setChildren = setChildren;
exports.addChild = addChild;
exports.removeChild = removeChild;
exports.getIsDirty = getIsDirty;
exports.setIsDirty = setIsDirty;
exports.getLocalToWorldMatrix = getLocalToWorldMatrix;
exports.getLocalPosition = getLocalPosition;
exports.setLocalPosition = setLocalPosition;
exports.getLocalRotation = getLocalRotation;
exports.setLocalRotation = setLocalRotation;
exports.getLocalScale = getLocalScale;
exports.setLocalScale = setLocalScale;
/* CPRepo-Wonderjs Not a pure module */
