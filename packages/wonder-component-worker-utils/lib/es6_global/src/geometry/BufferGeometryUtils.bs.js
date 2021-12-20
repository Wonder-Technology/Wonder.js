

import * as SharedArrayBufferUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/SharedArrayBufferUtils.bs.js";

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

export {
  getVertexSize ,
  getTexCoordsSize ,
  getVertexLength ,
  getTexCoordsLength ,
  getVerticesOffset ,
  getTexCoordsOffset ,
  getNormalsOffset ,
  getTangentsOffset ,
  getIndexSize ,
  getIndicesLength ,
  getIndicesOffset ,
  getInfoSize ,
  getVerticesInfosLength ,
  getVerticesInfosOffset ,
  getTexCoordsInfosLength ,
  getTexCoordsInfosOffset ,
  getNormalsInfosLength ,
  getNormalsInfosOffset ,
  getTangentsInfosLength ,
  getTangentsInfosOffset ,
  getIndicesInfosLength ,
  getIndicesInfosOffset ,
  getVertexIndex ,
  getTexCoordIndex ,
  getIndexIndex ,
  getInfoIndex ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* No side effect */
