open ComponentType;

type directionLightRecord = {
  index: int,
  colors: Js.Typed_array.Float32Array.t,
  intensities: Js.Typed_array.Float32Array.t,
  renderLightArr: array(component),
  directionMap: WonderCommonlib.MutableSparseMapService.t((float, float, float)),
};