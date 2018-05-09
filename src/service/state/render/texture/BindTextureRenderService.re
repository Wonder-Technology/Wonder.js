open StateRenderType;

let bind = (gl, unit, texture, {textureRecord} as state) => {
  let target = Gl.getTexture2D(gl);
  /* TODO requireCheck: unit <= max texture unit */
  gl |> Gl.activeTexture(Gl.getTextureUnit0(gl) + unit);
  gl
  |> Gl.bindTexture(
       target,
       OperateGlTextureMapService.unsafeGetTexture(texture, textureRecord.glTextureMap)
     );
  state
};