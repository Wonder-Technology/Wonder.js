open Js.Typed_array;

open GlobalTempType;

let initData = () => {
  float32Array1:
    Float32Array.make([|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.|])
};