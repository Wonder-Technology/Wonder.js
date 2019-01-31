open Js.Typed_array;

let create = (radius, height, radialSegments, heightSegments, state) =>
  CreateDefaultGeometryGeometryMainService.create(
    ComputeConePointsGeometryService.compute(
      ~radius,
      ~height,
      ~radialSegments,
      ~heightSegments,
      (),
    ),
    state,
  );