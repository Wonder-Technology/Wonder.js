open Js.Typed_array;

type float32ArrayPoolMap = WonderCommonlib.SparseMapService.t(array(Float32Array.t));

type uint16ArrayPoolMap = WonderCommonlib.SparseMapService.t(array(Uint16Array.t));

type typeArrayPoolRecord = {
  float32ArrayPoolMap,
  uint16ArrayPoolMap
};