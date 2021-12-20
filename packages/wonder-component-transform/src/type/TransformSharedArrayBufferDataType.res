type transformSharedArrayBufferData = {
  buffer: WonderCommonlib.SharedArrayBufferType.sharedArrayBuffer,
  mutable localToWorldMatrices: Js.Typed_array.Float32Array.t,
  mutable localPositions: Js.Typed_array.Float32Array.t,
  mutable localRotations: Js.Typed_array.Float32Array.t,
  mutable localScales: Js.Typed_array.Float32Array.t,
}
