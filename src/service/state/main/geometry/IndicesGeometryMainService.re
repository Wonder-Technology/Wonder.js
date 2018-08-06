open StateDataMainType;

open GeometryType;

open GeometryType;

open ReallocatedPointsGeometryService;

open RecordGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

let getIndices =
  [@bs]
  (
    (index: int, state) => {
      let {indices, indicesInfos} = getRecord(state);
      getUint16PointData(BufferGeometryService.getInfoIndex(index), indices, indicesInfos)
    }
  );

let setIndicesByTypeArray = (index: int, data: Uint16Array.t, state) => {
  let {indicesInfos, indices, indicesOffset} as record = getRecord(state);
  record.indicesOffset =
    setUint16PointData(
      (
        BufferGeometryService.getInfoIndex(index),
        indicesInfos,
        indicesOffset,
        Uint16Array.length(data)
      ),
      fillUint16ArrayWithOffset(indices, data)
    );
  state
};
/*
 let getIndicesCount = (index, state) => {
   let {indicesInfos} = getRecord(state);
   let {startIndex, endIndex} = ReallocatedPointsGeometryService.getInfo(indicesInfos, index);
   endIndex - startIndex
 }; */