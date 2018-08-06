open StateRenderType;

open RenderGeometryType;

open ReallocatedPointsGeometryService;

let getIndices =
  (. index: int, {geometryRecord}) => {
    let {indices, indicesInfos} = geometryRecord;
    getUint16PointData(
      BufferGeometryService.getInfoIndex(index),
      indices,
      indicesInfos,
    );
  };

let getIndicesCount =
  (. index, {geometryRecord}) => {
    let {indicesInfos} = geometryRecord;
    let (startIndex, endIndex) =
      ReallocatedPointsGeometryService.getInfo(
        BufferGeometryService.getInfoIndex(index),
        indicesInfos,
      );
    endIndex - startIndex;
  };