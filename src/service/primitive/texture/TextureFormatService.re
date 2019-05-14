open SourceTextureType;

let getFormatByMimeType = mimeType =>
  switch (mimeType) {
  | "image/png" => SourceTextureType.Rgba
  | "image/jpeg" => SourceTextureType.Rgb
  | mimeType =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getFormatByMimeType",
        ~description={j|unknown mimeType|j},
        ~reason="",
        ~solution={j||j},
        ~params={j|mimeType: $mimeType|j},
      ),
    )
  };

let getGlFormat = (gl, format) =>
  switch (format) {
  | Rgb => gl |> WonderWebgl.Gl.getRgb
  | Rgba => gl |> WonderWebgl.Gl.getRgba
  | Alpha => gl |> WonderWebgl.Gl.getAlpha
  | Luminance => gl |> WonderWebgl.Gl.getLuminance
  | LuminanceAlpha => gl |> WonderWebgl.Gl.getLuminanceAlpha
  | Rgbs3tcdxt1 => gl |> WonderWebgl.Gl.getRgbS3tcDxt1
  | Rgbas3tcdxt1 => gl |> WonderWebgl.Gl.getRgbaS3tcDxt1
  | Rgbas3tcdxt3 => gl |> WonderWebgl.Gl.getRgbaS3tcDxt3
  | Rgbas3tcdxt5 => gl |> WonderWebgl.Gl.getRgbaS3tcDxt5
  };