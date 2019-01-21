open StateRenderType;

open RenderGeometryType;

open ReallocatedPointsGeometryService;

open Js.Typed_array;

let getIndices16 =
  (. index: int, {geometryRecord}) => {
    let {indices16, indicesInfos} = geometryRecord;
    getUint16PointData(
      BufferGeometryService.getInfoIndex(index),
      indices16,
      indicesInfos,
    );
  };

let getIndices32 =
  (. index: int, {geometryRecord}) => {
    let {indices32, indicesInfos} = geometryRecord;

    getUint32PointData(
      BufferGeometryService.getInfoIndex(index),
      indices32,
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