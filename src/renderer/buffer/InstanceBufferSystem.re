open Gl;

open Js.Typed_array;

/*! start with a maximum of 64 instances */
let _getDefaultCapacity = () => 64 * 16 * 4;

let createBuffer = (gl, capacity: int, state: StateDataType.state) => {
  let buffer = VboBufferPoolCommon.getInstanceBuffer(gl, state);
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  bufferFloat32DataWithCapacity(getArrayBuffer(gl), capacity, getDynamicDraw(gl), gl);
  buffer
};

let _getFloat32InstanceArraySize = (capacity: int) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|capacity should be a multiplier of 4|j},
                ~actual={j|is $capacity|j}
              ),
              () => capacity mod 4 == 0
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  capacity / 4
};

let _createMatrixFloat32Array = (capacity) =>
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
    (gl, sourceInstance: int, (capacityMap, bufferMap), state: StateDataType.state) =>
  switch (WonderCommonlib.SparseMapSystem.get(sourceInstance, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer = createBuffer(gl, _getCapacity(sourceInstance, capacityMap), state);
    bufferMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, buffer) |> ignore;
    buffer
  };

let getOrCreateMatrixFloat32Array =
    (sourceInstance: int, capacityMap, matrixFloat32ArrayMap, state: StateDataType.state) => {
  let capacity = _getCapacity(sourceInstance, capacityMap);
  switch (matrixFloat32ArrayMap |> WonderCommonlib.SparseMapSystem.get(sourceInstance)) {
  | Some(typeArr) => typeArr
  | None =>
    switch ([@bs] TypeArrayPoolSystem.getFloat32TypeArrayFromPool(capacity, state)) {
    | Some(typeArr) => typeArr
    | None =>
      let typeArr = _createMatrixFloat32Array(capacity);
      matrixFloat32ArrayMap
      |> WonderCommonlib.SparseMapSystem.set(sourceInstance, typeArr)
      |> ignore;
      typeArr
    }
  }
};

let setCapacityAndUpdateBufferTypeArray =
    (
      (gl, sourceInstance, capacity),
      (buffer, matrixFloat32Array),
      (bufferMap, matrixFloat32ArrayMap, capacityMap),
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
    let matrixFloat32Array = _createMatrixFloat32Array(currentCapacity^);
    matrixFloat32ArrayMap
    |> WonderCommonlib.SparseMapSystem.set(sourceInstance, matrixFloat32Array)
    |> ignore;
    (buffer, matrixFloat32Array)
  } else {
    (buffer, matrixFloat32Array)
  }
};

let updateData = (gl, data: Float32Array.t, buffer) => {
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  gl |> bufferSubFloat32Data(getArrayBuffer(gl), 0, data);
  buffer
};
/* let unbind = (gl, buffer) => {}; */