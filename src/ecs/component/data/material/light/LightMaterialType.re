open ComponentType;

open MaterialType;

type lightMaterialData = {
  mutable index: int,
  shaderIndexMap,
  diffuseColorMap: colorMap,
  specularColorMap: colorMap,
  shininessMap: array(float),
  gameObjectMap,
  groupCountMap,
  mutable disposedIndexArray
};