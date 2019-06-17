open ComponentType;

type pointLightRecord = {
  index: int,
  colors: Js.Typed_array.Float32Array.t,
  intensities: Js.Typed_array.Float32Array.t,
  constants: Js.Typed_array.Float32Array.t,
  linears: Js.Typed_array.Float32Array.t,
  quadratics: Js.Typed_array.Float32Array.t,
  ranges: Js.Typed_array.Float32Array.t,
  renderLightArr: array(component),
  positionMap: WonderCommonlib.MutableSparseMapService.t((float, float, float)),
};