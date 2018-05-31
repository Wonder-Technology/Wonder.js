type bufferViewIndex = int;

type bufferIndex = int;

type accessorIndex = int;

type materialIndex = int;

type textureIndex = int;

type imageIndex = int;

type samplerIndex = int;

type cameraIndex = int;

type nodeIndex = int;

type meshIndex = int;

type scene = {nodes: option(array(nodeIndex))};

type asset = {
  version: string,
  generator: option(string)
};

/*
 type accessorComponentType =
   | BYTE
   | UNSIGNED_BYTE
   | SHORT
   | UNSIGNED_SHORT
   | UNSIGNED_INT
   | FLOAT;

 type accessorType =
   | SCALAR
   | VEC2
   | VEC3
   | VEC4
   | MAT2
   | MAT3
   | MAT4; */
type accessor = {
  bufferView: option(bufferViewIndex),
  byteOffset: option(int),
  count: int,
  componentType: int,
  type_: string
};

type buffer = {
  uri: option(string),
  byteLength: int
};

/* type bufferViewTarget =
   | ARRAY_BUFFER
   | ELEMENT_ARRAY_BUFFER; */
type bufferView = {
  buffer: bufferIndex,
  byteOffset: option(int),
  byteLength: int,
  byteStride: option(int)
  /* target: option(int) */
};

type perspective = {
  aspectRatio: option(float),
  yfov: float,
  zfar: option(float),
  znear: float
};

type orthographic = {
  xmag: float,
  ymag: float,
  zfar: float,
  znear: float
};

/* type cameraType =
   | PERSPECTIVE
   | ORTHOGRAPHIC; */
type camera = {
  type_: string,
  perspective: option(perspective),
  orthographic: option(orthographic)
};

type image = {uri: option(string)};

/* type magFilter =
     | NEAREST
     | LINEAR;

   type minFilter =
     | NEAREST
     | LINEAR
     | NEAREST_MIPMAP_NEAREST
     | LINEAR_MIPMAP_NEAREST
     | NEAREST_MIPMAP_LINEAR
     | LINEAR_MIPMAP_LINEAR;

   type wrap =
     | CLAMP_TO_EDGE
     | MIRRORED_REPEAT
     | REPEAT; */
type sampler = {
  magFilter: option(int),
  minFilter: option(int),
  wrapS: option(int),
  wrapT: option(int)
};

type texture = {
  sampler: option(samplerIndex),
  source: option(imageIndex)
};

type textureInfo = {
  index: int,
  texCoord: option(int)
};

type pbrMetallicRoughness = {
  baseColorFactor: option(array(float)),
  baseColorTexture: option(textureInfo),
  metallicFactor: option(float),
  roughnessFactor: option(float),
  metallicRoughnessTexture: option(textureInfo)
};

type material = {pbrMetallicRoughness: option(pbrMetallicRoughness)};

type node = {
  camera: option(cameraIndex),
  mesh: option(meshIndex),
  children: option(array(nodeIndex)),
  matrix: option(array(float)),
  translation: option(array(float)),
  rotation: option(array(float)),
  scale: option(array(float))
};

type attributes = {
  position: accessorIndex,
  normal: option(accessorIndex),
  texCoord_0: option(accessorIndex),
  texCoord_1: option(accessorIndex)
};

type primitive = {
  attributes,
  indices: option(accessorIndex),
  material: option(materialIndex)
};

type mesh = {primitives: array(primitive)};

type gltf = {
  asset,
  scenes: array(scene),
  scene: int,
  images: option(array(image)),
  textures: option(array(texture)),
  samplers: option(array(sampler)),
  buffers: array(buffer),
  bufferViews: array(bufferView),
  accessors: array(accessor),
  cameras: option(array(camera)),
  nodes: array(node),
  meshes: array(mesh),
  materials: array(material)
};