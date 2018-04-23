type directionLightRecord = {
  index: int,
  positionMap: option(array(PositionType.position)),
  colors: Js.Typed_array.Float32Array.t,
  intensities: Js.Typed_array.Float32Array.t
};