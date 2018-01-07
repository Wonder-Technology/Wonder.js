open Gl;

open Js.Typed_array;

open Contract;

/*! start with a maximum of 64 instances */
let _getDefaultCapacity = () => 64 * 16 * 4;

let createBuffer = (gl, capacity: int, state: StateDataType.state) => {
  let buffer = VboBufferPoolCommon.getInstanceBuffer(gl, state);
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  bufferFloat32DataWithCapacity(getArrayBuffer(gl), capacity, getDynamicDraw(gl), gl);
  buffer
};

let _getFloat32InstanceArraySize = (capacity: int) => {
  requireCheck(
    () =>
      Contract.Operators.(test("capacity should be a multiplier of 4", () => capacity mod 4 == 0))
  );
  capacity / 4
};

let _createModelMatrixFloat32Array = (capacity) =>
  Float32Array.fromLength(_getFloat32InstanceArraySize(capacity));

let _getCapacity = (sourceInstance, capacityMap) =>
  switch (capacityMap |> WonderCommonlib.SparseMapSystem.get(sourceInstance)) {
  | None => _getDefaultCapacity()
  | Some(capacity) => capacity
  };

let _setCapacity = (sourceInstance, capacity, capacityMap) => {
  capacityMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, capacity);
  capacityMap
};

let getOrCreateBuffer =
    (gl, sourceInstance: int, capacityMap, bufferMap, state: StateDataType.state) =>
  switch (WonderCommonlib.SparseMapSystem.get(sourceInstance, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer = createBuffer(gl, _getCapacity(sourceInstance, capacityMap), state);
    bufferMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, buffer) |> ignore;
    buffer
  };

let getOrCreateModelMatrixFloat32Array =
    (sourceInstance: int, capacityMap, modelMatrixFloat32ArrayMap, state: StateDataType.state) => {
  let capacity = _getCapacity(sourceInstance, capacityMap);
  switch (modelMatrixFloat32ArrayMap |> WonderCommonlib.SparseMapSystem.get(sourceInstance)) {
  | Some(typeArr) => typeArr
  | None =>
    switch ([@bs] TypeArrayPoolSystem.getFloat32TypeArrayFromPool(capacity, state)) {
    | Some(typeArr) => typeArr
    | None =>
      let typeArr = _createModelMatrixFloat32Array(capacity);
      modelMatrixFloat32ArrayMap
      |> WonderCommonlib.SparseMapSystem.set(sourceInstance, typeArr)
      |> ignore;
      typeArr
    }
  }
};

let setCapacityAndUpdateBufferAndTypeArray =
    (
      gl,
      sourceInstance,
      capacity: int,
      buffer,
      modelMatrixFloat32Array,
      bufferMap,
      modelMatrixFloat32ArrayMap,
      capacityMap,
      state
    ) => {
  let currentCapacity = ref(_getCapacity(sourceInstance, capacityMap));
  let needIncreaseCapacity = ref(false);
  while (currentCapacity^ < capacity) {
    currentCapacity := currentCapacity^ * 2;
    needIncreaseCapacity := true
  };
  if (needIncreaseCapacity^) {
    _setCapacity(sourceInstance, currentCapacity^, capacityMap) |> ignore;
    gl |> deleteBuffer(buffer);
    let buffer = createBuffer(gl, currentCapacity^, state);
    bufferMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, buffer) |> ignore;
    let modelMatrixFloat32Array = _createModelMatrixFloat32Array(currentCapacity^);
    modelMatrixFloat32ArrayMap
    |> WonderCommonlib.SparseMapSystem.set(sourceInstance, modelMatrixFloat32Array)
    |> ignore;
    (buffer, modelMatrixFloat32Array)
  } else {
    (buffer, modelMatrixFloat32Array)
  }
};

let updateData = (gl, data: Float32Array.t, buffer) => {
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  gl |> bufferSubFloat32Data(getArrayBuffer(gl), 0, data);
  buffer
};
/* let unbind = (gl, buffer) => {}; */