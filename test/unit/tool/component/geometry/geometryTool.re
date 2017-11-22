let getData = (state: StateDataType.state) => GeometryStateUtils.getGeometryData(state);

let initGeometrys = (state: StateDataType.state) => GeometrySystem.init(state);

let buildBoxGeometryConfigDataJsObj =
    (
      ~width=Js.Nullable.undefined,
      ~height=Js.Nullable.undefined,
      ~depth=Js.Nullable.undefined,
      ~widthSegment=Js.Nullable.undefined,
      ~heightSegment=Js.Nullable.undefined,
      ~depthSegment=Js.Nullable.undefined,
      ()
    ) => {
  "width": width,
  "height": height,
  "depth": depth,
  "widthSegment": widthSegment,
  "heightSegment": heightSegment,
  "depthSegment": depthSegment
};

let getVerticesCount = (index: int, state: StateDataType.state) =>
  GeometrySystem.getVerticesCount(
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(index),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    state
  );

let getIndicesCount = (index: int, state: StateDataType.state) =>
  GeometrySystem.getIndicesCount(
    GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(index),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    state
  );

let getIndexType = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.getGl(state) |> GeometrySystem.getIndexType;

let getIndexTypeSize = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.getGl(state) |> GeometrySystem.getIndexTypeSize;

let hasIndices = (indexStr: string, state: StateDataType.state) =>
  GeometrySystem.hasIndices
    /* Js.Int.toString( */
    (
      GeometryIndexUtils.getMappedIndex(indexStr, GeometryIndexUtils.getMappedIndexMap(state)),
      /* ), */
      state
    );

let isGeometry = (geometry) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(geometry) >= 0
};

let buildBufferConfig = (count) => {
  "transformDataBufferCount": Js.Nullable.undefined,
  /* "meshRendererDataBufferCount": Js.Nullable.undefined, */
  /* "geometryDataBufferCount": Js.Nullable.return(count), */
  "geometryPointDataBufferCount": Js.Nullable.return(count),
  "basicMaterialDataBufferCount": Js.Nullable.undefined
};

let getMappedIndex = (index, state: StateDataType.state) =>
  getData(state).mappedIndexMap |> GeometryIndexUtils.getMappedIndex(Js.Int.toString(index));

let buildInfo = GeometryOperateDataUtils.buildInfo;

let dispose = GeometryDisposeComponentUtils.handleDisposeComponent;