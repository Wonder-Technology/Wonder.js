type bufferViewIndex = int;

type textureIndex = int;

type imageIndex = int;

type basicSourceTexture = {
  name: string,
  source: imageIndex,
  magFilter: int,
  minFilter: int,
  wrapS: int,
  wrapT: int,
  format: int,
  type_: int,
  flipY: bool,
};

type cubemapTexture = {
  name: string,
  magFilter: int,
  minFilter: int,
  wrapS: int,
  wrapT: int,
  flipY: bool,
  pxSource: imageIndex,
  nxSource: imageIndex,
  pySource: imageIndex,
  nySource: imageIndex,
  pzSource: imageIndex,
  nzSource: imageIndex,
  pxFormat: int,
  nxFormat: int,
  pyFormat: int,
  nyFormat: int,
  pzFormat: int,
  nzFormat: int,
  pxType: int,
  nxType: int,
  pyType: int,
  nyType: int,
  pzType: int,
  nzType: int,
};

type image = {
  name: string,
  bufferView: bufferViewIndex,
  mimeType: string,
};

type bufferView = {
  byteOffset: int,
  byteLength: int,
};

type basicMaterial = {
  name: string,
  color: array(float),
};

type lightMaterial = {
  name: string,
  diffuseColor: array(float),
  diffuseMap: option(textureIndex),
  shininess: float,
};

type scriptEventFunction = {
  name: string,
  eventFunctionDataStr: string,
};

type scriptAttribute = {
  name: string,
  attributeStr: string,
};

type geometryIndexData =
  | Index16
  | Index32;

type geometry = {
  name: string,
  indexDataType: geometryIndexData,
  vertexBufferView: bufferViewIndex,
  normalBufferView: bufferViewIndex,
  texCoordBufferView: bufferViewIndex,
  indexBufferView: bufferViewIndex,
};

type resourceAssetBundleContent = {
  basicSourceTextures: array(basicSourceTexture),
  cubemapTextures: array(cubemapTexture),
  images: array(image),
  basicMaterials: array(basicMaterial),
  lightMaterials: array(lightMaterial),
  geometrys: array(geometry),
  scriptEventFunctions: array(scriptEventFunction),
  scriptAttributes: array(scriptAttribute),
  bufferViews: array(bufferView),
};

type manifest = {
  hashId: string,
  dependencyRelation: array(AllABType.abRelativePath),
};

type materialComponent = int;

type geometryComponent = int;
/* type basicSourceTexture */

type imageData = {
  /* base64: option(string), */
  uint8Array: Js.Typed_array.Uint8Array.t,
  /* blobObjectURL: option(string), */
  name: string,
  mimeType: string,
};

type imageDataMap = WonderCommonlib.ImmutableSparseMapService.t(imageData);

type basicSourceTextureData = {
  textureComponent: int,
  imageDataIndex: int,
};

type cubemapTextureData = {
  textureComponent: int,
  pxImageDataIndex: int,
  nxImageDataIndex: int,
  pyImageDataIndex: int,
  nyImageDataIndex: int,
  pzImageDataIndex: int,
  nzImageDataIndex: int,
};

/* type materialNodeData = {
     type_: MaterialDataAssetType.materialType,
     materialComponent: int,
   }; */

type scriptEventFunctionData = {
  name: string,
  eventFunctionData: StateDataMainType.eventFunctionData,
};

type scriptAttributeData = {
  name: string,
  attribute: ScriptAttributeType.scriptAttribute,
};

type resourceData = {
  basicMaterials: array(materialComponent),
  lightMaterials: array(materialComponent),
  basicSourceTextures: array(basicSourceTextureData),
  cubemapTextures: array(cubemapTextureData),
  geometrys: array(geometryComponent),
  scriptEventFunctionDataArr: array(scriptEventFunctionData),
  scriptAttributeDataArr: array(scriptAttributeData),
  imageDataMap,
};