open GlType;

open Gl;

open StateRenderType;

let sendBuffer =
  [@bs]
  (
    (
      gl: webgl1Context,
      (size: int, pos: attributeLocation),
      buffer: buffer,
      {glslSenderRecord} as state
    ) => {
      bindBuffer(getArrayBuffer(gl), buffer, gl);
      vertexAttribPointer(pos, size, getFloat(gl), false, 0, 0, gl);
      SendGLSLDataService.enableVertexAttribArray(
        gl,
        pos,
        glslSenderRecord.vertexAttribHistoryArray
      );
      state
    }
  );