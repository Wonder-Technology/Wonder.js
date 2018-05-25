type gameObjectIndex = int;

type bufferViewIndex = int;

type bufferIndex = int;

type accessorIndex = int;

type transformIndex = int;

type lightMaterialIndex = int;

type textureIndex = int;

type cameraViewIndex = int;

type cameraProjectionIndex = int;

/* type ambientLightIndex = int;

   type directionLightIndex = int;

   type pointLightIndex = int; */
type geometryIndex = int;

type imageIndex = int;

type samplerIndex = int;

type asset = {
  version: string,
  generator: string
};

type scene = {gameObjects: array(gameObjectIndex)};

type gameObject = {count: int};

type transform = {
  translation: option(array(float)),
  rotation: option(array(float)),
  scale: option(array(float))
};

type geometry = {
  position: accessorIndex,
  normal: option(accessorIndex),
  texCoord: option(accessorIndex),
  indices: accessorIndex
  /* TODO add mode */
};

type cameraProjection = {
  near: option(float),
  far: option(float),
  fovy: option(float),
  aspect: option(float)
};

type lightMaterial = {
  /* TODO add doubleSided: option(bool), */
  diffuseColor: option(array(float)),
  specularColor: option(array(float)),
  shininess: option(float)
};

/*
 type ambientLight = {
 color: option(array(float))
 };


 type directionLight = {
 color: option(array(float)),
 intensity: option(float)
 }; */
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
  | MAT4;

type accessor = {
  bufferView: bufferViewIndex,
  byteOffset: int,
  count: int,
  componentType: accessorComponentType,
  type_: accessorType
};

type buffer = {
  uri: string,
  byteLength: int
};

type bufferViewTarget =
  | ARRAY_BUFFER
  | ELEMENT_ARRAY_BUFFER;

type bufferView = {
  buffer: bufferIndex,
  byteOffset: int,
  byteLength: int,
  byteStride: int,
  target: bufferViewTarget
};

type image = {uri: string};

type texture = {
  sampler: samplerIndex
  /* TODO add format, type_, ... */
};

type magFilter =
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
  | REPEAT;

type sampler = {
  magFilter,
  minFilter,
  wrapS: wrap,
  wrapT: wrap
};

type gameObjectIndices = {
  parentGameObjectIndices: array(transformIndex),
  transformGameObjectIndices: array(transformIndex),
  cameraViewGameObjectIndices: array(cameraViewIndex),
  cameraProjectionGameObjectIndices: array(cameraProjectionIndex),
  lightMaterialGameObjectIndices: array(lightMaterialIndex),
  /* ambientLightGameObjectIndices: array(ambientLightIndex),
     directionLightGameObjectIndices: array(directionLightIndex),
     pointLightGameObjectIndices: array(pointLightIndex), */
  geometryGameObjectIndices: array(geometryIndex)
};

type materialIndices = {
  diffuseMapMaterialIndices: array(textureIndex),
  specularMapMaterialIndices: array(textureIndex)
};

type indices = {
  gameObjectIndices,
  materialIndices,
  textureIndices: array(imageIndex)
};

type wd = {
  asset,
  scenes: array(scene),
  scene: int,
  indices,
  gameObjects: array(gameObject),
  images: array(image),
  textures: array(texture),
  samplers: array(sampler),
  buffers: array(buffer),
  bufferViews: array(bufferView),
  accessors: array(accessor),
  /* TODO add ambientLights, directionLights, pointLights, */
  /* cameraViews: array(cameraView), */
  cameraProjections: array(cameraProjection),
  transforms: array(transform),
  geometrys: array(geometry),
  lightMaterials: array(lightMaterial)
};