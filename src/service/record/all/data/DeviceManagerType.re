open GlType;

type colorRgba = (float, float, float, float);

type side =
  | NONE
  | BOTH
  | FRONT
  | BACK;

type deviceManagerRecord = {
  gl: option(webgl1Context),
  colorWrite: option((bool, bool, bool, bool)),
  clearColor: option(colorRgba),
  side: option(side),
  depthTest: option(bool),
  viewport: option((float, float, float, float))
};