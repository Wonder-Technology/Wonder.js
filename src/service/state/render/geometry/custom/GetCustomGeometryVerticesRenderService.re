open StateRenderType;

open CustomGeometryRenderType;

open ReallocatedPointsGeometryService;

let getVertices =
  [@bs]
  (
    (index, {customGeometryRecord}) => {
      let {vertices, verticesInfoArray} = customGeometryRecord;
      getFloat32PointData(index, vertices, verticesInfoArray)
    }
  );