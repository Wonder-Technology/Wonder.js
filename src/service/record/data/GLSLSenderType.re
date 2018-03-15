open GlType;

type shaderCacheMap = WonderCommonlib.HashMapService.t(array(float));

type uniformCacheMap = array(shaderCacheMap);