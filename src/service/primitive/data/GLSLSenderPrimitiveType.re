type shaderCacheMap = WonderCommonlib.HashMapService.t(array(float));

type uniformCacheMap = WonderCommonlib.MutableSparseMapService.t(shaderCacheMap);

type vertexAttribHistoryArray = array(bool);