type shader = int;

type glslData = {mutable precision: option(string)};

type shaderData = {
  mutable index: int,
  mutable shaderIndexMap: Js.Dict.t(int),
  glslData
};