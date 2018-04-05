open StateDataMainType;

open CustomGeometryType;

open GeometryType;

open ReallocatedPointsGeometryService;

open RecordCustomGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

/* let getIndices =
  [@bs]
  (
    (index: int, state) => {
      let {indices, indicesInfoArray} = getRecord(state);
      getUint16PointData(index, indices, indicesInfoArray)
    }
  ); */

let setIndices = (index: int, data: array(int), state) => {
  let {indicesInfoArray, indices, indicesOffset} as record = getRecord(state);
  record.indicesOffset =
    setUint16PointData(
      index,
      indicesInfoArray,
      indicesOffset,
      Js.Array.length(data),
      fillUint16Array(indices, data)
    );
  state
};

let setIndicesByTypeArray = (index: int, data: Uint16Array.t, state) => {
  let {indicesInfoArray, indices, indicesOffset} as record = getRecord(state);
  record.indicesOffset =
    setUint16PointData(
      index,
      indicesInfoArray,
      indicesOffset,
      Uint16Array.length(data),
      fillUint16ArrWithOffset(indices, data)
    );
  state
};
/* 
let getIndicesCount = (index, state) => {
  let {indicesInfoArray} = getRecord(state);
  let {startIndex, endIndex} = ReallocatedPointsGeometryService.getInfo(indicesInfoArray, index);
  endIndex - startIndex
}; */