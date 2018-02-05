open ComponentType;

open MaterialType;

type lightMaterialData = {
  index: int,
  shaderIndexMap,
  diffuseColorMap: colorMap,
  specularColorMap: colorMap,
  shininessMap: array(float),
  gameObjectMap,
  groupCountMap,
  disposedIndexArray
};