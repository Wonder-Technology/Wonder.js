type nodeData = {
  gameObject: int,
  children: option(array(int)),
  translation: option(PositionType.position),
  rotation: option(RotationType.rotation),
  scale: option(ScaleType.scale),
  mesh: option(int),
  camera: option(int),
};

type attributes = {
  position: int,
  normal: int,
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

type point =
  | VERTEX
  | NORMAL
  | TEXCOORD
  | INDEX;

external positionTupleToArray : PositionType.position => array(float) =
  "%identity";

external rotationTupleToArray : RotationType.rotation => array(float) =
  "%identity";

external scaleTupleToArray : ScaleType.scale => array(float) = "%identity";