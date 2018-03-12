open StateDataType;

open BoxGeometryType;

open PointsGeometryService;

let getNormals =
  [@bs]
  ((index, {boxGeometryRecord}) => NormalsService.getNormals(index, boxGeometryRecord.normalsMap));

let unsafeGetNormals =
  [@bs]
  (
    (index, {boxGeometryRecord}) =>
      NormalsService.unsafeGetNormals(index, boxGeometryRecord.normalsMap)
  );

let setNormalsWithArray = (index: int, record: array(float), state: StateDataType.state) => {
  let {normalsMap} as boxGeometryRecord = state.boxGeometryRecord;
  let (typeArrayPoolRecord, normalsMap) =
    setPointsWithArray(
      (index, [@bs] getNormals(index, state), record),
      (
        TypeArrayPoolService.getFloat32TypeArrayFromPool,
        TypeArrayService.fillFloat32Array,
        TypeArrayService.makeFloat32Array
      ),
      (state.typeArrayPoolRecord, normalsMap)
    );
  {...state, typeArrayPoolRecord, boxGeometryRecord: {...boxGeometryRecord, normalsMap}}
};