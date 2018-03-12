open Js.Typed_array;

type float32ArrayPoolMap = array(array(Float32Array.t));

type uint16ArrayPoolMap = array(array(Uint16Array.t));

type typeArrayPoolRecord = {
  float32ArrayPoolMap,
  uint16ArrayPoolMap
};