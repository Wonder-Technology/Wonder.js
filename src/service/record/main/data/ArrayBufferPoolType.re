type arrayBufferType =
  | CustomGeometryArrayBuffer
  | TransformArrayBuffer
  | BasicMaterialArrayBuffer
  | LightMaterialArrayBuffer
  | AmbientLightArrayBuffer
  | DirectionLightArrayBuffer
  | PointLightArrayBuffer;

type arrayBufferPoolRecord = {poolMap: Js.Dict.t(list(WorkerType.sharedArrayBuffer))};