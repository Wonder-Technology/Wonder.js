open ReallocatedPointsGeometryUtils

let getNormals = (normals, normalsInfos, isDebug, geometry) => {
  getFloat32PointData(BufferGeometryUtils.getInfoIndex(geometry), normals, isDebug, normalsInfos)
}
