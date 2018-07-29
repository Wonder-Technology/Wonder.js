type directionLightRecord = {
  index: int,
  directionMap: option(array(PositionType.position)),
  colors: Js.Typed_array.Float32Array.t,
  intensities: Js.Typed_array.Float32Array.t
};