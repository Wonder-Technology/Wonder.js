let create = () => {
  GeometryApService.create();
};

let getGameObjects = geometry => {
  GeometryApService.getGameObjects(geometry);
};

let createSphereGeometry = (radius, bands) => {
  GeometryApService.createSphereGeometry(radius, bands);
};

let getVertices = geometry => {
  GeometryApService.getVertices(geometry);
};

let setVertices = (geometry, vertices) => {
  GeometryApService.setVertices(geometry, vertices);
};

let getNormals = geometry => {
  GeometryApService.getNormals(geometry);
};

let setNormals = (geometry, normals) => {
  GeometryApService.setNormals(geometry, normals);
};

let getIndices = geometry => {
  GeometryApService.getIndices(geometry);
};

let setIndices = (geometry, indices) => {
  GeometryApService.setIndices(geometry, indices);
};

let hasVertices = geometry => {
  GeometryApService.hasVertices(geometry);
};

let hasNormals = geometry => {
  GeometryApService.hasNormals(geometry);
};

let hasIndices = geometry => {
  GeometryApService.hasIndices(geometry);
};

let getIndicesCount = geometry => {
  GeometryApService.getIndicesCount(geometry);
};
