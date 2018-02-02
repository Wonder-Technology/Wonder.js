open GlType;

type colorRgba = (float, float, float, float);

type side =
  | NONE
  | BOTH
  | FRONT
  | BACK;

type deviceManagerData = {
  gl: option(webgl1Context),
  colorWrite: option((Js.boolean, Js.boolean, Js.boolean, Js.boolean)),
  clearColor: option(colorRgba),
  side: option(side),
  viewport: option((float, float, float, float))
};