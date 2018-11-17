open StateDataMainType;

open GeometryType;

open ReallocatedPointsGeometryService;

open RecordGeometryMainService;

open TypeArrayService;

open Js.Typed_array;

let getTexCoords =
  (. index, state) => {
    let {texCoords, texCoordsInfos} = getRecord(state);
    getFloat32PointData(
      BufferGeometryService.getInfoIndex(index),
      texCoords,
      texCoordsInfos,
    );
  };

let setTexCoordsByTypeArray = (index: int, data: Float32Array.t, state) => {
  let {texCoordsInfos, texCoords, texCoordsOffset} as record =
    getRecord(state);
  record.texCoordsOffset =
    setFloat32PointData(
      (
        BufferGeometryService.getInfoIndex(index),
        texCoordsInfos,
        texCoordsOffset,
        Float32Array.length(data),
      ),
      fillFloat32ArrayWithOffset(texCoords, data),
    );
  record.isPointDataDirtyForRestore = true;
  state;
};

let hasTexCoords = (index, state) => {
  let {texCoordsInfos} = getRecord(state);

  ReallocatedPointsGeometryService.hasPointData(
    BufferGeometryService.getInfoIndex(index),
    texCoordsInfos,
  );
};