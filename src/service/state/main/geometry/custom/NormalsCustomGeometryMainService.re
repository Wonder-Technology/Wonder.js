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
      let {normals, normalsInfos} = getRecord(state);
      getFloat32PointData(BufferCustomGeometryService.getInfoIndex(index), normals, normalsInfos)
    }
  );

let hasNormals = (index, state) => {
  let {normals, normalsInfos} = getRecord(state);
  ReallocatedPointsGeometryService.hasPointData(
    BufferCustomGeometryService.getInfoIndex(index),
    normalsInfos
  )
};

let setNormalsByTypeArray = (index: int, data: Float32Array.t, state) => {
  let {normalsInfos, normals, normalsOffset} as record = getRecord(state);
  record.normalsOffset =
    setFloat32PointData(
      (
        BufferCustomGeometryService.getInfoIndex(index),
        normalsInfos,
        normalsOffset,
        Float32Array.length(data)
      ),
      fillFloat32ArrayWithOffset(normals, data)
    );
  state
};