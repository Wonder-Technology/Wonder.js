open StateDataType;

open BoxGeometryType;

open PointsGeometryService;

let getVertices =
  [@bs]
  (
    (index, {boxGeometryRecord}) =>
      VerticesService.getVertices(index, boxGeometryRecord.verticesMap)
  );

let unsafeGetVertices =
  [@bs]
  (
    (index, {boxGeometryRecord}) =>
      VerticesService.unsafeGetVertices(index, boxGeometryRecord.verticesMap)
  );

let setVerticesWithArray = (index: int, record: array(float), state: StateDataType.state) => {
  let {verticesMap} as boxGeometryRecord = state.boxGeometryRecord;
  /* {
       ...state,
       boxGeometryRecord: {
         ...boxGeometryRecord,
         verticesMap:
           setPointsWithArray(
             (index, getVertices(index, state), record),
             (
               TypeArrayPoolService.getFloat32TypeArrayFromPool,
               TypeArrayService.fillFloat32Array,
               TypeArrayService.makeFloat32Array
             ),
             (state.typeArrayPoolRecord, verticesMap)
           )
       }
     } */
  let (typeArrayPoolRecord, verticesMap) =
    setPointsWithArray(
      (index, [@bs] getVertices(index, state), record),
      (
        TypeArrayPoolService.getFloat32TypeArrayFromPool,
        TypeArrayService.fillFloat32Array,
        TypeArrayService.makeFloat32Array
      ),
      (state.typeArrayPoolRecord, verticesMap)
    );
  {...state, typeArrayPoolRecord, boxGeometryRecord: {...boxGeometryRecord, verticesMap}}
};