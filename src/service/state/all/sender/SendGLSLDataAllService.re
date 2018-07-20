open GlType;

open Gl;

open StateRenderType;

let sendBuffer =
  (.
    gl: webgl1Context,
    (size: int, pos: attributeLocation),
    buffer: buffer,
    {glslSenderRecord} as state,
  ) => {
    GLSLLocationService.isAttributeLocationExist(pos) ?
      {
        bindBuffer(getArrayBuffer(gl), buffer, gl);
        vertexAttribPointer(pos, size, getFloat(gl), false, 0, 0, gl);
        SendGLSLDataService.enableVertexAttribArray(
          gl,
          pos,
          glslSenderRecord.vertexAttribHistoryArray,
        );
      } :
      ();

    state;
  };