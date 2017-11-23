open StateDataType;

open Gl;

open GlType;

open GLSLSenderSendDataSystem;

open GlslSenderStateUtils;

let bindElementArrayBuffer =
  [@bs]
  (
    (gl, size: int, pos: attributeLocation, buffer, state: StateDataType.state) => {
      /* let {lastSendElementArrayBuffer} as data = getGLSLSenderData(state);
         switch lastSendElementArrayBuffer {
         | Some(lastSendElementArrayBuffer) when lastSendElementArrayBuffer === buffer => state
         | _ =>
           data.lastSendElementArrayBuffer = Some(buffer); */
      bindBuffer(getElementArrayBuffer(gl), buffer, gl);
      state
      /* } */
    }
  );

let drawElement = (drawMode: int, type_: int, typeSize: int, indicesCount: int, gl) => {
  let startOffset = 0;
  drawElements(drawMode, indicesCount, type_, typeSize * startOffset, gl);
  ()
};

let drawArray = (drawMode: int, verticesCount: int, gl) => {
  let startOffset = 0;
  drawArray(drawMode, startOffset, verticesCount, gl);
  ()
};