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
      AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
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

let addVboBufferToGeometryBufferMapByRecord =
    (
      geometryIndex,
      {
        geometryVertexBufferMap,
        geometryTexCoordBufferMap,
        geometryNormalBufferMap,
        geometryElementArrayBufferMap,
      } as vboBufferRecord: AllVboBufferType.vboBufferRecord,
    ) => {
  WonderCommonlib.MutableSparseMapService.set(
    geometryIndex,
    Obj.magic(0),
    geometryVertexBufferMap,
  );
  WonderCommonlib.MutableSparseMapService.set(
    geometryIndex,
    Obj.magic(1),
    geometryTexCoordBufferMap,
  );
  WonderCommonlib.MutableSparseMapService.set(
    geometryIndex,
    Obj.magic(2),
    geometryNormalBufferMap,
  );
  WonderCommonlib.MutableSparseMapService.set(
    geometryIndex,
    Obj.magic(3),
    geometryElementArrayBufferMap,
  );
  vboBufferRecord;
};

let addVboBufferToSourceInstanceBufferMapByRecord =
    (
      sourceInstanceIndex,
      {matrixInstanceBufferMap} as vboBufferRecord: AllVboBufferType.vboBufferRecord,
    ) => {
  open AllVboBufferType;
  WonderCommonlib.MutableSparseMapService.set(
    sourceInstanceIndex,
    Obj.magic(0),
    matrixInstanceBufferMap,
  );
  vboBufferRecord;
};

let addVboBufferToGeometryBufferMap =
    (geometryIndex, state: StateDataMainType.state) => {
  ...state,
  vboBufferRecord:
    addVboBufferToGeometryBufferMapByRecord(
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

let getOrCreateGeometryVertexArrayBuffer =
    (geometryIndex: int, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  GetVboBufferRenderService.getOrCreateBuffer(
    AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.geometryVertexBufferMap),
    (
      [@bs] ArrayBufferRenderService.createBuffer,
      [@bs] GetGeometryVerticesRenderService.getVertices,
    ),
    state,
  );
};

let getOrCreateGeometryTexCoordArrayBuffer =
    (geometryIndex: int, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  GetVboBufferRenderService.getOrCreateBuffer(
    AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.geometryTexCoordBufferMap),
    (
      [@bs] ArrayBufferRenderService.createBuffer,
      [@bs] GetGeometryTexCoordsRenderService.getTexCoords,
    ),
    state,
  );
};

let getOrCreateGeometryNormalArrayBuffer =
    (geometryIndex: int, state: StateDataMainType.state) => {
  let state = RenderStateTool.createState(state);
  GetVboBufferRenderService.getOrCreateBuffer(
    AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    (geometryIndex, state.vboBufferRecord.geometryNormalBufferMap),
    (
      [@bs] ArrayBufferRenderService.createBuffer,
      [@bs] GetGeometryNormalsRenderService.getNormals,
    ),
    state,
  );
};

let getOrCreateGeometryElementArrayBuffer =
    (geometryIndex: int, state: StateDataMainType.state) => {
  open GeometryType;

  let renderState = RenderStateTool.createState(state);
  let gl =
    AllDeviceManagerService.unsafeGetGl(. renderState.deviceManagerRecord);

  let elementArrayBufferMap =
    renderState.vboBufferRecord.geometryElementArrayBufferMap;

  switch (
    IndicesGeometryMainService.unsafeGetIndicesType(geometryIndex, state)
  ) {
  | Short =>
    ElementArrayBufferRenderService.getOrCreate16Buffer(
      gl,
      (geometryIndex, elementArrayBufferMap),
      GetGeometryIndicesRenderService.getIndices16,
      renderState,
    )
  | Int =>
    ElementArrayBufferRenderService.getOrCreate32Buffer(
      gl,
      (geometryIndex, elementArrayBufferMap),
      GetGeometryIndicesRenderService.getIndices32,
      renderState,
    )
  };
};

let getOrCreateAllGeometryBuffers = (geometry, state) => (
  getOrCreateGeometryVertexArrayBuffer(geometry, state),
  getOrCreateGeometryTexCoordArrayBuffer(geometry, state),
  getOrCreateGeometryNormalArrayBuffer(geometry, state),
  getOrCreateGeometryElementArrayBuffer(geometry, state),
);