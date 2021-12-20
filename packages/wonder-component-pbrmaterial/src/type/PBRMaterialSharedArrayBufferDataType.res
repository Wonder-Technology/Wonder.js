type pbrMaterialSharedArrayBufferData = {
  buffer: WonderCommonlib.SharedArrayBufferType.sharedArrayBuffer,
  mutable diffuseColors: Js.Typed_array.Float32Array.t,
  mutable speculars: Js.Typed_array.Float32Array.t,
  mutable specularColors: Js.Typed_array.Float32Array.t,
  mutable roughnesses: Js.Typed_array.Float32Array.t,
  mutable metalnesses: Js.Typed_array.Float32Array.t,
  mutable transmissions: Js.Typed_array.Float32Array.t,
  mutable iors: Js.Typed_array.Float32Array.t,
}
