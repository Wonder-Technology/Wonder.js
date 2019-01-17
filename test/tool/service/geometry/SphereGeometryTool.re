open Js.Typed_array;

let createSphereGeometry = state => {
  let radius = 1.0;
  let band = 2;

  let (state, geometry) =
    GeometryAPI.createSphereGeometry(radius, band, state);

  let name = "sphereGeometry";

  let state = state |> GeometryAPI.setGeometryName(geometry, name);

  let (vertices, texCoords, normals, indices) =
    ComputeSpherePointsGeometryService.compute(radius, band);

  (
    state,
    geometry,
    name,
    (
      Float32Array.make(vertices),
      Float32Array.make(texCoords),
      Float32Array.make(normals),
      Uint16Array.make(indices),
    ),
  );
};