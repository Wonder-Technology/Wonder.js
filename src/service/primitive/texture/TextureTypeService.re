/* TODO use SourceTextureType->type_ */
let getUnsignedByte = () => 0;

let getUnsignedShort565 = () => 1;

let getUnsignedShort4444 = () => 2;

let getUnsignedShort5551 = () => 3;

let getGlType = (gl, type_) =>
  if (type_ === getUnsignedByte()) {
    gl |> Gl.getUnsignedByte
  } else if (type_ === getUnsignedShort565()) {
    gl |> Gl.getUnsignedShort565
  } else if (type_ === getUnsignedShort4444()) {
    gl |> Gl.getUnsignedShort4444
  } else {
    gl |> Gl.getUnsignedShort5551
  };