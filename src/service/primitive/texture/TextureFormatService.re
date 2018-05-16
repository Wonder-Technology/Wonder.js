let getRgb = () => 0;

let getRgba = () => 1;

let getAlpha = () => 2;

let getLuminance = () => 3;

let getLuminanceAlpha = () => 4;

let getRgbS3tcDxt1 = () => 5;

let getRgbaS3tcDxt1 = () => 5;

let getRgbaS3tcDxt3 = () => 5;

let getRgbaS3tcDxt5 = () => 5;

let getGlFormat = (gl, format) =>
  if (format === getRgb()) {
    gl |> Gl.getRgb
  } else if (format === getRgba()) {
    gl |> Gl.getRgba
  } else if (format === getAlpha()) {
    gl |> Gl.getAlpha
  } else if (format === getLuminance()) {
    gl |> Gl.getLuminance
  } else if (format === getLuminanceAlpha()) {
    gl |> Gl.getLuminanceAlpha
  } else if (format === getRgbS3tcDxt1()) {
    gl |> Gl.getRgbS3tcDxt1
  } else if (format === getRgbaS3tcDxt1()) {
    gl |> Gl.getRgbaS3tcDxt1
  } else if (format === getRgbaS3tcDxt3()) {
    gl |> Gl.getRgbaS3tcDxt3
  } else {
    gl |> Gl.getRgbaS3tcDxt5
  };