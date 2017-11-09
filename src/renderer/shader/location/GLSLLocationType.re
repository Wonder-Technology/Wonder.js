type glslLocationData = {
  attributeLocationMap: Js.Dict.t(Js.Dict.t(int)),
  uniformLocationMap: Js.Dict.t(Js.Dict.t(GlType.uniformLocation))
};