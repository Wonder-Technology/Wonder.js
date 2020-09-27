let create = () => {
  GeometryApService.create();
};

let getGameObjects = geometry => {
  GeometryApService.getGameObjects(geometry);
};

let createTriangleGeometry = () => {
  GeometryApService.createTriangleGeometry();
};

let createSphereGeometry = (radius, bands) => {
  GeometryApService.createSphereGeometry(radius, bands);
};

let createPlaneGeometry = (width, height, widthSegments, heightSegments) => {
  GeometryApService.createPlaneGeometry(
    width,
    height,
    widthSegments,
    heightSegments,
  );
};

let getVertices = geometry => {
  GeometryApService.getVertices(geometry);
};

let setVertices = (geometry, vertices) => {
  GeometryApService.setVertices(geometry, vertices);
};

let getTexCoords = geometry => {
  GeometryApService.getTexCoords(geometry);
};

let setTexCoords = (geometry, texCoords) => {
  GeometryApService.setTexCoords(geometry, texCoords);
};

let getNormals = geometry => {
  GeometryApService.getNormals(geometry);
};

let setNormals = (geometry, normals) => {
  GeometryApService.setNormals(geometry, normals);
};

let getTangents = geometry => {
  GeometryApService.getTangents(geometry);
};

let setTangents = (geometry, tangents) => {
  GeometryApService.setTangents(geometry, tangents);
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

let hasTangents = geometry => {
  GeometryApService.hasTangents(geometry);
};

let hasIndices = geometry => {
  GeometryApService.hasIndices(geometry);
};

let getIndicesCount = geometry => {
  GeometryApService.getIndicesCount(geometry);
};

let computeTangents = (vertices, texCoords, normals, indices) => {
  GeometryApService.computeTangents(vertices, texCoords, normals, indices);
};
