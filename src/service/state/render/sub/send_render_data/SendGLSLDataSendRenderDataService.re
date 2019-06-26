open WonderWebgl.GlType;

open WonderWebgl.Gl;

open SubStateSendRenderDataType;

let sendBuffer =
  (.
    gl: webgl1Context,
    (size: int, pos: attributeLocation),
    buffer: buffer,
    {vertexAttribHistoryArray} as state,
  ) =>
    AllGLSLLocationService.isAttributeLocationExist(pos) ?
      {
        bindBuffer(getArrayBuffer(gl), buffer, gl);
        vertexAttribPointer(pos, size, getFloat(gl), false, 0, 0, gl);
        SendGLSLDataService.enableVertexAttribArray(
          gl,
          pos,
          vertexAttribHistoryArray,
        );

        ();
      } :
      ();