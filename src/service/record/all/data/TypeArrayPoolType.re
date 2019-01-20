open Js.Typed_array;

type float32ArrayPoolMap = WonderCommonlib.MutableSparseMapService.t(array(Float32Array.t));

type uint16ArrayPoolMap = WonderCommonlib.MutableSparseMapService.t(array(Uint16Array.t));

type typeArrayPoolRecord = {
  float32ArrayPoolMap,
  uint16ArrayPoolMap
};