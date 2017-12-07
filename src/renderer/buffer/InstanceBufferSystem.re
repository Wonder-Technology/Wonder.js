open Gl;

open Js.Typed_array;

open Contract;

/*! start with a maximum of 64 instances */
let _getDefaultCapacity = () => 64 * 16 * 4;

let createBuffer = (gl, capacity: int) => {
  let buffer = VboBufferPoolSystem.getInstanceBuffer(gl);
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  bufferFloat32DataWithCapacity(getArrayBuffer(gl), capacity, getDynamicDraw(gl), gl);
  buffer
};

/* todo optimize: instant create buffer,typeArray when create sourceInstance? */
let getOrCreateBuffer = (gl, sourceInstance: int, bufferMap, state: StateDataType.state) =>
  switch (WonderCommonlib.SparseMapSystem.get(sourceInstance, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer = createBuffer(gl, _getDefaultCapacity());
    bufferMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, buffer) |> ignore;
    buffer
  };

let _getFloat32InstanceArraySize = (capacity: int) => {
  /* todo test */
  requireCheck(
    () =>
      Contract.Operators.(test("capacity should be a multiplier of 4", () => capacity mod 4 == 0))
  );
  capacity / 4
};

let _createModelMatrixFloat32Array = () =>
  Float32Array.fromLength(_getFloat32InstanceArraySize(_getDefaultCapacity()));

let getOrCreateModelMatrixFloat32Array = (sourceInstance: int, modelMatrixFloat32ArrayMap) =>
  switch (WonderCommonlib.SparseMapSystem.get(sourceInstance, modelMatrixFloat32ArrayMap)) {
  | Some(typeArr) => typeArr
  | None =>
    let typeArr = _createModelMatrixFloat32Array();
    modelMatrixFloat32ArrayMap
    |> WonderCommonlib.SparseMapSystem.set(sourceInstance, typeArr)
    |> ignore;
    typeArr
  };

/* todo fix: if create buffer, should set it in map */
/* todo fix: if create typeArr, should set it in map */
let setCapacity = (gl, capacity: int, buffer, modelMatrixFloat32Array) => {
  let defaultCapacity = _getDefaultCapacity();
  let currentCapacity = ref(defaultCapacity);
  while (currentCapacity^ < capacity) {
    currentCapacity := currentCapacity^ * 2
  };
  if (defaultCapacity < currentCapacity^) {
    gl |> deleteBuffer(buffer);
    (currentCapacity^, createBuffer(gl, currentCapacity^), _createModelMatrixFloat32Array())
  } else {
    (defaultCapacity, buffer, modelMatrixFloat32Array)
  }
};

let updateData = (gl, data: Float32Array.t, buffer) => {
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  gl |> bufferSubFloat32Data(getArrayBuffer(gl), 0, data);
  buffer
};
/* let unbind = (gl, buffer) => {}; */