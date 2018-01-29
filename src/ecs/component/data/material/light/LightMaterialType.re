open ComponentType;

open MaterialType;

type lightMaterialData = {
  mutable index: int,
  shaderIndexMap,
  diffuseColorMap: colorMap,
  specularColorMap: colorMap,
  gameObjectMap,
  groupCountMap,
  mutable disposedIndexArray
};