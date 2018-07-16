/* TODO use SourceTextureType->type_ */
let getUnsignedByte = () => 0;

let getUnsignedShort565 = () => 1;

let getUnsignedShort4444 = () => 2;

let getUnsignedShort5551 = () => 3;

let getGlType = (gl, type_) =>
  if (type_ === getUnsignedByte()) {
    gl |> WonderWebgl.Gl.getUnsignedByte
  } else if (type_ === getUnsignedShort565()) {
    gl |> WonderWebgl.Gl.getUnsignedShort565
  } else if (type_ === getUnsignedShort4444()) {
    gl |> WonderWebgl.Gl.getUnsignedShort4444
  } else {
    gl |> WonderWebgl.Gl.getUnsignedShort5551
  };