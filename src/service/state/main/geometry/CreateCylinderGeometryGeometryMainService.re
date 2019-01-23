open Js.Typed_array;

let create =
    (radiusTop, radiusBottom, height, radialSegments, heightSegments, state) =>
  CreateDefaultGeometryGeometryMainService.create(
    ComputeCylinderPointsGeometryService.compute(
      ~radiusTop,
      ~radiusBottom,
      ~height,
      ~radialSegments,
      ~heightSegments,
      (),
    ),
    state,
  );