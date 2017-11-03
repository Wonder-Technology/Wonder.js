open DomType;

open GlType;

[@bs.send]
external getWebgl1Context : (htmlElement, [@bs.as "webgl"] _, options) => webgl1Context =
  "getContext";

/* [@bs.send]  external clearColor : context::contextT => r::float => g::float => b::float => a::float => unit =
   "clearColor" ; */
[@bs.send.pipe : webgl1Context] external createProgram : program = "";

[@bs.send.pipe : webgl1Context] external linkProgram : program => unit = "";

[@bs.send.pipe : webgl1Context] external shaderSource : (shader, string) => unit = "";

[@bs.send.pipe : webgl1Context] external compileShader : shader => unit = "";

[@bs.send.pipe : webgl1Context]
external getShaderParameter : (webgl1Context, shader, int) => unit =
  "";

[@bs.send.pipe : webgl1Context] external createShader : int => shader = "";

[@bs.get] external getCompileStatus : webgl1Context => int = "COMPILE_STATUS";

[@bs.get] external getVertexShader : webgl1Context => int = "VERTEX_SHADER";

[@bs.get] external getFragmentShader : webgl1Context => int = "FRAGMENT_SHADER";

/* external linkStatus : context::contextT => int = "LINK_STATUS" [@@bs.get]; */
/* external validateStatus : context::contextT => int = "VALIDATE_STATUS" [@@bs.get];
   external shaderType : context::contextT => int = "SHADER_TYPE" [@@bs.get]; */
[@bs.send.pipe : webgl1Context] external getShaderParameter : (shader, int) => int = "";

[@bs.send.pipe : webgl1Context] external getShaderInfoLog : shader => string = "";

[@bs.send.pipe : webgl1Context] external attachShader : (program, shader) => unit = "";

[@bs.send.pipe : webgl1Context] external bindAttribLocation : (program, int, string) => unit = "";

[@bs.send.pipe : webgl1Context] external deleteShader : shader => unit = "";