open DomType;

open GlType;

open Js.Typed_array;

[@bs.get] external getCompileStatus : webgl1Context => int = "COMPILE_STATUS";

[@bs.get] external getLinkStatus : webgl1Context => int = "LINK_STATUS";

[@bs.get] external getVertexShader : webgl1Context => int = "VERTEX_SHADER";

[@bs.get] external getFragmentShader : webgl1Context => int = "FRAGMENT_SHADER";

[@bs.get] external getHighFloat : webgl1Context => int = "HIGH_FLOAT";

[@bs.get] external getMediumFloat : webgl1Context => int = "MEDIUM_FLOAT";

[@bs.get] external getLowFloat : webgl1Context => int = "LOW_FLOAT";

[@bs.get] external getArrayBuffer : webgl1Context => int = "ARRAY_BUFFER";

[@bs.get] external getElementArrayBuffer : webgl1Context => int = "ELEMENT_ARRAY_BUFFER";

[@bs.get] external getFloat : webgl1Context => int = "FLOAT";

[@bs.get] external getStaticDraw : webgl1Context => int = "STATIC_DRAW";

[@bs.get] external getDynamicDraw : webgl1Context => int = "DYNAMIC_DRAW";

[@bs.get] external getTriangles : webgl1Context => int = "TRIANGLES";

[@bs.get] external getUnsignedInt : webgl1Context => int = "UNSIGNED_INT";

[@bs.get] external getUnsignedShort : webgl1Context => int = "UNSIGNED_SHORT";

[@bs.get] external getColorBufferBit : webgl1Context => int = "COLOR_BUFFER_BIT";

[@bs.get] external getDepthBufferBit : webgl1Context => int = "DEPTH_BUFFER_BIT";

[@bs.get] external getStencilBufferBit : webgl1Context => int = "STENCIL_BUFFER_BIT";

[@bs.get] external getCullFace : webgl1Context => int = "CULL_FACE";

[@bs.get] external getFrontAndBack : webgl1Context => int = "FRONT_AND_BACK";

[@bs.get] external getBack : webgl1Context => int = "BACK";

[@bs.get] external getFront : webgl1Context => int = "FRONT";

[@bs.send.pipe : webgl1Context] external enable : int => unit = "";

[@bs.send.pipe : webgl1Context] external disable : int => unit = "";

[@bs.send.pipe : webgl1Context] external cullFace : int => unit = "";

[@bs.send] external commit : webgl1Context => unit = "";

[@bs.send]
external getWebgl1Context :
  ('canvas, [@bs.as "webgl"] _, ContextType.contextConfigJsObj) => webgl1Context =
  "getContext";

[@bs.send] external getVertexAttribArrayEnabled : int => int = "VERTEX_ATTRIB_ARRAY_ENABLED";

[@bs.send.pipe : webgl1Context] external getExtension : string => Js.nullable(extension) = "";

[@bs.send.pipe : webgl1Context] external getShaderPrecisionFormat : (int, int) => precisionFormat =
  "";

/* [@bs.send]  external clearColor : context::contextT => r::float => g::float => b::float => a::float => unit =
   "clearColor" ; */
[@bs.send.pipe : webgl1Context] external createProgram : program = "";

[@bs.send.pipe : webgl1Context] external linkProgram : program => unit = "";

[@bs.send.pipe : webgl1Context] external shaderSource : (shader, string) => unit = "";

[@bs.send.pipe : webgl1Context] external compileShader : shader => unit = "";

[@bs.send.pipe : webgl1Context] external createShader : int => shader = "";

/* external linkStatus : context::contextT => int = "LINK_STATUS" [@@bs.get]; */
/* external validateStatus : context::contextT => int = "VALIDATE_STATUS" [@@bs.get];
   external shaderType : context::contextT => int = "SHADER_TYPE" [@@bs.get]; */
[@bs.send.pipe : webgl1Context] external getShaderParameter : (shader, int) => Js.boolean = "";

[@bs.send.pipe : webgl1Context] external getProgramParameter : (program, int) => Js.boolean = "";

[@bs.send.pipe : webgl1Context] external getShaderInfoLog : shader => string = "";

[@bs.send.pipe : webgl1Context] external getProgramInfoLog : program => string = "";

[@bs.send.pipe : webgl1Context] external attachShader : (program, shader) => unit = "";

[@bs.send.pipe : webgl1Context] external bindAttribLocation : (program, int, string) => unit = "";

[@bs.send.pipe : webgl1Context] external deleteShader : shader => unit = "";

[@bs.send.pipe : webgl1Context] external deleteBuffer : buffer => unit = "";

[@bs.send.pipe : webgl1Context]
external getAttribLocation : (program, string) => attributeLocation =
  "";

[@bs.send.pipe : webgl1Context]
external getUniformLocation : (program, string) => uniformLocation =
  "";

[@bs.send.pipe : webgl1Context] external bindBuffer : (int, buffer) => unit = "";

[@bs.send.pipe : webgl1Context] external resetBuffer : (int, Js.nullable(buffer)) => unit =
  "bindBuffer";

[@bs.send.pipe : webgl1Context] external createBuffer : buffer = "";

[@bs.send.pipe : webgl1Context] external bufferFloat32Data : (int, Float32Array.t, int) => unit =
  "bufferData";

[@bs.send.pipe : webgl1Context] external bufferFloat32DataWithCapacity : (int, int, int) => unit =
  "bufferData";

[@bs.send.pipe : webgl1Context] external bufferUint16Data : (int, Uint16Array.t, int) => unit =
  "bufferData";

[@bs.send.pipe : webgl1Context] external bufferUint32Data : (int, Uint32Array.t, int) => unit =
  "bufferData";

[@bs.send.pipe : webgl1Context]
external bufferSubFloat32Data : (int, int, Float32Array.t) => unit =
  "bufferSubData";

[@bs.send.pipe : webgl1Context]
external vertexAttribPointer : (attributeLocation, int, int, Js.boolean, int, int) => unit =
  "";

[@bs.send.pipe : webgl1Context] external enableVertexAttribArray : attributeLocation => unit = "";

[@bs.send.pipe : webgl1Context]
external uniformMatrix3fv : (uniformLocation, Js.boolean, Float32Array.t) => unit =
  "";

[@bs.send.pipe : webgl1Context]
external uniformMatrix4fv : (uniformLocation, Js.boolean, Float32Array.t) => unit =
  "";

[@bs.send.pipe : webgl1Context] external uniform1f : (uniformLocation, float) => unit = "";

[@bs.send.pipe : webgl1Context]
external uniform3f : (uniformLocation, float, float, float) => unit =
  "";

[@bs.send.pipe : webgl1Context] external drawElements : (int, int, int, int) => unit = "";

[@bs.send.pipe : webgl1Context] external drawArray : (int, int, int) => unit = "";

[@bs.send.pipe : webgl1Context] external viewport : (float, float, float, float) => unit = "";

[@bs.send.pipe : webgl1Context] external clearColor : (float, float, float, float) => unit = "";

[@bs.send.pipe : webgl1Context] external clear : int => unit = "";

[@bs.send.pipe : webgl1Context]
external colorMask : (Js.boolean, Js.boolean, Js.boolean, Js.boolean) => unit =
  "";

[@bs.send.pipe : webgl1Context] external useProgram : program => unit = "";

[@bs.send.pipe : webgl1Context] external disableVertexAttribArray : int => unit = "";