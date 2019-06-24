type nodeExtras = {
  basicCameraView: option(int),
  meshRenderer: option(int),
  basicMaterial: option(int),
  lightMaterial: option(int),
  flyCameraController: option(int),
  arcballCameraController: option(int),
  script: option(int),
  isActive: option(bool),
  isRoot: option(bool),
};

type nodeKHRLightsExtension = {light: int};

type nodeExtensions = {khr_lights: option(nodeKHRLightsExtension)};

type nodeData = {
  gameObject: int,
  children: option(array(int)),
  translation: option(PositionType.position),
  rotation: option(RotationType.rotation),
  scale: option(ScaleType.scale),
  mesh: option(int),
  camera: option(int),
  extras: option(nodeExtras),
  extensions: option(nodeExtensions),
};

type attributes = {
  position: int,
  normal: option(int),
  texCoord_0: option(int),
};

type primitives = {
  attributes,
  indices: int,
  material: option(int),
};

type meshData = {
  primitives,
  name: option(string),
};

type bufferViewData = {
  buffer: int,
  byteOffset: int,
  byteLength: int,
};

type accessorData = {
  bufferView: int,
  componentType: int,
  count: int,
  type_: string,
};

type samplerData = {
  wrapS: int,
  wrapT: int,
  magFilter: int,
  minFilter: int,
};

type basicSourceTextureData = {
  name: option(string),
  sampler: int,
  source: int,
  format: int,
  type_: int,
  flipY: bool,
};

type cubemapTextureData = {
  name: option(string),
  sampler: int,
  pxSource: int,
  nxSource: int,
  pySource: int,
  nySource: int,
  pzSource: int,
  nzSource: int,
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
  flipY: bool,
};

type imageData = {
  name: option(string),
  bufferView: int,
  mimeType: string,
  uint8Array: Js.Typed_array.Uint8Array.t,
  byteOffset: int,
};

type meshRendererData = {
  drawMode: Js.Typed_array.Uint8Array.elt,
  isRender: bool,
};

type basicMaterialData = {
  colorFactor: option(array(float)),
  name: option(string),
};

type lightMaterialData = {
  baseColorFactor: option(array(float)),
  baseColorTexture: option(int),
  name: option(string),
};

type perspectiveCameraData = {
  near: float,
  far: option(float),
  fovy: float,
  aspect: option(float),
};

type arcballCameraControllerData = SceneGraphType.arcballCameraController;

type flyCameraControllerData = SceneGraphType.flyCameraController;

type cameraProjectionData = {
  type_: string,
  perspective: perspectiveCameraData,
};

type basicCameraViewData = {isActive: bool};

type lightData = {
  type_: string,
  color: option(array(float)),
  intensity: option(float),
  constantAttenuation: option(float),
  linearAttenuation: option(float),
  quadraticAttenuation: option(float),
  range: option(float),
};

type scriptData = {
  isActive: bool,
  eventFunctionDataMapStr: string,
  attributeMapStr: string,
};

/* type scriptData = CommonAssetType.script; */

type point =
  | Vertex
  | Normal
  | TexCoord
  | Index
  | Index32;

external positionTupleToArray: PositionType.position => array(float) =
  "%identity";

external rotationTupleToArray: RotationType.rotation => array(float) =
  "%identity";

external scaleTupleToArray: ScaleType.scale => array(float) = "%identity";

external targetTupleToArray: SceneGraphType.target => array(float) =
  "%identity";