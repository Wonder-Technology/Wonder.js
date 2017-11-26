let getData = (state: StateDataType.state) => GeometryStateUtils.getGeometryData(state);

let initGeometrys = (state: StateDataType.state) => GeometrySystem.init(state);

let initGeometry = (geometry, state: StateDataType.state) =>
  GeometryInitComponentUtils.initGeometry(
    GeometryIndexUtils.getMappedIndex(
      (geometry),
      GeometryStateUtils.getGeometryData(state).mappedIndexMap
    ),
    state
  );

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
      (index),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    state
  );

let getIndicesCount = (index: int, state: StateDataType.state) =>
  GeometrySystem.getIndicesCount(
    GeometryIndexUtils.getMappedIndex(
      (index),
      GeometryIndexUtils.getMappedIndexMap(state)
    ),
    state
  );

let getIndexType = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.getGl(state) |> GeometrySystem.getIndexType;

let getIndexTypeSize = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.getGl(state) |> GeometrySystem.getIndexTypeSize;

let hasIndices = (index: int, state: StateDataType.state) =>
  GeometrySystem.hasIndices(
    GeometryIndexUtils.getMappedIndex(index, GeometryIndexUtils.getMappedIndexMap(state)),
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
  "geometryPointDataBufferCount": Js.Nullable.return(count),
  "basicMaterialDataBufferCount": Js.Nullable.undefined
};

let getMappedIndex = (index, state: StateDataType.state) =>
  getData(state).mappedIndexMap |> GeometryIndexUtils.getMappedIndex((index));

let buildInfo = GeometryOperateDataUtils.buildInfo;

let dispose = GeometryDisposeComponentUtils.handleDisposeComponent;

let disposeGeometryByCloseContractCheck = (gameObject, geometry, state) => {
  TestTool.closeContractCheck();
  let state = state |> GameObject.disposeGameObjectGeometryComponent(gameObject, geometry);
  TestTool.openContractCheck();
  state;
};