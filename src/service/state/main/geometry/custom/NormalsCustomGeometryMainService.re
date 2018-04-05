open StateDataMainType;

open CustomGeometryType;

open ReallocatedPointsGeometryService;

open RecordCustomGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

let getNormals =
  [@bs]
  (
    (index, state) => {
      let {normals, normalsInfoArray} = getRecord(state);
      getFloat32PointData(index, normals, normalsInfoArray)
    }
  );

let setNormals = (index: int, data: array(float), state) => {
  let {normalsInfoArray, normals, normalsOffset} as record = getRecord(state);
  record.normalsOffset =
    setFloat32PointData(
      index,
      normalsInfoArray,
      normalsOffset,
      Js.Array.length(data),
      fillFloat32Array(normals, data)
    );
  state
};

let setNormalsByTypeArray = (index: int, data: Float32Array.t, state) => {
  let {normalsInfoArray, normals, normalsOffset} as record = getRecord(state);
  record.normalsOffset =
    setFloat32PointData(
      index,
      normalsInfoArray,
      normalsOffset,
      Float32Array.length(data),
      fillFloat32ArrayWithOffset(normals, data)
    );
  state
};