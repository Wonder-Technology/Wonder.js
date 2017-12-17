open Js.Typed_array;

type float32ArrayPoolMap = array(Float32Array.t);

type uint16ArrayPoolMap = array(Uint16Array.t);

type typeArrayPoolData = {
  float32ArrayPoolMap,
  uint16ArrayPoolMap
};