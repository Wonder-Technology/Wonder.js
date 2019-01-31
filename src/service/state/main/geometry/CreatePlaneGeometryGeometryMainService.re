open Js.Typed_array;

let create = (width, height, widthSegments, heightSegments, state) =>
  CreateDefaultGeometryGeometryMainService.create(
    ComputePlanePointsGeometryService.compute(
      width,
      height,
      widthSegments,
      heightSegments,
    ),
    state,
  );