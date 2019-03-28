type attributeLocationMap =
  WonderCommonlib.MutableSparseMapService.t(
    WonderCommonlib.MutableHashMapService.t(int),
  );

type uniformLocationMapOfShader =
  WonderCommonlib.MutableHashMapService.t(WonderWebgl.GlType.uniformLocation);

type uniformLocationMap =
  WonderCommonlib.MutableSparseMapService.t(uniformLocationMapOfShader);

type glslLocationRecord = {
  attributeLocationMap,
  uniformLocationMap,
};