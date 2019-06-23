type gameObjectIndex = int;

type bufferViewIndex = int;

type bufferIndex = int;

type accessorIndex = int;

type transformIndex = int;

type basicMaterialIndex = int;

type lightMaterialIndex = int;

type textureIndex = int;

type cameraViewIndex = int;

type cameraProjectionIndex = int;

type ambientLightIndex = int;

type directionLightIndex = int;

type pointLightIndex = int;

type geometryIndex = int;

type componentIndex = int;

type imageIndex = int;

type samplerIndex = int;

type asset = {
  version: string,
  generator: string,
};

type gameObjects = {
  count: int,
  names: array(string),
  isRoots: WonderCommonlib.MutableSparseMapService.t(bool),
  isActives: WonderCommonlib.MutableSparseMapService.t(bool),
};

type transform = {
  translation: option((float, float, float)),
  rotation: option((float, float, float, float)),
  scale: option((float, float, float)),
};

type meshRenderer = {
  drawMode: DrawModeType.drawMode,
  isRender: bool,
};

type geometry = {
  name: string,
  position: accessorIndex,
  normal: option(accessorIndex),
  texCoord: option(accessorIndex),
  index: accessorIndex,
};

type perspectiveCameraProjection = {
  near: float,
  far: option(float),
  fovy: float,
  aspect: option(float),
};

type lightMaterial = {
  /* TODO add doubleSided: option(bool), */
  diffuseColor: array(float),
  /* specularColor: option(array(float)),
     shininess: option(float) */
  name: string,
};

type basicMaterial = {
  color: array(float),
  name: string,
};

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
  type_: accessorType,
};

/* type buffer = {
     uri: option(string),
     buffer: option(Js.Typed_array.ArrayBuffer.t),
     byteLength: int,
   }; */

/* type wdbBuffer = {byteLength: int}; */

/* type bufferViewTarget =
   | ARRAY_BUFFER
   | ELEMENT_ARRAY_BUFFER; */

type bufferView = {
  buffer: bufferIndex,
  byteOffset: int,
  byteLength: int,
  byteStride: option(int),
  /* target: bufferViewTarget */
};

/* type uriImage = {uriBase64: string};

   /* type mimeType =
     | PNG
     | JPEG
     | UNKNOWN; */

   type blobImage = {objectUrl: string}; */

type image = {
  name: string,
  bufferView: bufferViewIndex,
  mimeType: string,
};

type basicSourceTexture = {
  name: string,
  format: int,
  type_: int,
  flipY: bool,
};

type sampler = {
  magFilter: TextureType.filter,
  minFilter: TextureType.filter,
  wrapS: TextureType.wrap,
  wrapT: TextureType.wrap,
};

type componentGameObjectIndexData = {
  gameObjectIndices: array(gameObjectIndex),
  componentIndices: array(componentIndex),
};

type childrenTransformIndexData = {
  parentTransformIndices: array(transformIndex),
  childrenTransformIndices: array(array(transformIndex)),
};

type gameObjectIndices = {
  childrenTransformIndexData,
  transformGameObjectIndexData: componentGameObjectIndexData,
  basicCameraViewGameObjectIndexData: componentGameObjectIndexData,
  perspectiveCameraProjectionGameObjectIndexData: componentGameObjectIndexData,
  flyCameraControllerGameObjectIndexData: componentGameObjectIndexData,
  arcballCameraControllerGameObjectIndexData: componentGameObjectIndexData,
  basicMaterialGameObjectIndexData: componentGameObjectIndexData,
  lightMaterialGameObjectIndexData: componentGameObjectIndexData,
  directionLightGameObjectIndexData: componentGameObjectIndexData,
  pointLightGameObjectIndexData: componentGameObjectIndexData,
  geometryGameObjectIndexData: componentGameObjectIndexData,
  meshRendererGameObjectIndexData: componentGameObjectIndexData,
  scriptGameObjectIndexData: componentGameObjectIndexData,
};

type mapMaterialIndexData = {
  materialIndices: array(lightMaterialIndex),
  mapIndices: array(textureIndex),
};

type materialIndices = {diffuseMapMaterialIndices: mapMaterialIndexData};

type imageTextureIndexData = {
  textureIndices: array(textureIndex),
  imageIndices: array(imageIndex),
};

type samplerTextureIndexData = {
  textureIndices: array(textureIndex),
  samplerIndices: array(samplerIndex),
};

type indices = {
  gameObjectIndices,
  materialIndices,
  imageTextureIndices: imageTextureIndexData,
  samplerTextureIndices: samplerTextureIndexData,
};

type basicCameraView = {isActive: bool};

type ambientLight = {color: array(float)};

type directionLight = {
  color: array(float),
  intensity: float,
};

type pointLight = {
  color: array(float),
  intensity: float,
  constantAttenuation: float,
  linearAttenuation: float,
  quadraticAttenuation: float,
  range: float,
};

type scene = {
  gameObjects: array(gameObjectIndex),
  ambientLight: option(ambientLight),
  imgui: option(SceneGraphType.imgui),
  isRoot: bool,
};

type script = CommonAssetType.script;

type wd = {
  asset,
  scene,
  indices,
  gameObjects,
  images: option(array(image)),
  basicSourceTextures: array(basicSourceTexture),
  samplers: array(sampler),
  buffers: array(int),
  bufferViews: array(bufferView),
  accessors: array(accessor),
  directionLights: array(directionLight),
  pointLights: array(pointLight),
  basicCameraViews: array(basicCameraView),
  perspectiveCameraProjections: array(perspectiveCameraProjection),
  flyCameraControllers: array(SceneGraphType.flyCameraController),
  arcballCameraControllers: array(SceneGraphType.arcballCameraController),
  transforms: array(transform),
  geometrys: array(option(geometry)),
  meshRenderers: array(option(meshRenderer)),
  basicMaterials: array(basicMaterial),
  lightMaterials: array(lightMaterial),
  scripts: array(script),
};