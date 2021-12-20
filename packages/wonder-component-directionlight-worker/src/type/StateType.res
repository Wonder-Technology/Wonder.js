type directionLight = WonderComponentTypeDirectionlightWorker.Index.directionLight

type config = {isDebug: bool}

type state = {
  config: config,
  colors: Js.Typed_array.Float32Array.t,
  intensities: Js.Typed_array.Float32Array.t,
}
