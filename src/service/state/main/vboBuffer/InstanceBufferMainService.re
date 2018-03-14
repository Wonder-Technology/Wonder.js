open Gl;

open Js.Typed_array;

/*! start with a maximum of 64 instances */
/* let _getDefaultCapacity = () => 64 * ( 16 + 9 ) * 4; */
/* let _getDefaultCapacity = () => 64 * (16 + 0); */
let createBuffer = (gl, capacity: int, state: MainStateDataType.state) => {
  let buffer = PoolVboBufferService.getInstanceBuffer(gl, state.vboBufferRecord);
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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  capacity / 4
};

let _createMatrixFloat32Array = (capacity) =>
  Float32Array.fromLength(capacity |> _getFloat32InstanceArraySize);

let _getCapacity = (sourceInstance, defaultCapacity, capacityMap) =>
  switch (capacityMap |> WonderCommonlib.SparseMapSystem.get(sourceInstance)) {
  | None => defaultCapacity
  | Some(capacity) => capacity
  };

let _setCapacity = (sourceInstance, capacity, capacityMap) => {
  capacityMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, capacity);
  capacityMap
};

let getOrCreateBuffer =
    ((gl, sourceInstance, defaultCapacity), (capacityMap, bufferMap), state: MainStateDataType.state) =>
  switch (WonderCommonlib.SparseMapSystem.get(sourceInstance, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer =
      createBuffer(gl, _getCapacity(sourceInstance, defaultCapacity, capacityMap), state);
    bufferMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, buffer) |> ignore;
    buffer
  };

let getOrCreateMatrixFloat32Array =
    (
      sourceInstance: int,
      defaultCapacity,
      (capacityMap, matrixFloat32ArrayMap),
      state: MainStateDataType.state
    ) => {
  let capacity = _getCapacity(sourceInstance, defaultCapacity, capacityMap);
  switch (matrixFloat32ArrayMap |> WonderCommonlib.SparseMapSystem.get(sourceInstance)) {
  | Some(typeArr) => typeArr
  | None =>
    switch (
      [@bs] TypeArrayPoolService.getFloat32TypeArrayFromPool(capacity, state.typeArrayPoolRecord)
    ) {
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
      (gl, sourceInstance, capacity, defaultCapacity),
      (buffer, matrixFloat32Array),
      (bufferMap, matrixFloat32ArrayMap, capacityMap),
      state
    ) => {
  let currentCapacity = ref(_getCapacity(sourceInstance, defaultCapacity, capacityMap));
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

let updateData = (gl, record: Float32Array.t, buffer) => {
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  gl |> bufferSubFloat32Data(getArrayBuffer(gl), 0, record);
  buffer
};

let bind = (gl, buffer) => {
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  buffer
};
/* let unbind = (gl, buffer) => {}; */