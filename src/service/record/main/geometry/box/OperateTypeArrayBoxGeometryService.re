open BufferBoxGeometryService;

open Js.Typed_array;

let getVerticesTypeArray = (index: int, points: Float32Array.t) =>
  TypeArrayService.getFloat32ArrSubarray(
    points,
    getVertexIndex(index),
    getVertexIndex(index) + getVerticesCount()
  );

let setVertices = (index: int, points: array(float), typeArr) =>
  TypeArrayService.fillFloat32Array(typeArr, points, getVertexIndex(index));

let setVerticesByTypeArray = (index: int, points: Float32Array.t, typeArr) =>
  TypeArrayService.fillFloat32ArrayWithOffset(typeArr, points, getVertexIndex(index));

let getNormalsTypeArray = (index: int, points: Float32Array.t) =>
  TypeArrayService.getFloat32ArrSubarray(
    points,
    getNormalIndex(index),
    getNormalIndex(index) + getNormalsCount()
  );

let setNormals = (index: int, points: array(float), typeArr) =>
  TypeArrayService.fillFloat32Array(typeArr, points, getNormalIndex(index));

let setNormalsByTypeArray = (index: int, points: Float32Array.t, typeArr) =>
  TypeArrayService.fillFloat32ArrayWithOffset(typeArr, points, getNormalIndex(index));

let getIndicesTypeArray = (index: int, points: Uint16Array.t) =>
  TypeArrayService.getUint16ArrSubarray(
    points,
    getIndexIndex(index),
    getIndexIndex(index) + getIndicesCount()
  );

let setIndices = (index: int, points: array(int), typeArr) =>
  TypeArrayService.fillUint16Array(typeArr, points, getIndexIndex(index));

let setIndicesByTypeArray = (index: int, points: Uint16Array.t, typeArr) =>
  TypeArrayService.fillUint16ArrWithOffset(typeArr, points, getIndexIndex(index));