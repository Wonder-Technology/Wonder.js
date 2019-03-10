open Js.Typed_array;

type globalTempRecord = {
  mutable float16Array1: Float32Array.t,
  mutable float9Array1: Float32Array.t,
  mutable unusedFloat9ArrayArr: array(Float32Array.t),
};