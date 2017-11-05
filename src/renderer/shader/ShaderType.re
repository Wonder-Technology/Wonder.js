/* type shader = int; */

type shaderData = {
  mutable index: int,
  /* mutable shaderIndexMap: Js.Dict.t (int), */
  mutable shaderLibNameMap: Js.Dict.t (string),
};