open ComponentType;

type material = int;

type materialData = {
  mutable index: int,
  shaderIndexMap: array(int),
  colorMap: array((float, float, float)),
  gameObjectMap,
  groupCountMap: array(int),
  mutable disposedIndexArray: array(material)
};