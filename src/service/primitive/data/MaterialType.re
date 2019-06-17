type material = int;

type shaderIndexMap = WonderCommonlib.MutableSparseMapService.t(int);

type colorMap = WonderCommonlib.MutableSparseMapService.t(array(float));

type disposedIndexArray = array(int);

type materialType =
  | BasicMaterial
  | LightMaterial;