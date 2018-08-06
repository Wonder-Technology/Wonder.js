open StateRenderType;

open RenderGeometryType;

open ReallocatedPointsGeometryService;

let _getNormals = (index, {geometryRecord}) => {
  let {normals, normalsInfos} = geometryRecord;
  getFloat32PointData(
    BufferGeometryService.getInfoIndex(index),
    normals,
    normalsInfos,
  );
};

let getNormals =
  (. index, {geometryRecord} as state) =>
    NormalsRenderGeometryService.hasNormals(index, geometryRecord) ?
      _getNormals(index, state) :
      ComputeGeometryNormalsRenderService.computeVertexNormals(
        index,
        state,
      );