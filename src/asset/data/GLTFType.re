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

type cameraControllerIndex = int;

type sceneKHRLightsExtension = {light: int};

type sceneExtensions = {khr_lights: option(sceneKHRLightsExtension)};

type sceneExtras = {imgui: option(SceneGraphType.imgui)};

type scene = {
  nodes: option(array(nodeIndex)),
  extensions: option(sceneExtensions),
  extras: option(sceneExtras),
};

type asset = {
  version: string,
  generator: option(string),
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
  type_: string,
};

type buffer = {
  uri: option(string),
  byteLength: int,
};

/* type bufferViewTarget =
   | ARRAY_BUFFER
   | ELEMENT_ARRAY_BUFFER; */
type bufferView = {
  buffer: bufferIndex,
  byteOffset: option(int),
  byteLength: int,
  byteStride: option(int),
  /* target: option(int) */
};

type perspective = {
  aspectRatio: option(float),
  yfov: float,
  zfar: option(float),
  znear: float,
};

type orthographic = {
  xmag: float,
  ymag: float,
  zfar: float,
  znear: float,
};

/* type cameraType =
   | PERSPECTIVE
   | ORTHOGRAPHIC; */
type camera = {
  type_: string,
  perspective: option(perspective),
  orthographic: option(orthographic),
};

type image = {
  uri: option(string),
  name: option(string),
  bufferView: option(int),
  mimeType: option(string),
};

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
  wrapT: option(int),
};

type texture = {
  sampler: option(samplerIndex),
  source: option(imageIndex),
  name: option(string),
};

type textureInfo = {
  index: int,
  texCoord: option(int),
};

type pbrMetallicRoughness = {
  baseColorFactor: option(array(float)),
  baseColorTexture: option(textureInfo),
  metallicFactor: option(float),
  roughnessFactor: option(float),
  metallicRoughnessTexture: option(textureInfo),
};

type material = {
  pbrMetallicRoughness: option(pbrMetallicRoughness),
  name: option(string),
};

type basicMaterial = {
  colorFactor: option(array(float)),
  name: option(string),
};

type nodeExtras = {
  meshRenderer: option(int),
  basicMaterial: option(int),
  lightMaterial: option(int),
  cameraController: option(cameraControllerIndex),
};

type nodeKHRLightsExtension = {light: int};

type nodeExtensions = {khr_lights: option(nodeKHRLightsExtension)};

type node = {
  name: option(string),
  camera: option(cameraIndex),
  mesh: option(meshIndex),
  children: option(array(nodeIndex)),
  matrix: option(array(float)),
  translation: option(array(float)),
  rotation: option(array(float)),
  scale: option(array(float)),
  extras: option(nodeExtras),
  extensions: option(nodeExtensions),
};

type attributes = {
  position: accessorIndex,
  normal: option(accessorIndex),
  texCoord_0: option(accessorIndex),
  texCoord_1: option(accessorIndex),
};

type primitive = {
  attributes,
  indices: option(accessorIndex),
  material: option(materialIndex),
  mode: option(int),
};

type mesh = {
  primitives: array(primitive),
  name: option(string),
};

/* TODO support spot light */
type light = {
  type_: string,
  color: option(array(float)),
  /* TODO remove intensity, range when implement pbr? */
  intensity: option(float),
  constantAttenuation: option(float),
  linearAttenuation: option(float),
  quadraticAttenuation: option(float),
  range: option(float),
};

type khrLightsExtension = {lights: array(light)};

type extensions = {khr_lights: option(khrLightsExtension)};

type meshRenderer = {drawMode: Js.Typed_array.Uint8Array.elt};

type gltfExtras = {
  arcballCameraControllers:
    option(array(SceneGraphType.arcballCameraController)),
  basicMaterials: option(array(basicMaterial)),
  meshRenderers: option(array(meshRenderer)),
};

type gltf = {
  asset,
  scenes: array(scene),
  scene: option(int),
  images: option(array(image)),
  textures: option(array(texture)),
  samplers: option(array(sampler)),
  buffers: array(buffer),
  bufferViews: array(bufferView),
  accessors: array(accessor),
  cameras: option(array(camera)),
  nodes: array(node),
  meshes: array(mesh),
  materials: option(array(material)),
  extensionsUsed: option(array(string)),
  extensions: option(extensions),
  extras: option(gltfExtras),
};