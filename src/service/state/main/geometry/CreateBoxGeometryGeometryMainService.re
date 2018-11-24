open Js.Typed_array;

let create = state =>
  CreateDefaultGeometryGeometryMainService.create(
    ComputeBoxPointsGeometryService.generateAllFaces((5., 5., 5., 1, 1, 1)),
    state,
  );