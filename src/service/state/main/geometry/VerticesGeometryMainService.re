open MainStateDataType;

open BoxGeometryType;

open PointsGeometryMainService;

open RecordBoxGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

let getVertices =
  [@bs]
  (
    (mappedIndex, state) => {
      let {vertices, verticesInfoArray} = getRecord(state);
      getFloat32PointData(mappedIndex, vertices, verticesInfoArray)
    }
  );

/* let getVertices =
   [@bs]
   (
     (mappedIndex, {boxGeometryRecord}) =>
       VerticesService.getVertices(mappedIndex, boxGeometryRecord.verticesMap)
   ); */
let setVertices = (mappedIndex: int, data: array(float), state) => {
  let {verticesInfoArray, vertices, verticesOffset} as record = getRecord(state);
  record.verticesOffset =
    setFloat32PointData(
      mappedIndex,
      verticesInfoArray,
      verticesOffset,
      Js.Array.length(data),
      fillFloat32Array(vertices, data)
    );
  state |> ensureCheckNotExceedGeometryPointDataBufferCount(verticesOffset)
};

let setVerticesWithTypeArray = (mappedIndex: int, data: Float32Array.t, state) => {
  let {verticesInfoArray, vertices, verticesOffset} as record = getRecord(state);
  record.verticesOffset =
    setFloat32PointData(
      mappedIndex,
      verticesInfoArray,
      verticesOffset,
      Float32Array.length(data),
      fillFloat32ArrayWithOffset(vertices, data)
    );
  state |> ensureCheckNotExceedGeometryPointDataBufferCount(verticesOffset)
};
/* let setVerticesWithArray = (mappedIndex: int, record: array(float), state: MainStateDataType.state) => {
   let {verticesMap} as boxGeometryRecord = state.boxGeometryRecord;
   /* {
        ...state,
        boxGeometryRecord: {
          ...boxGeometryRecord,
          verticesMap:
            setPointsWithArray(
              (mappedIndex, getVertices(mappedIndex, state), record),
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
       (mappedIndex, [@bs] getVertices(mappedIndex, state), record),
       (
         TypeArrayPoolService.getFloat32TypeArrayFromPool,
         TypeArrayService.fillFloat32Array,
         TypeArrayService.makeFloat32Array
       ),
       (state.typeArrayPoolRecord, verticesMap)
     );
   {...state, typeArrayPoolRecord, boxGeometryRecord: {...boxGeometryRecord, verticesMap}}
    }; */