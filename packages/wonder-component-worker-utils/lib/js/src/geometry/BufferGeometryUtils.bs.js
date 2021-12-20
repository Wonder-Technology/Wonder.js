'use strict';

var SharedArrayBufferUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/SharedArrayBufferUtils.bs.js");

function getVertexSize(param) {
  return 3;
}

function getTexCoordsSize(param) {
  return 2;
}

function getVertexLength(geometryPointCount) {
  return Math.imul(geometryPointCount, 3);
}

function getTexCoordsLength(geometryPointCount) {
  return (geometryPointCount << 1);
}

function getVerticesOffset(geometryPointCount) {
  return 0;
}

function getTexCoordsOffset(geometryPointCount) {
  return 0 + Math.imul(Math.imul(geometryPointCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getNormalsOffset(geometryPointCount) {
  return getTexCoordsOffset(geometryPointCount) + Math.imul((geometryPointCount << 1), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getTangentsOffset(geometryPointCount) {
  return getNormalsOffset(geometryPointCount) + Math.imul(Math.imul(geometryPointCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getIndexSize(param) {
  return 1;
}

function getIndicesLength(geometryPointCount) {
  return ((3 + Math.imul(geometryPointCount - 3 | 0, 3) | 0) << 0);
}

function getIndicesOffset(geometryPointCount) {
  return getTangentsOffset(geometryPointCount) + Math.imul(Math.imul(geometryPointCount, 3), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getInfoSize(param) {
  return 2;
}

function getVerticesInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getVerticesInfosOffset(geometryPointCount) {
  return getIndicesOffset(geometryPointCount) + Math.imul(getIndicesLength(geometryPointCount), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getTexCoordsInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getTexCoordsInfosOffset(geometryPointCount, geometryCount) {
  return getVerticesInfosOffset(geometryPointCount) + Math.imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getNormalsInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getNormalsInfosOffset(geometryPointCount, geometryCount) {
  return getTexCoordsInfosOffset(geometryPointCount, geometryCount) + Math.imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getTangentsInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getTangentsInfosOffset(geometryPointCount, geometryCount) {
  return getNormalsInfosOffset(geometryPointCount, geometryCount) + Math.imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getIndicesInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getIndicesInfosOffset(geometryPointCount, geometryCount) {
  return getTangentsInfosOffset(geometryPointCount, geometryCount) + Math.imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getVertexIndex(index) {
  return Math.imul(index, 3);
}

function getTexCoordIndex(index) {
  return (index << 1);
}

function getIndexIndex(index) {
  return (index << 0);
}

function getInfoIndex(index) {
  return (index << 1);
}

function getTotalByteLength(geometryPointCount, geometryCount) {
  return (Math.imul(geometryPointCount, Math.imul(Math.imul(Float32Array.BYTES_PER_ELEMENT, 3), 3) + (Float32Array.BYTES_PER_ELEMENT << 1) | 0) + Math.imul(getIndicesLength(geometryPointCount), Uint32Array.BYTES_PER_ELEMENT) | 0) + Math.imul(Math.imul(geometryCount, Uint32Array.BYTES_PER_ELEMENT), 10) | 0;
}

function createBuffer(geometryPointCount, geometryCount) {
  return SharedArrayBufferUtils$WonderCommonlib.newSharedArrayBuffer(getTotalByteLength(geometryPointCount, geometryCount));
}

exports.getVertexSize = getVertexSize;
exports.getTexCoordsSize = getTexCoordsSize;
exports.getVertexLength = getVertexLength;
exports.getTexCoordsLength = getTexCoordsLength;
exports.getVerticesOffset = getVerticesOffset;
exports.getTexCoordsOffset = getTexCoordsOffset;
exports.getNormalsOffset = getNormalsOffset;
exports.getTangentsOffset = getTangentsOffset;
exports.getIndexSize = getIndexSize;
exports.getIndicesLength = getIndicesLength;
exports.getIndicesOffset = getIndicesOffset;
exports.getInfoSize = getInfoSize;
exports.getVerticesInfosLength = getVerticesInfosLength;
exports.getVerticesInfosOffset = getVerticesInfosOffset;
exports.getTexCoordsInfosLength = getTexCoordsInfosLength;
exports.getTexCoordsInfosOffset = getTexCoordsInfosOffset;
exports.getNormalsInfosLength = getNormalsInfosLength;
exports.getNormalsInfosOffset = getNormalsInfosOffset;
exports.getTangentsInfosLength = getTangentsInfosLength;
exports.getTangentsInfosOffset = getTangentsInfosOffset;
exports.getIndicesInfosLength = getIndicesInfosLength;
exports.getIndicesInfosOffset = getIndicesInfosOffset;
exports.getVertexIndex = getVertexIndex;
exports.getTexCoordIndex = getTexCoordIndex;
exports.getIndexIndex = getIndexIndex;
exports.getInfoIndex = getInfoIndex;
exports.getTotalByteLength = getTotalByteLength;
exports.createBuffer = createBuffer;
/* No side effect */
