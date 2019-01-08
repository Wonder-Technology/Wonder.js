type shaderCacheMap = WonderCommonlib.HashMapService.t(array(float));

type uniformCacheMap = WonderCommonlib.SparseMapService.t(shaderCacheMap);

type vertexAttribHistoryArray = array(bool);