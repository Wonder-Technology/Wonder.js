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

type componentIndex = int;

type imageIndex = int;

type samplerIndex = int;

type asset = {
  version: string,
  generator: string
};

type scene = {gameObjects: array(gameObjectIndex)};

type gameObjects = {count: int};

type transform = {
  translation: option((float, float, float)),
  rotation: option((float, float, float, float)),
  scale: option((float, float, float))
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

/* type bufferViewTarget =
  | ARRAY_BUFFER
  | ELEMENT_ARRAY_BUFFER; */

type bufferView = {
  buffer: bufferIndex,
  byteOffset: int,
  byteLength: int,
  byteStride: option(int)
  /* target: bufferViewTarget */
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

type componentGameObjectIndexData = {
  gameObjectIndices: array(gameObjectIndex),
  componentIndices: array(componentIndex)
};

type childrenTransformIndexData = {
  parentTransformIndices: array(transformIndex),
  childrenTransformIndices: array(array(transformIndex))
};

type gameObjectIndices = {
  childrenTransformIndexData,
  transformGameObjectIndexData: componentGameObjectIndexData,
  basicCameraViewGameObjectIndexData: componentGameObjectIndexData,
  perspectiveCameraProjectionGameObjectIndexData: componentGameObjectIndexData,
  lightMaterialGameObjectIndexData: componentGameObjectIndexData,
  /* TODO ambientLightGameObjectIndices: array(ambientLightIndex),
     directionLightGameObjectIndices: array(directionLightIndex),
     pointLightGameObjectIndices: array(pointLightIndex), */
  /* geometryGameObjectIndices: array(geometryIndex) */
  geometryGameObjectIndexData: componentGameObjectIndexData
};


type mapMaterialIndexData = {
  materialIndices: array(lightMaterialIndex),
  mapIndices: array(textureIndex)
};

type materialIndices = {
  diffuseMapMaterialIndices: mapMaterialIndexData
};

type imageTextureIndexData = {
  textureIndices: array(textureIndex),
  imageIndices: array(imageIndex)
};

type samplerTextureIndexData = {
  textureIndices: array(textureIndex),
  samplerIndices: array(samplerIndex)
};

type indices = {
  gameObjectIndices,
  materialIndices,
  imageTextureIndices: imageTextureIndexData,
  samplerTextureIndices: samplerTextureIndexData
};

type basicCameraViews = {count: int};

type wd = {
  asset,
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
  geometrys: array(option(geometry)),
  lightMaterials: array(lightMaterial)
};