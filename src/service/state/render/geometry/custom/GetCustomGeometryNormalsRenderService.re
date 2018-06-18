open StateRenderType;

open RenderCustomGeometryType;

open ReallocatedPointsGeometryService;

let _getNormals = (index, {customGeometryRecord}) => {
  let {normals, normalsInfos} = customGeometryRecord;
  getFloat32PointData(
    BufferCustomGeometryService.getInfoIndex(index),
    normals,
    normalsInfos,
  );
};

let getNormals =
  (. index, {customGeometryRecord} as state) =>
    NormalsRenderCustomGeometryService.hasNormals(index, customGeometryRecord) ?
      _getNormals(index, state) :
      ComputeCustomGeometryNormalsRenderService.computeVertexNormals(
        index,
        state,
      );