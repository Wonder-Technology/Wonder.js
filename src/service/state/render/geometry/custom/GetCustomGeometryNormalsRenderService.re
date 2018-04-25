open StateRenderType;

open RenderCustomGeometryType;

open ReallocatedPointsGeometryService;

let getNormals =
  [@bs]
  (
    (index, {customGeometryRecord}) => {
      let {normals, normalsInfos} = customGeometryRecord;
      getFloat32PointData(BufferCustomGeometryService.getInfoIndex(index), normals, normalsInfos)
    }
  );