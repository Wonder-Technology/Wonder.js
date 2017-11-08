open Gl;

open GLSLSenderSendDataSystem;

let bindIndexBuffer = (gl, buffer, state: StateDataType.state) => {
  bindBuffer(getElementArrayBuffer(gl), buffer, gl);
  state
};

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