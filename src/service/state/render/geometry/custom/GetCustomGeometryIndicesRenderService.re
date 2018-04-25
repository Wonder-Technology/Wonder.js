open StateRenderType;

open RenderCustomGeometryType;

open GeometryType;

open ReallocatedPointsGeometryService;

let getIndices =
  [@bs]
  (
    (index: int, {customGeometryRecord}) => {
      let {indices, indicesInfos} = customGeometryRecord;
      getUint16PointData(BufferCustomGeometryService.getInfoIndex(index), indices, indicesInfos)
    }
  );

let getIndicesCount =
  [@bs]
  (
    (index, {customGeometryRecord}) => {
      let {indicesInfos} = customGeometryRecord;
      let (startIndex, endIndex) =
        ReallocatedPointsGeometryService.getInfo(
          BufferCustomGeometryService.getInfoIndex(index),
          indicesInfos
        );
      endIndex - startIndex
    }
  );