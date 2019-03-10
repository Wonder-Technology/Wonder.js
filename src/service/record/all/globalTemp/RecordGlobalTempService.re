open Js.Typed_array;

open GlobalTempType;

let create = () => {
  float16Array1:
    Float32Array.make([|
      1.,
      0.,
      0.,
      0.,
      0.,
      1.,
      0.,
      0.,
      0.,
      0.,
      1.,
      0.,
      0.,
      0.,
      0.,
      1.,
    |]),
  float9Array1: Float32Array.make([|1., 0., 0., 1., 0., 0., 1., 0., 0.|]),
  unusedFloat9ArrayArr: [||],
};