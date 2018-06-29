open SourceTextureType;

let getGlFormat = (gl, format) =>
  switch (format) {
  | RGB => gl |> Gl.getRgb
  | RGBA => gl |> Gl.getRgba
  | ALPHA => gl |> Gl.getAlpha
  | LUMINANCE => gl |> Gl.getLuminance
  | LUMINANCEALPHA => gl |> Gl.getLuminanceAlpha
  | RGBS3TCDXT1 => gl |> Gl.getRgbS3tcDxt1
  | RGBAS3TCDXT1 => gl |> Gl.getRgbaS3tcDxt1
  | RGBAS3TCDXT3 => gl |> Gl.getRgbaS3tcDxt3
  | RGBAS3TCDXT5 => gl |> Gl.getRgbaS3tcDxt5
  };