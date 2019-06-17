open WonderWebgl.GlType;

type colorRgba = (float, float, float, float);

type side =
  | NONE
  | BOTH
  | FRONT
  | BACK;

type deviceManagerRecord = {
  gl: option(webgl1Context),
  colorWrite: option((bool, bool, bool, bool)),
  depthWrite: option(bool),
  clearColor: option(colorRgba),
  side: option(side),
  depthTest: option(bool),
  scissorTest: option(bool),
  scissor: option((int, int, int, int)),
  viewport: option((int, int, int, int)),
};