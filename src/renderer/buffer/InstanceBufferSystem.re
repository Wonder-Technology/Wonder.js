open GlType;

open SourceInstanceType;

open Gl;

open Js.Typed_array;

open VboBufferType;

open Contract;

/* todo test */
/*! start with a maximum of 64 instances */
let _getDefaultCapacity = () => 64 * 16 * 4;

let createBuffer = (gl, capacity: int) => {
  let buffer = VboBufferPoolSystem.getInstanceBuffer(gl);
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  bufferFloat32DataWithCapacity(getArrayBuffer(gl), capacity, getDynamicDraw(gl), gl);
  buffer
};

let getOrCreateBuffer = (gl, sourceInstance: int, bufferMap, state: StateDataType.state) =>
  switch (WonderCommonlib.SparseMapSystem.get(sourceInstance, bufferMap)) {
  | Some(buffer) => buffer
  | None =>
    let buffer = createBuffer(gl, _getDefaultCapacity());
    bufferMap |> WonderCommonlib.SparseMapSystem.set(sourceInstance, buffer) |> ignore;
    buffer
  };

let getFloat32InstanceArraySize = (capacity: int) => {
  requireCheck(
    () =>
      Contract.Operators.(test("capacity should be a multiplier of 4", () => capacity mod 4 == 0))
  );
  capacity / 4
};

let setCapacity = (gl, capacity: int, buffer) => {
  let defaultCapacity = _getDefaultCapacity();
  let currentCapacity = ref(defaultCapacity);
  while (currentCapacity^ < capacity) {
    currentCapacity := currentCapacity^ * 2
  };
  if (defaultCapacity < currentCapacity^) {
    deleteBuffer(buffer);
    (currentCapacity^, createBuffer(gl, currentCapacity^))
  } else {
    (defaultCapacity, buffer)
  }
};

let updateData = (gl, data: Float32Array.t, buffer) => {
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  bufferSubFloat32Data(getArrayBuffer(gl), 0, data);
  buffer
};
/* let unbind = (gl, buffer) => {}; */