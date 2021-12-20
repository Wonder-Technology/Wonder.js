type directionLight = WonderComponentTypeDirectionlight.Index.directionLight

type config = {
  isDebug: bool,
  directionLightCount: int,
}

type state = {
  config: config,
  mutable maxIndex: WonderCommonlib.ComponentType.index,
  buffer: WonderCommonlib.SharedArrayBufferType.sharedArrayBuffer,
  mutable colors: Js.Typed_array.Float32Array.t,
  mutable intensities: Js.Typed_array.Float32Array.t,
  gameObjectMap: WonderCommonlib.ComponentType.gameObjectMap,
  gameObjectDirectionLightMap: WonderCommonlib.MutableSparseMap.t<
    WonderCore.IGameObjectForJs.gameObject,
    directionLight,
  >,
}
