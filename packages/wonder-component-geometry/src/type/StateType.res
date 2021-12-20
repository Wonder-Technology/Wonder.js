type geometry = WonderComponentTypeGeometry.Index.geometry

type config = {
  isDebug: bool,
  geometryCount: int,
  geometryPointCount: int,
}

type state = {
  config: config,
  mutable maxIndex: WonderCommonlib.ComponentType.index,
  buffer: WonderCommonlib.SharedArrayBufferType.sharedArrayBuffer,
  mutable vertices: Js.Typed_array.Float32Array.t,
  mutable texCoords: Js.Typed_array.Float32Array.t,
  mutable normals: Js.Typed_array.Float32Array.t,
  mutable tangents: Js.Typed_array.Float32Array.t,
  mutable indices: Js.Typed_array.Uint32Array.t,
  mutable verticesInfos: Js.Typed_array.Uint32Array.t,
  mutable texCoordsInfos: Js.Typed_array.Uint32Array.t,
  mutable normalsInfos: Js.Typed_array.Uint32Array.t,
  mutable tangentsInfos: Js.Typed_array.Uint32Array.t,
  mutable indicesInfos: Js.Typed_array.Uint32Array.t,
  mutable verticesOffset: int,
  mutable texCoordsOffset: int,
  mutable normalsOffset: int,
  mutable tangentsOffset: int,
  mutable indicesOffset: int,
  gameObjectsMap: WonderCommonlib.ComponentType.gameObjectsMap,
  gameObjectGeometryMap: WonderCommonlib.MutableSparseMap.t<
    WonderCore.IGameObjectForJs.gameObject,
    geometry,
  >,
}
