type t =
  | Geometry(GeometryPOType.geometry);

let create = index => Geometry(index);

let value = geometry =>
  switch (geometry) {
  | Geometry(index) => index
  };
