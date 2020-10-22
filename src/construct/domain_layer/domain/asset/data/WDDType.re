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

type parentTransformIndex = transformIndex;

type childrenTransformIndices = list(transformIndex);

type gameObjectComponentIndexMap = {
  //   hierachyIndexMap:
  //     ImmutableSparseMap.t(parentTransformIndex, childrenTransformIndexs),
  //   transformGameObjectIndexMapData:
  //     ImmutableSparseMap.t(gameObjectIndex, transformIndex),
  //   basicCameraViewGameObjectIndexMapData:
  //     ImmutableSparseMap.t(gameObjectIndex, cameraViewIndex),
  //   perspectiveCameraProjectionGameObjectIndexMapData:
  //     ImmutableSparseMap.t(gameObjectIndex, cameraProjectionIndex),
  //   bsdfMaterialGameObjectIndexMapData:
  //     ImmutableSparseMap.t(gameObjectIndex, bsdfMaterialIndex),
  //   directionLightGameObjectIndexMapData:
  //     ImmutableSparseMap.t(gameObjectIndex, directionLightIndex),
  //   geometryGameObjectIndexMapData:
  //     ImmutableSparseMap.t(gameObjectIndex, geometryIndex),
  hierachyIndexMap: ListSt.t(parentTransformIndex, childrenTransformIndices),
  transformGameObjectIndexMap: ListSt.t(gameObjectIndex, transformIndex),
  basicCameraViewGameObjectIndexMap:
    ListSt.t(gameObjectIndex, cameraViewIndex),
  perspectiveCameraProjectionGameObjectIndexMap:
    ListSt.t(gameObjectIndex, cameraProjectionIndex),
  bsdfMaterialGameObjectIndexMap:
    ListSt.t(gameObjectIndex, bsdfMaterialIndex),
  directionLightGameObjectIndexMap:
    ListSt.t(gameObjectIndex, directionLightIndex),
  geometryGameObjectIndexMap: ListSt.t(gameObjectIndex, geometryIndex),
};

// type mapMaterialIndexMapData = {
//   materialIndices: list(lightMaterialIndex),
//   //   mapIndices: list(textureIndex),
//   mapIndices: list(imageIndex),
// };

// type materialIndices = {
//   diffuseMapMaterialIndices: mapMaterialIndexMapData,
//   channelRoughnessMetallicMapMaterialIndices: mapMaterialIndexMapData,
//   emissionMapMaterialIndices: mapMaterialIndexMapData,
//   normalMapMaterialIndices: mapMaterialIndexMapData,
//   transmissionMapMaterialIndices: mapMaterialIndexMapData,
//   specularMapMaterialIndices: mapMaterialIndexMapData,
// };

// type imageTextureIndexMapData = {
//   textureIndices: list(textureIndex),
//   imageIndices: list(imageIndex),
// };

// type indices = {
//   gameObjectIndices,
//   //   materialIndices,
//   //   imageTextureIndices: imageTextureIndexMapData,
//   //   samplerTextureIndices: samplerTextureIndexMapData,
// };

// type image = {
//   //   name: string,
//   //   bufferView: bufferViewIndex,
//   arrayBuffer: ArrayBuffer.t,
//   //   mimeType: string,
// };

// type image = ArrayBuffer.t;

type directionLight = {
  color: (float, float, float),
  intensity: float,
};

type basicCameraView = {isActive: bool};

type perspectiveCameraProjection = {
  near: float,
  //   far: option(float),
  far: float,
  fovy: float,
  //   aspect: option(float),
  aspect: float,
};

type transform = {
  translation: (float, float, float),
  rotation: (float, float, float, float),
  scale: (float, float, float),
};

type geometry = {
  //   name: string,
  position: positionIndex,
  normal: normalIndex,
  texCoord: texCoordIndex,
  index: indexIndex,
};

// type position = ArrayBuffer.t;

// type normal = ArrayBuffer.t;

// type texCoord = ArrayBuffer.t;

// type index = ArrayBuffer.t;

type bsdfMaterial = {
  diffuseColor: (float, float, float),
  specularColor: (float, float, float),
  specular: float,
  roughness: float,
  metalness: float,
  ior: float,
  transmission: float,
  diffuseMapImage: imageIndex,
  channelRoughnessMetallicMapImage: imageIndex,
  emissionMapImage: imageIndex,
  normalMapImage: imageIndex,
  transmissionMapImage: imageIndex,
  specularMapImage: imageIndex,
};

type data = {
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
  data,
  asset,
  scene,
  //   indices,
  gameObjectComponentIndexMap,
  gameObjects,
  directionLights: list(directionLight),
  basicCameraViews: list(basicCameraView),
  perspectiveCameraProjections: list(perspectiveCameraProjection),
  transforms: list(transform),
  geometrys: list(geometry),
  bsdfMaterials: list(bsdfMaterial),
};
