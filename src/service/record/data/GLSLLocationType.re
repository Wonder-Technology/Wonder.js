type attributeLocationMap = array(Js.Dict.t(int));

type uniformLocationMapOfShader = Js.Dict.t(GlType.uniformLocation);

type uniformLocationMap = array(uniformLocationMapOfShader);

type glslLocationRecord = {
  attributeLocationMap,
  uniformLocationMap
};