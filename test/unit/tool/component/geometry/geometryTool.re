let getData = (state: StateDataType.state) => GeometrySystem.getData(state);

let initGeometrys = (state: StateDataType.state) => GeometrySystem.init(state);

let initGeometry = (geometry, state: StateDataType.state) =>
  GeometryInitComponentCommon.initGeometry(
    geometry,
    GeometrySystem.getMappedIndex(
      geometry,
      GeometrySystem.getData(state).mappedIndexMap
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
    GeometrySystem.getMappedIndex(index, GeometrySystem.getMappedIndexMap(state)),
    state
  );

let getIndicesCount = (index: int, state: StateDataType.state) =>
  GeometrySystem.getIndicesCount(
    GeometrySystem.getMappedIndex(index, GeometrySystem.getMappedIndexMap(state)),
    state
  );

let getIndexType = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.getGl(state) |> GeometrySystem.getIndexType;

let getIndexTypeSize = (state: StateDataType.state) =>
  [@bs] DeviceManagerSystem.getGl(state) |> GeometrySystem.getIndexTypeSize;

let hasIndices = (index: int, state: StateDataType.state) =>
  GeometrySystem.hasIndices(
    GeometrySystem.getMappedIndex(index, GeometrySystem.getMappedIndexMap(state)),
    state
  );

let isGeometry = (geometry) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(geometry) >= 0
};

let buildBufferConfig = (count) => {
  "geometryPointDataBufferCount": Js.Nullable.return(count)
};

let getMappedIndex = (index, state: StateDataType.state) =>
  getData(state).mappedIndexMap |> GeometrySystem.getMappedIndex(index);

let buildInfo = GeometryOperateCommon.buildInfo;

let dispose = GeometrySystem.handleDisposeComponent;

let batchDisposeGeometryByCloseContractCheck = (gameObjectArr, state) => {
  TestTool.closeContractCheck();
  let state = state |> GameObject.batchDisposeGameObject(gameObjectArr);
  TestTool.openContractCheck();
  state
};

let disposeGeometryByCloseContractCheck = (gameObject, geometry, state) => {
  TestTool.closeContractCheck();
  let state = state |> GameObject.disposeGameObjectGeometryComponent(gameObject, geometry);
  TestTool.openContractCheck();
  state
};

let createStubComputeFuncData = (sandbox, geometry, state: StateDataType.state) => {
  open StateDataType;
  open Sinon;
  let {computeDataFuncMap} = getData(state);
  let computeDataFunc = createEmptyStubWithJsObjSandbox(sandbox);
  computeDataFuncMap |> WonderCommonlib.SparseMapSystem.set(geometry, computeDataFunc);
  (state, computeDataFunc)
};