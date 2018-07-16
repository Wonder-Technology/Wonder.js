open WonderWebgl.Gl;

open WonderWebgl.GlType;

let bindElementArrayBuffer =
  [@bs]
  (
    (gl, (size: int, pos: attributeLocation), buffer, renderState: StateRenderType.renderState) => {
      /* let {lastSendElementArrayBuffer} as record = state.glslSenderRecord; */
      /* switch lastSendElementArrayBuffer {
         | Some(lastSendElementArrayBuffer) when lastSendElementArrayBuffer === buffer => state
         | _ =>
           record.lastSendElementArrayBuffer = Some(buffer); */
      bindBuffer(getElementArrayBuffer(gl), buffer, gl);
      renderState
      /* } */
    }
  );