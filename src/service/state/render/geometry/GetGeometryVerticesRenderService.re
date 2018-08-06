open StateRenderType;

open RenderGeometryType;

open ReallocatedPointsGeometryService;

let getVertices =
  [@bs]
  (
    (index, {geometryRecord}) => {
      let {vertices, verticesInfos} = geometryRecord;
      getFloat32PointData(
        BufferGeometryService.getInfoIndex(index),
        vertices,
        verticesInfos
      )
    }
  );