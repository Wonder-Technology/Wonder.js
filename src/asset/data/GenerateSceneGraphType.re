type nodeExtension = {material: option(int)};

type nodeData = {
  gameObject: int,
  children: option(array(int)),
  translation: option(PositionType.position),
  rotation: option(RotationType.rotation),
  scale: option(ScaleType.scale),
  mesh: option(int),
  camera: option(int),
  extension: option(nodeExtension),
};

type attributes = {
  position: int,
  normal: int,
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
  far: float,
  fovy: float,
  aspect: float,
};

type cameraData = {
  type_: string,
  perspective: perspectiveCameraData,
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