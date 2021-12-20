type transform = WonderComponentTypeTransformWorker.Index.transform

type config = {isDebug: bool}

type state = {
  config: config,
  localToWorldMatrices: Js.Typed_array.Float32Array.t,
}
