open Js.Typed_array;

type gameObjectIndex = int;

type transformIndex = int;

type bsdfMaterialIndex = int;

type cameraViewIndex = int;

type cameraProjectionIndex = int;

type directionLightIndex = int;

type geometryIndex = int;

type componentIndex = int;

type imageIndex = int;

type positionIndex = int;

type normalIndex = int;

type texCoordIndex = int;

type indexIndex = int;

type asset = {
  version: string,
  //   generator: string,
};

type scene = {
  gameObjects: list(gameObjectIndex),
  //   ambientLight: option(ambientLight),
  //   imgui: option(SceneGraphType.imgui),
  //   isRoot: bool,
};

type gameObjects = {
  count: int,
  //   names: list(string),
  //   isRoots: WonderCommonlib.MutableSparseMapService.t(bool),
  //   isActives: WonderCommonlib.MutableSparseMapService.t(bool),
};

// type componentGameObjectIndexMapData = {
//   //   gameObjectIndexMap: list(gameObjectIndex),
//   //   componentIndexMap: list(componentIndex),
//   gameObjectIndexMap: ImmutableSparseMap.t(gameObjectIndex, componentIndex),
//   //   componentIndexMap: list(componentIndex),
// };

// type childrenTransformIndexMapData = {
//   parentTransformIndexMap: list(transformIndex),
//   childrenTransformIndexMap: list(list(transformIndex)),
// };

// type gameObjectComponentIndexMap = {
//   childrenTransformIndexMapData,
//   transformGameObjectIndexMapData: componentGameObjectIndexMapData,
//   basicCameraViewGameObjectIndexMapData: componentGameObjectIndexMapData,
//   perspectiveCameraProjectionGameObjectIndexMapData: componentGameObjectIndexMapData,
//   //   flyCameraControllerGameObjectIndexMapData: componentGameObjectIndexMapData,
//   //   arcballCameraControllerGameObjectIndexMapData: componentGameObjectIndexMapData,
//   //   basicMaterialGameObjectIndexMapData: componentGameObjectIndexMapData,
//   //   lightMaterialGameObjectIndexMapData: componentGameObjectIndexMapData,
//   bsdfMaterialGameObjectIndexMapData: componentGameObjectIndexMapData,
//   directionLightGameObjectIndexMapData: componentGameObjectIndexMapData,
//   //   pointLightGameObjectIndexMapData: componentGameObjectIndexMapData,
//   geometryGameObjectIndexMapData: componentGameObjectIndexMapData,
//   //   meshRendererGameObjectIndexMapData: componentGameObjectIndexMapData,
//   //   scriptGameObjectIndexMapData: componentGameObjectIndexMapData,
// };

type parentIndex = transformIndex;

type childrenIndices = list(transformIndex);

type gameObjectComponentIndexMapData = {
  hierachyIndexMap: ImmutableSparseMap.t(parentIndex, childrenIndices),
  transformgIndexMap: ImmutableSparseMap.t(gameObjectIndex, transformIndex),
  basicCameraViewIndexMap:
    ImmutableSparseMap.t(gameObjectIndex, cameraViewIndex),
  perspectiveCameraProjectionIndexMap:
    ImmutableSparseMap.t(gameObjectIndex, cameraProjectionIndex),
  bsdfMaterialIndexMap:
    ImmutableSparseMap.t(gameObjectIndex, bsdfMaterialIndex),
  directionLightIndexMap:
    ImmutableSparseMap.t(gameObjectIndex, directionLightIndex),
  geometryIndexMap: ImmutableSparseMap.t(gameObjectIndex, geometryIndex),
  //   hierachyIndexMap: ListSt.t(parentIndex, childrenIndices),
  //   transformGameObjectIndexMap: ListSt.t(gameObjectIndex, transformIndex),
  //   basicCameraViewGameObjectIndexMap:
  //     ListSt.t(gameObjectIndex, cameraViewIndex),
  //   perspectiveCameraProjectionGameObjectIndexMap:
  //     ListSt.t(gameObjectIndex, cameraProjectionIndex),
  //   bsdfMaterialGameObjectIndexMap:
  //     ListSt.t(gameObjectIndex, bsdfMaterialIndex),
  //   directionLightGameObjectIndexMap:
  //     ListSt.t(gameObjectIndex, directionLightIndex),
  //   geometryGameObjectIndexMap: ListSt.t(gameObjectIndex, geometryIndex),
};

type materialIndexMapData = {
  diffuseMapImageIndexMap:
    ImmutableSparseMap.t(bsdfMaterialIndex, imageIndex),
  channelRoughnessMetallicMapImageIndexMap:
    ImmutableSparseMap.t(bsdfMaterialIndex, imageIndex),
  emissionMapImageIndexMap:
    ImmutableSparseMap.t(bsdfMaterialIndex, imageIndex),
  normalMapImageIndexMap: ImmutableSparseMap.t(bsdfMaterialIndex, imageIndex),
  transmissionMapImageIndexMap:
    ImmutableSparseMap.t(bsdfMaterialIndex, imageIndex),
  specularMapImageIndexMap:
    ImmutableSparseMap.t(bsdfMaterialIndex, imageIndex),
};

// type imageTextureIndexMapData = {
//   textureIndices: list(textureIndex),
//   imageIndices: list(imageIndex),
// };

type indexMapData = {
  gameObjectComponentIndexMapData,
  materialIndexMapData,
  //   imageTextureIndices: imageTextureIndexMapData,
  //   samplerTextureIndices: samplerTextureIndexMapData,
};

// type image = {
//   //   name: string,
//   //   bufferView: bufferViewIndex,
//   arrayBuffer: ArrayBuffer.t,
//   //   mimeType: string,
// };

// type image = ArrayBuffer.t;

type directionLight = {
  color: option((float, float, float)),
  intensity: option(float),
};

type basicCameraView = {isActive: bool};

type perspectiveCameraProjection = {
  near: option(float),
  far: option(float),
  fovy: option(float),
  aspect: option(float),
};

type transform = {
  translation: option((float, float, float)),
  rotation: option((float, float, float, float)),
  scale: option((float, float, float)),
};

type geometry = {
  position: positionIndex,
  normal: option(normalIndex),
  texCoord: option(texCoordIndex),
  index: indexIndex,
};

// type position = ArrayBuffer.t;

// type normal = ArrayBuffer.t;

// type texCoord = ArrayBuffer.t;

// type index = ArrayBuffer.t;

type bsdfMaterial = {
  diffuseColor: option((float, float, float)),
  specularColor: option((float, float, float)),
  specular: option(float),
  roughness: option(float),
  metalness: option(float),
  ior: option(float),
  transmission: option(float),
  //   diffuseMapImageId: option(imageIndexString),
  //   channelRoughnessMetallicMapImageId: option(imageIndexString),
  //   emissionMapImageId: option(imageIndex),
  //   normalMapImageId: option(imageIndex),
  //   transmissionMapImageId: option(imageIndex),
  //   specularMapImageId: option(imageIndex),
};

type bufferData = {
  //   images: list(ArrayBuffer.t),
  //   positions: list(ArrayBuffer.t),
  //   normals: list(ArrayBuffer.t),
  //   texCoords: list(ArrayBuffer.t),
  //   indices: list(ArrayBuffer.t),
  images: list(Uint8Array.t),
  positions: list(Float32Array.t),
  normals: list(Float32Array.t),
  texCoords: list(Float32Array.t),
  indices: list(Uint32Array.t),
};

type wdd = {
  bufferData,
  asset,
  scene,
  indexMapData,
  gameObjects,
  directionLights: list(directionLight),
  basicCameraViews: list(basicCameraView),
  perspectiveCameraProjections: list(perspectiveCameraProjection),
  transforms: list(transform),
  geometries: list(geometry),
  bsdfMaterials: list(bsdfMaterial),
};
