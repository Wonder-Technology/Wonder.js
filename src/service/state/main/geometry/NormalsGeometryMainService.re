open StateDataMainType;

open GeometryType;

open ReallocatedPointsGeometryService;

open RecordGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

let getNormals =
  (. index, state) => {
    let {normals, normalsInfos} = getRecord(state);
    getFloat32PointData(
      BufferGeometryService.getInfoIndex(index),
      normals,
      normalsInfos,
    );
  };

let hasNormals = (index, state) => {
  let {normalsInfos} = getRecord(state);
  HasNormalsService.hasNormals(index, normalsInfos);
};

let setNormalsByTypeArray = (index: int, data: Float32Array.t, state) => {
  let {normalsInfos, normals, normalsOffset} as record = getRecord(state);
  record.isPointDataDirtyForRestore = true;

  {
    ...state,
    geometryRecord:
      Some({
        ...record,
        normalsOffset:
          setFloat32PointData(
            (
              BufferGeometryService.getInfoIndex(index),
              normalsInfos,
              normalsOffset,
              Float32Array.length(data),
            ),
            fillFloat32ArrayWithOffset(normals, data),
          ),
      }),
  };
};