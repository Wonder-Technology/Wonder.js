open StateDataType;

open GlType;

open CacheType;

open Gl;

open GlslSenderStateUtils;

let getBufferSizeByType = (type_: string) =>
  switch type_ {
  | "vec2" => 2
  | "vec3" => 3
  | _ => ExceptionHandlerSystem.throwMessage({j|invalide type_:$type_|j})
  };

/* todo optimize: judge last buffer(only when use vao?) */
let sendBuffer = (gl, size: int, pos: int, buffer: buffer, state: StateDataType.state) => {
  let {vertexAttribHistoryArray, lastSendArrayBuffer} as data = getGLSLSenderData(state);
  switch lastSendArrayBuffer {
  | Some(lastSendArrayBuffer) when lastSendArrayBuffer === buffer => state
  | _ =>
    data.lastSendArrayBuffer = Some(buffer);
    bindBuffer(getArrayBuffer(gl), buffer, gl);
    vertexAttribPointer(pos, size, getFloat(gl), Js.false_, 0, 0, gl);
    ArraySystem.isNotEqual(pos, true, vertexAttribHistoryArray) ?
      {
        enableVertexAttribArray(pos, gl);
        Array.unsafe_set(vertexAttribHistoryArray, pos, true);
        state
      } :
      state
  }
};

let sendMatrix4 = (gl, pos: int, data: cache(Js.Array.t(float))) =>
  switch data {
  | Cache => ()
  | New(data) => uniformMatrix4fv(pos, Js.false_, data, gl)
  };