type pointLightRecord = {
  index: int,
  positionMap: option(array(PositionType.position)),
  renderLightArr: option(array(ComponentType.component)),
  colors: Js.Typed_array.Float32Array.t,
  intensities: Js.Typed_array.Float32Array.t,
  constants: Js.Typed_array.Float32Array.t,
  linears: Js.Typed_array.Float32Array.t,
  quadratics: Js.Typed_array.Float32Array.t,
  ranges: Js.Typed_array.Float32Array.t
};