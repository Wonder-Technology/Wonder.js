open ComponentType;

type directionLightRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  colors: Js.Typed_array.Float32Array.t,
  intensities: Js.Typed_array.Float32Array.t,
  renderLightArr: array(component),
  gameObjectMap,
  disposedIndexArray: array(component),
};