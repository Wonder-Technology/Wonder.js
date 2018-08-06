open StateDataMainType;

let getRecord = state => state.vboBufferRecord;

let getOrCreateInstanceBuffer =
    (
      sourceInstanceIndex: int,
      defaultCapacity,
      state: StateDataMainType.state,
    ) => {
  let state = RenderStateTool.createState(state);
  InstanceBufferRenderService.getOrCreateBuffer(
    (
      DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
      sourceInstanceIndex,
      defaultCapacity,
    ),
    (
      state.sourceInstanceRecord.matrixInstanceBufferCapacityMap,
      state.vboBufferRecord.matrixInstanceBufferMap,
    ),
    state,
  );
};

let addVboBufferToCustomGeometryBufferMapByRecord =
    (
      geometryIndex,
      {
        customGeometryVertexBufferMap,
        customGeometryTexCoordBufferMap,
        customGeometryNormalBufferMap,
        customGeometryElementArrayBufferMap,
      } as vboBufferRecord: VboBufferType.vboBufferRecord,
    ) => {
  WonderCommonlib.SparseMapService.set(
    geometryIndex,
    Obj.magic(0),
    customGeometryVertexBufferMap,
  );
  WonderCommonlib.SparseMapService.set(
    geometryIndex,
    Obj.magic(1),
    customGeometryTexCoordBufferMap,
  );
  WonderCommonlib.SparseMapService.set(
    geometryIndex,
    Obj.magic(2),
    customGeometryNormalBufferMap,
  );
  WonderCommonlib.SparseMapService.set(
    geometryIndex,
    Obj.magic(3),
    customGeometryElementArrayBufferMap,
  );
  vboBufferRecord;
};

let addVboBufferToSourceInstanceBufferMapByRecord =
    (
      sourceInstanceIndex,
      {matrixInstanceBufferMap} as vboBufferRecord: VboBufferType.vboBufferRecord,
    ) => {
  open VboBufferType;
  WonderCommonlib.SparseMapService.set(
    sourceInstanceIndex,
    Obj.magic(0),
    matrixInstanceBufferMap,
  );
  vboBufferRecord;
};

let addVboBufferToCustomGeometryBufferMap =
    (geometryIndex, state: StateDataMainType.state) => {
  ...state,
  vboBufferRecord:
    addVboBufferToCustomGeometryBufferMapByRecord(
      geometryIndex,
      state.vboBufferRecord,
    ),
};

let addVboBufferToSourceInstanceBufferMap =
    (sourceInstanceIndex, state: StateDataMainType.state) => {
  ...state,
  vboBufferRecord:
    addVboBufferToSourceInstanceBufferMapByRecord(
      sourceInstanceIndex,
      state.vboBufferRecord,
    ),
};

let getVboBufferRecord = state => state.vboBufferRecord;

let prepareCreatedBuffer = (sandbox, state) => {
  open Sinon;
  let arrayBuffer1 = Obj.magic(20);
  let arrayBuffer2 = Obj.magic(21);
  let arrayBuffer3 = Obj.magic(22);
  let arrayBuffer4 = Obj.magic(23);
  let arrayBuffer5 = Obj.magic(24);
  let arrayBuffer6 = Obj.magic(25);
  let elementArrayBuffer1 = Obj.magic(12);
  let elementArrayBuffer2 = Obj.magic(13);
  let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
  createBuffer |> onCall(0) |> returns(arrayBuffer1);
  createBuffer |> onCall(1) |> returns(arrayBuffer2);
  createBuffer |> onCall(2) |> returns(arrayBuffer3);
  createBuffer |> onCall(3) |> returns(elementArrayBuffer1);
  createBuffer |> onCall(4) |> returns(arrayBuffer3);
  createBuffer |> onCall(5) |> returns(arrayBuffer4);
  createBuffer |> onCall(6) |> returns(arrayBuffer5);
  createBuffer |> onCall(7) |> returns(elementArrayBuffer2);
  let state =
    state
    |> FakeGlTool.setFakeGl(
         FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()),
       );
  (
    state,
    (
      arrayBuffer1,
      arrayBuffer2,
      arrayBuffer3,
      arrayBuffer4,
      arrayBuffer5,
      arrayBuffer6,
    ),
    (elementArrayBuffer1, elementArrayBuffer2),
    createBuffer,
  );
};

let getOrCreateCustomGeometryVertexArrayBuffer =
    (geometryIndex: int, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  GetVboBufferRenderService.getOrCreateBuffer(
    DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.customGeometryVertexBufferMap),
    (
      [@bs] ArrayBufferRenderService.createBuffer,
      [@bs] GetCustomGeometryVerticesRenderService.getVertices,
    ),
    state,
  );
};

let getOrCreateCustomGeometryTexCoordArrayBuffer =
    (geometryIndex: int, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  GetVboBufferRenderService.getOrCreateBuffer(
    DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.customGeometryTexCoordBufferMap),
    (
      [@bs] ArrayBufferRenderService.createBuffer,
      [@bs] GetCustomGeometryTexCoordsRenderService.getTexCoords,
    ),
    state,
  );
};

let getOrCreateCustomGeometryNormalArrayBuffer =
    (geometryIndex: int, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  GetVboBufferRenderService.getOrCreateBuffer(
    DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.customGeometryNormalBufferMap),
    (
      [@bs] ArrayBufferRenderService.createBuffer,
      [@bs] GetCustomGeometryNormalsRenderService.getNormals,
    ),
    state,
  );
};

let getOrCreateCustomGeometryElementArrayBuffer =
    (geometryIndex: int, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  GetVboBufferRenderService.getOrCreateBuffer(
    DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    (
      geometryIndex,
      state.vboBufferRecord.customGeometryElementArrayBufferMap,
    ),
    (
      [@bs] ElementArrayBufferRenderService.createBuffer,
      [@bs] GetCustomGeometryIndicesRenderService.getIndices,
    ),
    state,
  );
};

let getOrCreateAllCustomGeometryBuffers = (geometry, state) => (
  getOrCreateCustomGeometryVertexArrayBuffer(geometry, state),
  getOrCreateCustomGeometryTexCoordArrayBuffer(geometry, state),
  getOrCreateCustomGeometryNormalArrayBuffer(geometry, state),
  getOrCreateCustomGeometryElementArrayBuffer(geometry, state),
);