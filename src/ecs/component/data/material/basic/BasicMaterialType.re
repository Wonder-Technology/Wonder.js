open ComponentType;

open MaterialType;

type basicMaterialData = {
  mutable index: int,
  shaderIndexMap,
  colorMap,
  gameObjectMap,
  groupCountMap,
  mutable disposedIndexArray
};