open DomType;

open GlType;

open Js.Typed_array;

external imageElementToTextureSource : imageElement => textureSource = "%identity";

[@bs.get] external getTextureWrapS : webgl1Context => int = "TEXTURE_WRAP_S";

[@bs.get] external getTextureWrapT : webgl1Context => int = "TEXTURE_WRAP_T";

[@bs.get] external getTextureMagFilter : webgl1Context => int = "TEXTURE_MAG_FILTER";

[@bs.get] external getTextureMinFilter : webgl1Context => int = "TEXTURE_MIN_FILTER";

[@bs.get] external getRepeat : webgl1Context => int = "REAPEAT";

[@bs.get] external getMirroredRepeat : webgl1Context => int = "MIRRORED_REPEAT";

[@bs.get] external getClampToEdge : webgl1Context => int = "CLAMP_TO_EDGE";

[@bs.get] external getNearest : webgl1Context => int = "NEAREST";

[@bs.get] external getNearestMipmapNearest : webgl1Context => int = "NEAREST_MIPMAP_NEAREST";

[@bs.get] external getNearestMipmapLinear : webgl1Context => int = "NEAREST_MIPMAP_LINEAR";

[@bs.get] external getLinear : webgl1Context => int = "LINEAR";

[@bs.get] external getLinearMipmapNearest : webgl1Context => int = "LINEAR_MIPMAP_NEAREST";

[@bs.get] external getLinearMipmapLinear : webgl1Context => int = "LINEAR_MIPMAP_LINEAR";

[@bs.get] external getRgb : webgl1Context => int = "RGB";

[@bs.get] external getRgba : webgl1Context => int = "RGBA";

[@bs.get] external getAlpha : webgl1Context => int = "ALPHA";

[@bs.get] external getLuminance : webgl1Context => int = "LUMINANCE";

[@bs.get] external getLuminanceAlpha : webgl1Context => int = "LUMINANCE_ALPHA";

[@bs.get] external getRgbS3tcDxt1 : webgl1Context => int = "RGB_S3TC_DXT1";

[@bs.get] external getRgbaS3tcDxt1 : webgl1Context => int = "RGBA_S3TC_DXT1";

[@bs.get] external getRgbaS3tcDxt3 : webgl1Context => int = "RGBA_S3TC_DXT3";

[@bs.get] external getRgbaS3tcDxt5 : webgl1Context => int = "RGBA_S3TC_DXT5";

[@bs.get] external getUnsignedByte : webgl1Context => int = "UNSIGNED_BYTE";

[@bs.get] external getUnsignedShort565 : webgl1Context => int = "UNSIGNED_SHORT_5_6_5";

[@bs.get] external getUnsignedShort4444 : webgl1Context => int = "UNSIGNED_SHORT_4_4_4_4";

[@bs.get] external getUnsignedShort5551 : webgl1Context => int = "UNSIGNED_SHORT_5_5_5_1";

[@bs.get] external getUnpackFlipYWebgl : webgl1Context => int = "UNPACK_FLIP_Y_WEBGL";

[@bs.get] external getMaxTextureImageUnits : webgl1Context => int = "MAX_TEXTURE_IMAGE_UNITS";

[@bs.get] external getTexture2D : webgl1Context => int = "TEXTURE_2D";

[@bs.get] external getTextureUnit0 : webgl1Context => int = "TEXTURE0";

/* [@bs.get] external getTextureUnit1 : webgl1Context => int = "TEXTURE1";

   [@bs.get] external getTextureUnit2 : webgl1Context => int = "TEXTURE2";

   [@bs.get] external getTextureUnit3 : webgl1Context => int = "TEXTURE3";

   [@bs.get] external getTextureUnit4 : webgl1Context => int = "TEXTURE4";

   [@bs.get] external getTextureUnit5 : webgl1Context => int = "TEXTURE5";

   [@bs.get] external getTextureUnit6 : webgl1Context => int = "TEXTURE6";

   [@bs.get] external getTextureUnit7 : webgl1Context => int = "TEXTURE7";

   [@bs.get] external getTextureUnit8 : webgl1Context => int = "TEXTURE8";

   [@bs.get] external getTextureUnit9 : webgl1Context => int = "TEXTURE9";

   [@bs.get] external getTextureUnit10 : webgl1Context => int = "TEXTURE10";

   [@bs.get] external getTextureUnit11 : webgl1Context => int = "TEXTURE11";

   [@bs.get] external getTextureUnit12 : webgl1Context => int = "TEXTURE12";

   [@bs.get] external getTextureUnit13 : webgl1Context => int = "TEXTURE13";

   [@bs.get] external getTextureUnit14 : webgl1Context => int = "TEXTURE14";

   [@bs.get] external getTextureUnit15 : webgl1Context => int = "TEXTURE15"; */
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

[@bs.get] external getDepthTest : webgl1Context => int = "DEPTH_TEST";

[@bs.get] external getCullFace : webgl1Context => int = "CULL_FACE";

[@bs.get] external getFrontAndBack : webgl1Context => int = "FRONT_AND_BACK";

[@bs.get] external getBack : webgl1Context => int = "BACK";

[@bs.get] external getFront : webgl1Context => int = "FRONT";

[@bs.send.pipe : webgl1Context] external enable : int => unit = "";

[@bs.send.pipe : webgl1Context] external disable : int => unit = "";

[@bs.send.pipe : webgl1Context] external cullFace : int => unit = "";

[@bs.send.pipe : webgl1Context] external pixelStorei : (int, Js.boolean) => unit = "";

[@bs.send] external commit : webgl1Context => unit = "";

[@bs.send]
external getWebgl1Context :
  ('canvas, [@bs.as "webgl"] _, ContextType.contextConfigJsObj) => webgl1Context =
  "getContext";

[@bs.send] external getVertexAttribArrayEnabled : int => int = "VERTEX_ATTRIB_ARRAY_ENABLED";

[@bs.send.pipe : webgl1Context] external getExtension : string => Js.nullable(extension) = "";

[@bs.send.pipe : webgl1Context] external getShaderPrecisionFormat : (int, int) => precisionFormat =
  "";

[@bs.send.pipe : webgl1Context] external getParameter : int => int = "";

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
external texImage2D : (int, int, int, int, int, textureSource) => unit =
  "";

[@bs.send.pipe : webgl1Context]
external texImage2DWithArrayBufferView :
  (int, int, int, int, int, int, int, int, Js.Typed_array.Uint8Array.t) => unit =
  "texImage2D";

[@bs.send.pipe : webgl1Context] external texParameteri : (int, int, int) => unit = "";

[@bs.send.pipe : webgl1Context] external createTexture : texture = "";

[@bs.send.pipe : webgl1Context] external activeTexture : int => unit = "";

[@bs.send.pipe : webgl1Context] external bindTexture : (int, texture) => unit = "";

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

[@bs.send.pipe : webgl1Context] external uniform1i : (uniformLocation, int) => unit = "";

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