open GlType;

type deviceManagerData = {
  gl: option(webgl1Context),
  viewport: option((float, float, float, float))
};