let getVertices = geometry => {
  VerticesGeometryDoService.getVertices(geometry);
};

let getTexCoords = geometry => {
  TexCoordsGeometryDoService.getTexCoords(geometry);
};

let getNormals = geometry => {
  NormalsGeometryDoService.getNormals(geometry);
};

let getTangents = geometry => {
  TangentsGeometryDoService.getTangents(geometry);
};

let getIndices = geometry => {
  IndicesGeometryDoService.getIndices(geometry);
};

let isFlipTexCoordY = geometry => {
  OperateGeometryDoService.isFlipTexCoordY(geometry);
};

let isSame = (geometry1, geometry2) => {
  OperateGeometryDoService.isSame(geometry1, geometry2);
};

let getId = geometry => {
  OperateGeometryDoService.getId(geometry);
};
