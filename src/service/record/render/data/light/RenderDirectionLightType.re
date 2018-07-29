open ComponentType;

type directionLightRecord = {
  index: int,
  colors: Js.Typed_array.Float32Array.t,
  intensities: Js.Typed_array.Float32Array.t,
  directionMap: WonderCommonlib.SparseMapService.t((float, float, float))
};