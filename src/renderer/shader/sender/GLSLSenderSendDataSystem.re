open StateDataType;

open GlType;

open Gl;

open GlslSenderStateUtils;

let getBufferSizeByType = (type_: string) =>
  switch type_ {
  /* | "vec2" => 2 */
  | "vec3" => 3
  | _ => ExceptionHandleSystem.throwMessage({j|invalide type_:$type_|j})
  };

/* todo optimize: judge last buffer(only when use vao?) */
let sendBuffer =
    [@bs] (gl, size: int, pos: attributeLocation, buffer: buffer, state: StateDataType.state) => {
  let {vertexAttribHistoryArray} as data = getGLSLSenderData(state);
  /* switch lastSendArrayBuffer {
     | Some(lastSendArrayBuffer) when lastSendArrayBuffer === buffer => state
     | _ =>
       data.lastSendArrayBuffer = Some(buffer); */
  bindBuffer(getArrayBuffer(gl), buffer, gl);
  vertexAttribPointer(pos, size, getFloat(gl), Js.false_, 0, 0, gl);
  WonderCommonlib.ArraySystem.isNotEqual(pos, true, vertexAttribHistoryArray) ?
    {
      enableVertexAttribArray(pos, gl);
      Array.unsafe_set(vertexAttribHistoryArray, pos, true);
      state
    } :
    state
  /* } */
};

let sendMatrix4 =
  [@bs]
  (
    (gl, pos: uniformLocation, data: Js.Typed_array.Float32Array.t) =>
      uniformMatrix4fv(pos, Js.false_, data, gl)
  );