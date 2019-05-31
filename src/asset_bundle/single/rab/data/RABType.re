type bufferViewIndex = int;

type textureIndex = int;

type imageIndex = int;

type texture = {
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
  textures: array(texture),
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
/* type texture */

type imageData = {
  /* base64: option(string), */
  uint8Array: Js.Typed_array.Uint8Array.t,
  /* blobObjectURL: option(string), */
  name: string,
  mimeType: string,
};

type imageDataMap = WonderCommonlib.ImmutableSparseMapService.t(imageData);

type textureData = {
  textureComponent: int,
  imageDataIndex: int,
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
  textures: array(textureData),
  geometrys: array(geometryComponent),
  scriptEventFunctionDataArr: array(scriptEventFunctionData),
  scriptAttributeDataArr: array(scriptAttributeData),
  imageDataMap,
};