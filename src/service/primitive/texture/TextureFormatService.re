open SourceTextureType;

let getGlFormat = (gl, format) =>
  switch (format) {
  | RGB => gl |> WonderWebgl.Gl.getRgb
  | RGBA => gl |> WonderWebgl.Gl.getRgba
  | ALPHA => gl |> WonderWebgl.Gl.getAlpha
  | LUMINANCE => gl |> WonderWebgl.Gl.getLuminance
  | LUMINANCEALPHA => gl |> WonderWebgl.Gl.getLuminanceAlpha
  | RGBS3TCDXT1 => gl |> WonderWebgl.Gl.getRgbS3tcDxt1
  | RGBAS3TCDXT1 => gl |> WonderWebgl.Gl.getRgbaS3tcDxt1
  | RGBAS3TCDXT3 => gl |> WonderWebgl.Gl.getRgbaS3tcDxt3
  | RGBAS3TCDXT5 => gl |> WonderWebgl.Gl.getRgbaS3tcDxt5
  };