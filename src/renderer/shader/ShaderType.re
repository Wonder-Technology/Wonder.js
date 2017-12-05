type shader = int;

type glslData = {mutable precision: string};

type shaderData = {
  mutable index: int,
  mutable shaderIndexMap: Js.Dict.t(int),
  glslData: option(glslData)
};