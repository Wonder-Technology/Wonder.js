open GlType;

type colorRgba = (float, float, float, float);

type deviceManagerData = {
  gl: option(webgl1Context),
  colorWrite: option((Js.boolean, Js.boolean, Js.boolean, Js.boolean)),
  clearColor: option(colorRgba),
  viewport: option((float, float, float, float))
};