type pbrMaterial = WonderComponentTypePbrmaterial.Index.pbrMaterial

type config = {isDebug: bool}

type state = {
  config: config,
  diffuseColors: Js.Typed_array.Float32Array.t,
  speculars: Js.Typed_array.Float32Array.t,
  specularColors: Js.Typed_array.Float32Array.t,
  roughnesses: Js.Typed_array.Float32Array.t,
  metalnesses: Js.Typed_array.Float32Array.t,
  transmissions: Js.Typed_array.Float32Array.t,
  iors: Js.Typed_array.Float32Array.t,
}
