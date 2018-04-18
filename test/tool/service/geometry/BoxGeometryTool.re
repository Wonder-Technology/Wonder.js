open GeometryType;

open BoxGeometryType;

open BoxGeometryAPI;

open StateDataMainType;

let getRecord = (state) => RecordBoxGeometryMainService.getRecord(state);

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

let getIndicesCount = (index: int, state: StateRenderType.renderState) =>
  [@bs] GetBoxGeometryIndicesRenderService.getIndicesCount(index, state);

let buildBufferConfig = (count) => {"boxGeometryPointDataBufferCount": Js.Nullable.return(count)};

let dispose = (geometry, state: StateDataMainType.state) =>
  DisposeBoxGeometryTool.handleDisposeComponent(geometry, state);

let disposeGeometryByCloseContractCheck = (gameObject, geometry, state) => {
  TestTool.closeContractCheck();
  let state = state |> GameObjectTool.disposeGameObjectBoxGeometryComponent(gameObject, geometry);
  TestTool.openContractCheck();
  state
};

/* let createStubComputeFuncData = (sandbox, geometry, state: StateDataMainType.state) => {
     open StateDataMainType;
     open Sinon;
     /* let {computeDataFuncMap} = state |> RecordBoxGeometryMainService.getRecord;
     let computeDataFunc = createEmptyStubWithJsObjSandbox(sandbox); */
     /* computeDataFuncMap |> WonderCommonlib.SparseMapService.set(geometry, computeDataFunc); */
     (state, computeDataFunc)
   }; */
let isGeometryDisposed = (geometry, state) =>
  /* open StateDataMainType;
       let {disposedIndexArray} =
     state |> RecordBoxGeometryMainService.getRecord
       disposedIndexArray |> Js.Array.includes(geometry) */
  !
    DisposeBoxGeometryMainService.isAlive(
      geometry,
      state |> RecordBoxGeometryMainService.getRecord
    );

/* let computeData = (geometry, state: StateDataMainType.state) =>
  InitBoxGeometryInitBoxGeometryService._computeData(
    geometry,
    CreateInitBoxGeometryStateMainService.createInitBoxGeometryState(state).boxGeometryRecord
  ); */

let getDefaultIndicesArray = () => [|
  0,
  2,
  1,
  2,
  3,
  1,
  4,
  6,
  5,
  6,
  7,
  5,
  8,
  10,
  9,
  10,
  11,
  9,
  12,
  14,
  13,
  14,
  15,
  13,
  16,
  18,
  17,
  18,
  19,
  17,
  20,
  22,
  21,
  22,
  23,
  21
|];

let getDefaultIndices = () => Js.Typed_array.Uint16Array.make(getDefaultIndicesArray());

let getDefaultVertices = () =>
  Js.Typed_array.Float32Array.make([|
    (-5.),
    (-5.),
    5.,
    (-5.),
    5.,
    5.,
    5.,
    (-5.),
    5.,
    5.,
    5.,
    5.,
    5.,
    (-5.),
    (-5.),
    5.,
    5.,
    (-5.),
    (-5.),
    (-5.),
    (-5.),
    (-5.),
    5.,
    (-5.),
    (-5.),
    5.,
    5.,
    (-5.),
    5.,
    (-5.),
    5.,
    5.,
    5.,
    5.,
    5.,
    (-5.),
    5.,
    (-5.),
    5.,
    5.,
    (-5.),
    (-5.),
    (-5.),
    (-5.),
    5.,
    (-5.),
    (-5.),
    (-5.),
    5.,
    (-5.),
    5.,
    5.,
    5.,
    5.,
    5.,
    (-5.),
    (-5.),
    5.,
    5.,
    (-5.),
    (-5.),
    (-5.),
    (-5.),
    (-5.),
    5.,
    (-5.),
    (-5.),
    (-5.),
    5.,
    (-5.),
    5.,
    5.
  |]);

let getDefaultNormals = () =>
  Js.Typed_array.Float32Array.make([|
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    1.,
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.,
    (-1.),
    0.,
    0.
  |]);

let createBoxGeometry = (state: StateDataMainType.state) => {
  let (state, geometry) = createBoxGeometry(state);
  /* let state = state |> setDefaultConfigData(geometry); */
  (state, geometry)
};

let createGameObject = (state: StateDataMainType.state) => {
  let (state, geometry) = createBoxGeometry(state);
  /* let state = state |> setDefaultConfigData(geometry); */
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state = state |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry)
};

/* let setVertices =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: StateDataMainType.state) =>
  VerticesBoxGeometryMainService.setVerticesByTypeArray(geometry, data, state);

let setNormals =
    (geometry: int, data: Js.Typed_array.Float32Array.t, state: StateDataMainType.state) =>
  NormalsBoxGeometryMainService.setNormalsByTypeArray(geometry, data, state);

let setIndices =
    (geometry: int, data: Js.Typed_array.Uint16Array.t, state: StateDataMainType.state) =>
  IndicesBoxGeometryMainService.setIndicesByTypeArray(geometry, data, state); */

let getGroupCount = (geometry, state) =>
  GroupBoxGeometryService.getGroupCount(geometry, state |> RecordBoxGeometryMainService.getRecord);

let unsafeGetBoxGeometryComponent = (uid: int, {gameObjectRecord}) =>
  GetComponentGameObjectService.unsafeGetGeometryComponent(uid, gameObjectRecord)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|type_ is box|j}, ~actual={j|not|j}),
                 () => {
                   let (_, type_) =
                     GetComponentGameObjectService.unsafeGetGeometryComponentData(
                       uid,
                       gameObjectRecord
                     );
                   type_ == CurrentComponentDataMapRenderService.getBoxGeometryType()
                 }
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );