type pbrMaterial = WonderComponentTypePbrmaterial.Index.pbrMaterial

// type diffuse = (float, float, float)

// type specularColor = (float, float, float)

type diffuseMap

type normalMap

type channelRoughnessMetallicMap

type emissionMap

type transmissionMap

type specularMap

type config = {
  isDebug: bool,
  pbrMaterialCount: int,
}

type state = {
  config: config,
  mutable maxIndex: WonderCommonlib.ComponentType.index,
  buffer: WonderCommonlib.SharedArrayBufferType.sharedArrayBuffer,
  mutable diffuseColors: Js.Typed_array.Float32Array.t,
  mutable speculars: Js.Typed_array.Float32Array.t,
  mutable specularColors: Js.Typed_array.Float32Array.t,
  mutable roughnesses: Js.Typed_array.Float32Array.t,
  mutable metalnesses: Js.Typed_array.Float32Array.t,
  mutable transmissions: Js.Typed_array.Float32Array.t,
  mutable iors: Js.Typed_array.Float32Array.t,
  defaultDiffuseColor: WonderCommonlib.VectorType.vec3,
  defaultSpecular: float,
  defaultSpecularColor: WonderCommonlib.VectorType.vec3,
  defaultRoughness: float,
  defaultMetalness: float,
  defaultTransmission: float,
  defaultIOR: float,
  gameObjectsMap: WonderCommonlib.ComponentType.gameObjectsMap,
  gameObjectPBRMaterialMap: WonderCommonlib.MutableSparseMap.t<
    WonderCore.IGameObjectForJs.gameObject,
    pbrMaterial,
  >,
  diffuseMapMap: WonderCommonlib.MutableSparseMap.t<pbrMaterial, diffuseMap>,
  channelRoughnessMetallicMapMap: WonderCommonlib.MutableSparseMap.t<
    pbrMaterial,
    channelRoughnessMetallicMap,
  >,
  emissionMapMap: WonderCommonlib.MutableSparseMap.t<pbrMaterial, emissionMap>,
  normalMapMap: WonderCommonlib.MutableSparseMap.t<pbrMaterial, normalMap>,
  transmissionMapMap: WonderCommonlib.MutableSparseMap.t<pbrMaterial, transmissionMap>,
  specularMapMap: WonderCommonlib.MutableSparseMap.t<pbrMaterial, specularMap>,
}
