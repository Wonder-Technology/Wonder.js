open MainStateDataType;

open CustomGeometryType;

open PointsGeometryMainService;

open RecordCustomGeometryMainService;

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