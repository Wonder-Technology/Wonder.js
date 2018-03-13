type shader = int;

type shaderRecord = {
  mutable index: int,
  mutable shaderIndexMap: Js.Dict.t(int)
};