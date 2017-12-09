open Js.Typed_array;

open GlobalTempType;

let getFloat32Array1 = (state: StateDataType.state) =>
  GlobalTempStateSystem.getData(state).float32Array1;

let initData = () => {
  float32Array1:
    Float32Array.make([|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.|])
};