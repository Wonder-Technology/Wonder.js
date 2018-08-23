open Js.Typed_array;

let create = state =>
  CreateDefaultGeometryGeometryMainService.create(
    ComputeBoxPointsGeometryService.generateAllFaces(),
    state,
  );