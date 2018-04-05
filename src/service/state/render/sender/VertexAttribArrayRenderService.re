open StateRenderType;

open Gl;

let disableVertexAttribArray = (gl, {glslSenderRecord} as state) => {
  glslSenderRecord.vertexAttribHistoryArray =
    VertexAttribArrayService.disableVertexAttribArray(
      gl,
      glslSenderRecord.vertexAttribHistoryArray
    );
  state
};