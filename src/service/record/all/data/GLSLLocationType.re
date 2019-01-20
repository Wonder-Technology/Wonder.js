type attributeLocationMap = WonderCommonlib.MutableSparseMapService.t(Js.Dict.t(int));

type uniformLocationMapOfShader = Js.Dict.t(WonderWebgl.GlType.uniformLocation);

type uniformLocationMap = WonderCommonlib.MutableSparseMapService.t(uniformLocationMapOfShader);

type glslLocationRecord = {
  attributeLocationMap,
  uniformLocationMap
};