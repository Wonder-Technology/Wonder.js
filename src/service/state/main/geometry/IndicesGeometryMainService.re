open MainStateDataType;

open BoxGeometryType;

open GeometryType;

open PointsGeometryMainService;

open RecordBoxGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

/* let getIndices =
     [@bs]
     ((index, {boxGeometryRecord}) => IndicesService.getIndices(index, boxGeometryRecord.indicesMap));

   let getIndices =
     [@bs]
     (
       (index, {boxGeometryRecord}) =>
         IndicesService.getIndices(index, boxGeometryRecord.indicesMap)
     );

   let setIndicesWithArray = (index: int, record: array(int), state: MainStateDataType.state) => {
     let {indicesMap} as boxGeometryRecord = state.boxGeometryRecord;
     let (typeArrayPoolRecord, indicesMap) =
       setPointsWithArray(
         (index, [@bs] getIndices(index, state), record),
         (
           TypeArrayPoolService.getUint16TypeArrayFromPool,
           TypeArrayService.fillUint16Array,
           TypeArrayService.makeUint16Array
         ),
         (state.typeArrayPoolRecord, indicesMap)
       );
     {...state, typeArrayPoolRecord, boxGeometryRecord: {...boxGeometryRecord, indicesMap}}
   }; */
let getIndices =
  [@bs]
  (
    (mappedIndex: int, state) => {
      let {indices, indicesInfoArray} = getRecord(state);
      getUint16PointData(mappedIndex, indices, indicesInfoArray)
    }
  );

let setIndices = (mappedIndex: int, data: array(int), state) => {
  let {indicesInfoArray, indices, indicesOffset} as record = getRecord(state);
  record.indicesOffset =
    setUint16PointData(
      mappedIndex,
      indicesInfoArray,
      indicesOffset,
      Js.Array.length(data),
      fillUint16Array(indices, data)
    );
  state |> ensureCheckNotExceedGeometryPointDataBufferCount(indicesOffset)
};

let setIndicesWithTypeArray = (mappedIndex: int, data: Uint16Array.t, state) => {
  let {indicesInfoArray, indices, indicesOffset} as record = getRecord(state);
  record.indicesOffset =
    setUint16PointData(
      mappedIndex,
      indicesInfoArray,
      indicesOffset,
      Uint16Array.length(data),
      fillUint16ArrWithOffset(indices, data)
    );
  state |> ensureCheckNotExceedGeometryPointDataBufferCount(indicesOffset)
};

let getIndicesCount = (mappedIndex, state) => {
  let {indicesInfoArray} = getRecord(state);
  let {startIndex, endIndex} = PointsGeometryMainService.getInfo(indicesInfoArray, mappedIndex);
  endIndex - startIndex + 1
};