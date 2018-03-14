open StateDataType;

open BoxGeometryType;

open PointsGeometryMainService;

let getIndices =
  [@bs]
  ((index, {boxGeometryRecord}) => IndicesService.getIndices(index, boxGeometryRecord.indicesMap));

let unsafeGetIndices =
  [@bs]
  (
    (index, {boxGeometryRecord}) =>
      IndicesService.unsafeGetIndices(index, boxGeometryRecord.indicesMap)
  );

let setIndicesWithArray = (index: int, record: array(int), state: StateDataType.state) => {
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
};