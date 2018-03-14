open MainStateDataType;

open BoxGeometryType;

let initGeometrys = (state: MainStateDataType.state) => InitGeometryMainService.init(state);

let initGeometry = (geometry, state: MainStateDataType.state) =>
  InitGeometryMainService.initGeometry(geometry, state);

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

let getVerticesCount = (index: int, state: MainStateDataType.state) =>
  VerticesService.getVerticesCount(index, state.boxGeometryRecord.verticesMap);

let getIndicesCount = (index: int, state: MainStateDataType.state) =>
  IndicesService.getIndicesCount(index, state.boxGeometryRecord.indicesMap);

let getIndexType = (state: MainStateDataType.state) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord) |> RenderGeometryService.getIndexType;

let getIndexTypeSize = (state: MainStateDataType.state) =>
  [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord) |> RenderGeometryService.getIndexTypeSize;

let hasIndices = (index: int, state: MainStateDataType.state) =>
  IndicesService.hasIndices(index, state.boxGeometryRecord.indicesMap);

let isGeometry = (geometry) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(geometry) >= 0
};

let buildBufferConfig = (count) => {"geometryPointDataBufferCount": Js.Nullable.return(count)};

let dispose = (geometry, state: MainStateDataType.state) =>
  DisposeGeometryMainService.handleDisposeComponent(
    geometry,
    ConfigMemoryService.getMaxTypeArrayPoolSize(state.memoryConfig),
    state
  );

let batchDisposeGeometryByCloseContractCheck = (gameObjectArr, state) => {
  TestTool.closeContractCheck();
  let state = state |> GameObjectAPI.batchDisposeGameObject(gameObjectArr);
  TestTool.openContractCheck();
  state
};

let disposeGeometryByCloseContractCheck = (gameObject, geometry, state) => {
  TestTool.closeContractCheck();
  let state = state |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject, geometry);
  TestTool.openContractCheck();
  state
};

let createStubComputeFuncData = (sandbox, geometry, state: MainStateDataType.state) => {
  open MainStateDataType;
  open Sinon;
  let {computeDataFuncMap} = state.boxGeometryRecord;
  let computeDataFunc = createEmptyStubWithJsObjSandbox(sandbox);
  computeDataFuncMap |> WonderCommonlib.SparseMapSystem.set(geometry, computeDataFunc);
  (state, computeDataFunc)
};

let isGeometryDisposed = (geometry, state) => {
  open MainStateDataType;
  let {disposedIndexArray} = state.boxGeometryRecord;
  disposedIndexArray |> Js.Array.includes(geometry)
};

let getGroupCount = (geometry, state) =>
  GroupGeometryService.getGroupCount(geometry, state.boxGeometryRecord);

let setVerticesWithArray = VerticesGeometryMainService.setVerticesWithArray;

let setNormalsWithArray = NormalsGeometryMainService.setNormalsWithArray;

let setIndicesWithArray = IndicesGeometryMainService.setIndicesWithArray;