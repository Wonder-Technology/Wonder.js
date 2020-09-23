let create = () => {
  CreateGeometryDoService.create();
};

let getGameObjects = geometry => {
  GameObjectGeometryDoService.getGameObjects(geometry);
};

let createSphereGeometry = (radius, bands) => {
  CreateSphereGeometryDoService.create(radius, bands);
};

let createPlaneGeometry = (width, height, widthSegments, heightSegments) => {
  CreatePlaneGeometryDoService.create(width, height, widthSegments, heightSegments);
};

let getVertices = geometry => {
  VerticesGeometryDoService.getVertices(geometry);
};

let setVertices = (geometry, vertices) => {
  VerticesGeometryDoService.setVertices(geometry, vertices);
};

let getTexCoords = geometry => {
  TexCoordsGeometryDoService.getTexCoords(geometry);
};

let setTexCoords = (geometry, texCoords) => {
  TexCoordsGeometryDoService.setTexCoords(geometry, texCoords);
};

let getNormals = geometry => {
  NormalsGeometryDoService.getNormals(geometry);
};

let setNormals = (geometry, normals) => {
  NormalsGeometryDoService.setNormals(geometry, normals);
};

let getIndices = geometry => {
  IndicesGeometryDoService.getIndices(geometry);
};

let setIndices = (geometry, indices) => {
  IndicesGeometryDoService.setIndices(geometry, indices);
};

let hasVertices = geometry => {
  VerticesGeometryDoService.hasVertices(geometry);
};

let hasNormals = geometry => {
  NormalsGeometryDoService.hasNormals(geometry);
};

let hasIndices = geometry => {
  IndicesGeometryDoService.hasIndices(geometry);
};

let getIndicesCount = geometry => {
  IndicesGeometryDoService.getIndicesCount(geometry);
};
