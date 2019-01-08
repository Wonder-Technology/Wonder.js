open WonderWebgl.Gl;

open WonderWebgl.GlType;

open SubStateSendRenderDataType;

let bindElementArrayBuffer =
  (.
    gl,
    (size: int, pos: attributeLocation),
    buffer,
    state: sendRenderDataSubState,
  ) => {
    /* let {lastSendElementArrayBuffer} as record = state.glslSenderRecord; */
    /* switch lastSendElementArrayBuffer {
       | Some(lastSendElementArrayBuffer) when lastSendElementArrayBuffer === buffer => state
       | _ =>
         record.lastSendElementArrayBuffer = Some(buffer); */
    bindBuffer(getElementArrayBuffer(gl), buffer, gl);
    state;
    /* } */
  };