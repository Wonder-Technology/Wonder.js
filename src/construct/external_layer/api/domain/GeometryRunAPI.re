let getVertices = geometry => {
  GeometryApService.getVertices(geometry);
};

let getTexCoords = geometry => {
  GeometryApService.getTexCoords(geometry);
};

let getNormals = geometry => {
  GeometryApService.getNormals(geometry);
};

let getTangents = geometry => {
  GeometryApService.getTangents(geometry);
};

let getIndices = geometry => {
  GeometryApService.getIndices(geometry);
};

let isSame = (geometry1, geometry2) => {
  GeometryApService.isSame(geometry1, geometry2);
};

let getId = geometry => {
  GeometryApService.getId(geometry);
};
