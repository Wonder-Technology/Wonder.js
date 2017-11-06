let initGeometrys = (state: StateDataType.state) => GeometrySystem.init(state);

let buildBoxGeometryConfigDataJsObj =
    (
      ~width=Js.Nullable.undefined,
      ~height=Js.Nullable.undefined,
      ~depth=Js.Nullable.undefined,
      ~widthSegments=Js.Nullable.undefined,
      ~heightSegments=Js.Nullable.undefined,
      ~depthSegments=Js.Nullable.undefined,
      ()
    ) => {
  "width": width,
  "height": height,
  "depth": depth,
  "widthSegments": widthSegments,
  "heightSegments": heightSegments,
  "depthSegments": depthSegments
};