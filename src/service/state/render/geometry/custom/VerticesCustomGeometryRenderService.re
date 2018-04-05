open StateRenderType;

open CustomGeometryType;

open ReallocatedPointsGeometryService;

let getVertices =
  [@bs]
  (
    (index, {customGeometryRecord}) => {
      let {vertices, verticesInfoArray} = customGeometryRecord;
      getFloat32PointData(index, vertices, verticesInfoArray)
    }
  );