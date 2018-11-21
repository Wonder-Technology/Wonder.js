open StateDataMainType;

open GeometryType;

open ReallocatedPointsGeometryService;

open RecordGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

let getVertices =
  (. index, state) => {
    let {vertices, verticesInfos} = getRecord(state);

    getFloat32PointData(
      BufferGeometryService.getInfoIndex(index),
      vertices,
      verticesInfos,
    );
  };

let setVerticesByTypeArray = (index: int, data: Float32Array.t, state) => {
  let {verticesInfos, vertices, verticesOffset} as record = getRecord(state);
  record.verticesOffset =
    setFloat32PointData(
      (
        BufferGeometryService.getInfoIndex(index),
        verticesInfos,
        verticesOffset,
        Float32Array.length(data),
      ),
      fillFloat32ArrayWithOffset(vertices, data),
    );
  record.isPointDataDirtyForRestore = true;
  state;
};

let hasVertices = (index, state) => {
  let {verticesInfos} = getRecord(state);

  ReallocatedPointsGeometryService.hasPointData(
    BufferGeometryService.getInfoIndex(index),
    verticesInfos,
  );
};