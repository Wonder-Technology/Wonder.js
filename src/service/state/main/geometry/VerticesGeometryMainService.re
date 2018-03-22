open MainStateDataType;

open BoxGeometryType;

open PointsGeometryMainService;

open RecordBoxGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

let getVertices =
  [@bs]
  (
    (index, state) => {
      let {vertices, verticesInfoArray} = getRecord(state);
      getFloat32PointData(index, vertices, verticesInfoArray)
    }
  );

/* let getVertices =
   [@bs]
   (
     (index, {boxGeometryRecord}) =>
       VerticesService.getVertices(index, boxGeometryRecord.verticesMap)
   ); */
let setVertices = (index, data: array(float), state) => {
  let {verticesInfoArray, vertices, verticesOffset} as record = getRecord(state);
  record.verticesOffset =
    setFloat32PointData(
      index,
      verticesInfoArray,
      verticesOffset,
      Js.Array.length(data),
      fillFloat32Array(vertices, data)
    );
  state |> ensureCheckNotExceedGeometryPointDataBufferCount(verticesOffset)
};

let setVerticesWithTypeArray = (index: int, data: Float32Array.t, state) => {
  let {verticesInfoArray, vertices, verticesOffset} as record = getRecord(state);
  record.verticesOffset =
    setFloat32PointData(
      index,
      verticesInfoArray,
      verticesOffset,
      Float32Array.length(data),
      fillFloat32ArrayWithOffset(vertices, data)
    );
  state |> ensureCheckNotExceedGeometryPointDataBufferCount(verticesOffset)
};
/* let setVerticesWithArray = (index: int, record: array(float), state: MainStateDataType.state) => {
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
    }; */