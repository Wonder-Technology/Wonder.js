'use strict';

var ListSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ListSt.bs.js");
var CreateMapComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/CreateMapComponentUtils.bs.js");
var BufferTransformUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/transform/BufferTransformUtils.bs.js");
var OperateTypeArrayTransformUtils$WonderComponentTransform = require("../utils/OperateTypeArrayTransformUtils.bs.js");
var CreateTypeArrayTransformUtils$WonderComponentWorkerUtils = require("wonder-component-worker-utils/lib/js/src/transform/CreateTypeArrayTransformUtils.bs.js");

function _setAllTypeArrDataToDefault(param, count, param$1) {
  var defaultLocalScale = param$1[3];
  var defaultLocalRotation = param$1[2];
  var defaultLocalPosition = param$1[1];
  var defaultLocalToWorldMatrix = param$1[0];
  var localScales = param[3];
  var localRotations = param[2];
  var localPositions = param[1];
  var localToWorldMatrices = param[0];
  ListSt$WonderCommonlib.forEach(ListSt$WonderCommonlib.range(0, count - 1 | 0), (function (index) {
          OperateTypeArrayTransformUtils$WonderComponentTransform.setLocalToWorldMatrix(index, defaultLocalToWorldMatrix, localToWorldMatrices);
          OperateTypeArrayTransformUtils$WonderComponentTransform.setLocalPosition(index, defaultLocalPosition, localPositions);
          OperateTypeArrayTransformUtils$WonderComponentTransform.setLocalRotation(index, defaultLocalRotation, localRotations);
          return OperateTypeArrayTransformUtils$WonderComponentTransform.setLocalScale(index, defaultLocalScale, localScales);
        }));
  return [
          localToWorldMatrices,
          localPositions,
          localRotations,
          localScales
        ];
}

function _initBufferData(count, defaultDataTuple) {
  var buffer = BufferTransformUtils$WonderComponentWorkerUtils.createBuffer(count);
  var typeArrData = _setAllTypeArrDataToDefault(CreateTypeArrayTransformUtils$WonderComponentWorkerUtils.createTypeArrays(buffer, count), count, defaultDataTuple);
  return [
          buffer,
          typeArrData
        ];
}

function createStateWithSharedArrayBufferData(param, param$1, param$2) {
  var transformCount = param[1];
  var localToWorldMatrices = param$2.localToWorldMatrices;
  var localPositions = param$2.localPositions;
  var localRotations = param$2.localRotations;
  var localScales = param$2.localScales;
  return {
          config: {
            isDebug: param[0],
            transformCount: transformCount,
            float9Array1: param[2],
            float32Array1: param[3]
          },
          maxIndex: 0,
          buffer: param$2.buffer,
          localToWorldMatrices: localToWorldMatrices,
          localPositions: localPositions,
          localRotations: localRotations,
          localScales: localScales,
          defaultLocalToWorldMatrix: param$1[0],
          defaultLocalPosition: param$1[1],
          defaultLocalRotation: param$1[2],
          defaultLocalScale: param$1[3],
          parentMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(transformCount),
          childrenMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(transformCount),
          gameObjectMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(transformCount),
          gameObjectTransformMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(transformCount),
          dirtyMap: CreateMapComponentUtils$WonderCommonlib.createEmptyMap(transformCount)
        };
}

function createState(isDebug, transformCount, float9Array1, float32Array1) {
  var defaultLocalToWorldMatrix = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ];
  var defaultLocalPosition = [
    0,
    0,
    0
  ];
  var defaultLocalRotation = [
    0,
    0,
    0,
    1
  ];
  var defaultLocalScale = [
    1,
    1,
    1
  ];
  var match = _initBufferData(transformCount, [
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        defaultLocalRotation,
        defaultLocalScale
      ]);
  var match$1 = match[1];
  return createStateWithSharedArrayBufferData([
              isDebug,
              transformCount,
              float9Array1,
              float32Array1
            ], [
              defaultLocalToWorldMatrix,
              defaultLocalPosition,
              defaultLocalRotation,
              defaultLocalScale
            ], {
              buffer: match[0],
              localToWorldMatrices: match$1[0],
              localPositions: match$1[1],
              localRotations: match$1[2],
              localScales: match$1[3]
            });
}

exports._setAllTypeArrDataToDefault = _setAllTypeArrDataToDefault;
exports._initBufferData = _initBufferData;
exports.createStateWithSharedArrayBufferData = createStateWithSharedArrayBufferData;
exports.createState = createState;
/* No side effect */
