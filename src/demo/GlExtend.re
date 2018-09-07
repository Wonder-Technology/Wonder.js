/* TODO move to WonderWebgl */

open DomExtendType;

open GlType;

open WonderWebgl.GlType;

[@bs.send.pipe: webgl1Context] external createFramebuffer : framebuffer = "";

[@bs.send.pipe: webgl1Context] external createRenderbuffer : renderbuffer = "";

[@bs.send.pipe: webgl1Context]
external bindRenderbuffer : (int, renderbuffer) => unit = "";

[@bs.send.pipe: webgl1Context]
external bindFramebuffer : (int, framebuffer) => unit = "";

[@bs.send.pipe: webgl1Context]
external framebufferTexture2D : (int, int, int, texture, int) => unit = "";

[@bs.send.pipe: webgl1Context]
external framebufferRenderbuffer : (int, int, int, renderbuffer) => unit = "";

[@bs.send.pipe: webgl1Context]
external renderbufferStorage : (int, int, int, int) => unit = "";

[@bs.get] external getFrameBuffer : webgl1Context => int = "FRAMEBUFFER";

[@bs.get] external getRenderBuffer : webgl1Context => int = "RENDERBUFFER";

[@bs.get]
external getDepthComponent16 : webgl1Context => int = "DEPTH_COMPONENT16";

[@bs.get]
external getColorAttachment0 : webgl1Context => int = "COLOR_ATTACHMENT0";

[@bs.get]
external getDepthAttachment : webgl1Context => int = "DEPTH_ATTACHMENT";

[@bs.get]
external getFramebufferComplete : webgl1Context => int =
  "FRAMEBUFFER_COMPLETE";

[@bs.send.pipe: webgl1Context]
external checkFramebufferStatus : int => int = "";

[@bs.send.pipe: webgl1Context]
external texImage2DWithNull :
  (int, int, int, int, int, int, int, int, Js.Nullable.t(textureSource)) =>
  unit =
  "texImage2D";

[@bs.send.pipe: webgl1Context]
external readUnsignedBytePixels :
  (int, int, int, int, int, int, Js.Typed_array.Uint8Array.t) => unit =
  "readPixels";

[@bs.send.pipe: webgl1Context]
external scissor : (int, int, int, int) => unit = "";

[@bs.get] external getScissorTest : webgl1Context => int = "SCISSOR_TEST";

let getFramebufferStatus = [%bs.raw
  status => {|
return status.toString();
    |}
];