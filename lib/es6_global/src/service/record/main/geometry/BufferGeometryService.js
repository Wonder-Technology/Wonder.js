

import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Worker$Wonderjs from "../../../../external/Worker.js";

function getVertexSize(param) {
  return 3;
}

function getTexCoordsSize(param) {
  return 2;
}

function getVertexLength(geometryPointCount) {
  return Caml_int32.imul(geometryPointCount, 3);
}

function getTexCoordsLength(geometryPointCount) {
  return (geometryPointCount << 1);
}

function getVerticesOffset(geometryPointCount) {
  return 0;
}

function getTexCoordsOffset(geometryPointCount) {
  return 0 + Caml_int32.imul(Caml_int32.imul(geometryPointCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getNormalsOffset(geometryPointCount) {
  return getTexCoordsOffset(geometryPointCount) + Caml_int32.imul((geometryPointCount << 1), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getIndexSize(param) {
  return 1;
}

function getIndicesLength(geometryPointCount) {
  return (geometryPointCount << 0);
}

function getIndicesOffset(geometryPointCount) {
  return getNormalsOffset(geometryPointCount) + Caml_int32.imul(Caml_int32.imul(geometryPointCount, 3), Float32Array.BYTES_PER_ELEMENT) | 0;
}

function getIndices32Length(geometryPointCount) {
  return (geometryPointCount << 0);
}

function getIndices32Offset(geometryPointCount) {
  return getIndicesOffset(geometryPointCount) + Caml_int32.imul((geometryPointCount << 0), Uint16Array.BYTES_PER_ELEMENT) | 0;
}

function getInfoSize(param) {
  return 2;
}

function getVerticesInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getVerticesInfosOffset(geometryPointCount) {
  return getIndices32Offset(geometryPointCount) + Caml_int32.imul((geometryPointCount << 0), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getTexCoordsInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getTexCoordsInfosOffset(geometryPointCount, geometryCount) {
  return getVerticesInfosOffset(geometryPointCount) + Caml_int32.imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getNormalsInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getNormalsInfosOffset(geometryPointCount, geometryCount) {
  return getTexCoordsInfosOffset(geometryPointCount, geometryCount) + Caml_int32.imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getIndicesInfosLength(geometryCount) {
  return (geometryCount << 1);
}

function getIndicesInfosOffset(geometryPointCount, geometryCount) {
  return getNormalsInfosOffset(geometryPointCount, geometryCount) + Caml_int32.imul((geometryCount << 1), Uint32Array.BYTES_PER_ELEMENT) | 0;
}

function getVertexIndex(index) {
  return Caml_int32.imul(index, 3);
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
  return Caml_int32.imul(geometryPointCount, (((Caml_int32.imul(Float32Array.BYTES_PER_ELEMENT, 3) << 1) + (Float32Array.BYTES_PER_ELEMENT << 1) | 0) + (Uint16Array.BYTES_PER_ELEMENT << 0) | 0) + (Uint32Array.BYTES_PER_ELEMENT << 0) | 0) + (Caml_int32.imul(geometryCount, Uint32Array.BYTES_PER_ELEMENT) << 3) | 0;
}

function createBuffer(geometryPointCount, geometryCount) {
  return Worker$Wonderjs.newSharedArrayBuffer(getTotalByteLength(geometryPointCount, geometryCount));
}

export {
  getVertexSize ,
  getTexCoordsSize ,
  getVertexLength ,
  getTexCoordsLength ,
  getVerticesOffset ,
  getTexCoordsOffset ,
  getNormalsOffset ,
  getIndexSize ,
  getIndicesLength ,
  getIndicesOffset ,
  getIndices32Length ,
  getIndices32Offset ,
  getInfoSize ,
  getVerticesInfosLength ,
  getVerticesInfosOffset ,
  getTexCoordsInfosLength ,
  getTexCoordsInfosOffset ,
  getNormalsInfosLength ,
  getNormalsInfosOffset ,
  getIndicesInfosLength ,
  getIndicesInfosOffset ,
  getVertexIndex ,
  getTexCoordIndex ,
  getIndexIndex ,
  getInfoIndex ,
  getTotalByteLength ,
  createBuffer ,
  
}
/* Worker-Wonderjs Not a pure module */
