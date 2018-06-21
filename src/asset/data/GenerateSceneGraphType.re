type nodeExtras = {material: option(int)};

type nodeKHRLightsExtension = {light: int};

type nodeExtensions = {khr_lights: option(nodeKHRLightsExtension)};

type nodeData = {
  gameObject: int,
  children: option(array(int)),
  translation: option(PositionType.position),
  rotation: option(RotationType.rotation),
  scale: option(ScaleType.scale),
  mesh: option(int),
  camera: option(int),
  extras: option(nodeExtras),
  extensions: option(nodeExtensions),
};

type attributes = {
  position: int,
  normal: option(int),
  texCoord_0: option(int),
};

type primitives = {
  attributes,
  indices: int,
  material: option(int),
};

type meshData = {
  primitives,
  name: option(string),
};

type bufferViewData = {
  buffer: int,
  byteOffset: int,
  byteLength: int,
};

type accessorData = {
  bufferView: int,
  componentType: int,
  count: int,
  type_: string,
};

type samplerData = {
  wrapS: int,
  wrapT: int,
  magFilter: int,
  minFilter: int,
};

type textureData = {
  name: option(string),
  sampler: int,
  source: int,
};

type materialData = {
  baseColorFactor: option(array(float)),
  baseColorTexture: option(int),
  name: option(string),
};

type perspectiveCameraData = {
  near: float,
  far: option(float),
  fovy: float,
  aspect: option(float),
};

type cameraData = {
  type_: string,
  perspective: perspectiveCameraData,
};

type lightData = {
  type_: string,
  color: option(array(float)),
  intensity: option(float),
  constantAttenuation: option(float),
  linearAttenuation: option(float),
  quadraticAttenuation: option(float),
  range: option(float),
};

type point =
  | VERTEX
  | NORMAL
  | TEXCOORD
  | INDEX;

external positionTupleToArray : PositionType.position => array(float) =
  "%identity";

external rotationTupleToArray : RotationType.rotation => array(float) =
  "%identity";

external scaleTupleToArray : ScaleType.scale => array(float) = "%identity";