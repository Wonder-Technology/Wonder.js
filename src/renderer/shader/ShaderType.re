type shader = int;

type shaderData = {
  mutable index: int,
  mutable shaderIndexMap: Js.Dict.t(int)
};