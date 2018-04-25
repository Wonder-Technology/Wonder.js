open StateRenderType;

open RenderCustomGeometryType;

open ReallocatedPointsGeometryService;

let getVertices =
  [@bs]
  (
    (index, {customGeometryRecord}) => {
      let {vertices, verticesInfos} = customGeometryRecord;
      getFloat32PointData(
        BufferCustomGeometryService.getInfoIndex(index),
        vertices,
        verticesInfos
      )
    }
  );