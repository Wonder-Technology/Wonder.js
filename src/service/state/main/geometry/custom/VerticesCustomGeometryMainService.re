open StateDataMainType;

open CustomGeometryType;

open ReallocatedPointsGeometryService;

open RecordCustomGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

let getVertices =
  (. index, state) => {
    let {vertices, verticesInfos} = getRecord(state);
    getFloat32PointData(
      BufferCustomGeometryService.getInfoIndex(index),
      vertices,
      verticesInfos,
    );
  };

let setVerticesByTypeArray = (index: int, data: Float32Array.t, state) => {
  let {verticesInfos, vertices, verticesOffset} as record = getRecord(state);
  record.verticesOffset =
    setFloat32PointData(
      (
        BufferCustomGeometryService.getInfoIndex(index),
        verticesInfos,
        verticesOffset,
        Float32Array.length(data),
      ),
      fillFloat32ArrayWithOffset(vertices, data),
    );
  state;
};