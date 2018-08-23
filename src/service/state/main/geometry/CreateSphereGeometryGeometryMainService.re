open Js.Typed_array;

let create = (radius, bands, state) =>
  CreateDefaultGeometryGeometryMainService.create(
    ComputeSpherePointsGeometryService.compute(radius, bands),
    state,
  );