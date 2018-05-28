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

type gameObjects = {count: int};

type transform = {
  /* translation: array(float),
     rotation: array(float),
     scale: array(float) */
  translation: (float, float, float),
  rotation: (float, float, float, float),
  scale: (float, float, float)
};

type geometry = {
  position: accessorIndex,
  normal: option(accessorIndex),
  texCoord: option(accessorIndex),
  index: accessorIndex
  /* TODO add mode */
};

type perspectiveCameraProjection = {
  near: float,
  far: option(float),
  fovy: float,
  aspect: option(float)
};

type lightMaterial = {
  /* TODO add doubleSided: option(bool), */
  diffuseColor: option(array(float))
  /* specularColor: option(array(float)),
     shininess: option(float) */
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
  byteStride: option(int),
  target: bufferViewTarget
};

type image = {uri: string};

type basicSourceTextures = {count: int};

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
  /* TODO add format, type_, ... */
  magFilter,
  minFilter,
  wrapS: wrap,
  wrapT: wrap
};

type gameObjectIndices = {
  /* parentGameObjectIndices: array(transformIndex), */
  childrenTransformIndices: array(option(array(transformIndex))),
  transformGameObjectIndices: array(transformIndex),
  basicCameraViewGameObjectIndices: array(cameraViewIndex),
  perspectiveCameraProjectionGameObjectIndices: array(cameraProjectionIndex),
  lightMaterialGameObjectIndices: array(lightMaterialIndex),
  /* ambientLightGameObjectIndices: array(ambientLightIndex),
     directionLightGameObjectIndices: array(directionLightIndex),
     pointLightGameObjectIndices: array(pointLightIndex), */
  geometryGameObjectIndices: array(geometryIndex)
};

type materialIndices = {
  diffuseMapMaterialIndices: array(textureIndex)
  /* specularMapMaterialIndices: array(textureIndex) */
};

type indices = {
  gameObjectIndices,
  materialIndices,
  imageTextureIndices: array(imageIndex),
  samplerTextureIndices: array(samplerIndex)
};

type basicCameraViews = {count: int};

type wd = {
  asset,
  /* scenes: array(scene), */
  /* scene: int, */
  scene,
  indices,
  gameObjects,
  images: array(image),
  basicSourceTextures,
  samplers: array(sampler),
  buffers: array(buffer),
  bufferViews: array(bufferView),
  accessors: array(accessor),
  /* TODO add ambientLights, directionLights, pointLights, */
  basicCameraViews,
  perspectiveCameraProjections: array(perspectiveCameraProjection),
  transforms: array(transform),
  geometrys: array(geometry),
  lightMaterials: array(lightMaterial)
};