open ComponentType;

open MaterialType;

type lightMaterialRecord = {
  index: int,
  shaderIndexMap,
  diffuseColorMap: colorMap,
  specularColorMap: colorMap,
  shininessMap: array(float),
  gameObjectMap,
  groupCountMap,
  disposedIndexArray
};