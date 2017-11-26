let getOrCreateArrayBuffer = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    [@bs] DeviceManagerSystem.getGl(state),
    geometryIndex,
    VboBufferStateUtils.getVboBufferData(state).vertexBufferMap,
    [@bs] ArrayBufferSystem.createBuffer,
    [@bs] GeometrySystem.getVertices,
    state
  );

let getOrCreateElementArrayBuffer = (geometryIndex: int, state: StateDataType.state) =>
  VboBufferSystem.getOrCreateBuffer(
    [@bs] DeviceManagerSystem.getGl(state),
    geometryIndex,
    VboBufferStateUtils.getVboBufferData(state).elementArrayBufferMap,
    [@bs] ElementArrayBufferSystem.createBuffer,
    [@bs] GeometrySystem.getIndices,
    state
  );

let passBufferShouldExistCheckWhenDisposeGeometry = (geometryIndex, state: StateDataType.state) => {
  open VboBufferType;
  let {vertexBufferMap, elementArrayBufferMap} = VboBufferStateUtils.getVboBufferData(state);
  WonderCommonlib.HashMapSystem.set(Js.Int.toString(geometryIndex), Obj.magic(0), vertexBufferMap)
  |> ignore;
  WonderCommonlib.HashMapSystem.set(Js.Int.toString(geometryIndex), Obj.magic(0), elementArrayBufferMap)
  |> ignore;
  state
};

let getData = VboBufferStateUtils.getVboBufferData;