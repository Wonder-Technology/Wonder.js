'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var AllDeviceManagerService$Wonderjs = require("../../../src/service/record/all/device/AllDeviceManagerService.js");

function buildFakeGl(sandbox, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, $staropt$star$13, $staropt$star$14, $staropt$star$15, $staropt$star$16, $staropt$star$17, $staropt$star$18, $staropt$star$19, $staropt$star$20, $staropt$star$21, $staropt$star$22, $staropt$star$23, $staropt$star$24, $staropt$star$25, $staropt$star$26, $staropt$star$27, $staropt$star$28, $staropt$star$29, $staropt$star$30, $staropt$star$31, $staropt$star$32, $staropt$star$33, $staropt$star$34, $staropt$star$35, $staropt$star$36, $staropt$star$37, $staropt$star$38, $staropt$star$39, $staropt$star$40, $staropt$star$41, $staropt$star$42, $staropt$star$43, $staropt$star$44, $staropt$star$45, $staropt$star$46, $staropt$star$47, $staropt$star$48, $staropt$star$49, $staropt$star$50, $staropt$star$51, $staropt$star$52, $staropt$star$53, $staropt$star$54, $staropt$star$55, $staropt$star$56, $staropt$star$57, $staropt$star$58, $staropt$star$59, $staropt$star$60, $staropt$star$61, $staropt$star$62, $staropt$star$63, $staropt$star$64, $staropt$star$65, $staropt$star$66, $staropt$star$67, $staropt$star$68, $staropt$star$69, $staropt$star$70, $staropt$star$71, $staropt$star$72, $staropt$star$73, $staropt$star$74, $staropt$star$75, $staropt$star$76, $staropt$star$77, $staropt$star$78, $staropt$star$79, $staropt$star$80, $staropt$star$81, $staropt$star$82, $staropt$star$83, $staropt$star$84, $staropt$star$85, $staropt$star$86, $staropt$star$87, $staropt$star$88, $staropt$star$89, $staropt$star$90, $staropt$star$91, $staropt$star$92, $staropt$star$93, $staropt$star$94, $staropt$star$95, $staropt$star$96, $staropt$star$97, $staropt$star$98, $staropt$star$99, $staropt$star$100, $staropt$star$101, $staropt$star$102, $staropt$star$103, $staropt$star$104, $staropt$star$105, $staropt$star$106, $staropt$star$107, $staropt$star$108, $staropt$star$109, $staropt$star$110, $staropt$star$111, $staropt$star$112, $staropt$star$113, $staropt$star$114, $staropt$star$115, $staropt$star$116, $staropt$star$117, $staropt$star$118, $staropt$star$119, $staropt$star$120, $staropt$star$121, $staropt$star$122, $staropt$star$123, $staropt$star$124, $staropt$star$125, $staropt$star$126, $staropt$star$127, $staropt$star$128, $staropt$star$129, $staropt$star$130, $staropt$star$131, $staropt$star$132, $staropt$star$133, $staropt$star$134, param) {
  var textureWrapS = $staropt$star !== undefined ? $staropt$star : -1;
  var textureWrapT = $staropt$star$1 !== undefined ? $staropt$star$1 : -1;
  var textureMagFilter = $staropt$star$2 !== undefined ? $staropt$star$2 : -1;
  var textureMinFilter = $staropt$star$3 !== undefined ? $staropt$star$3 : -1;
  var repeat = $staropt$star$4 !== undefined ? $staropt$star$4 : -1;
  var mirroredRepeat = $staropt$star$5 !== undefined ? $staropt$star$5 : -1;
  var clampToEdge = $staropt$star$6 !== undefined ? $staropt$star$6 : -1;
  var nearest = $staropt$star$7 !== undefined ? $staropt$star$7 : -1;
  var nearestMipmapNearest = $staropt$star$8 !== undefined ? $staropt$star$8 : -1;
  var nearestMipmapLinear = $staropt$star$9 !== undefined ? $staropt$star$9 : -1;
  var linear = $staropt$star$10 !== undefined ? $staropt$star$10 : -1;
  var linearMipmapNearest = $staropt$star$11 !== undefined ? $staropt$star$11 : -1;
  var linearMipmapLinear = $staropt$star$12 !== undefined ? $staropt$star$12 : -1;
  var rgb = $staropt$star$13 !== undefined ? $staropt$star$13 : -1;
  var rgba = $staropt$star$14 !== undefined ? $staropt$star$14 : -1;
  var alpha = $staropt$star$15 !== undefined ? $staropt$star$15 : -1;
  var luminance = $staropt$star$16 !== undefined ? $staropt$star$16 : -1;
  var luminanceAlpha = $staropt$star$17 !== undefined ? $staropt$star$17 : -1;
  var rgbS3tcDxt1 = $staropt$star$18 !== undefined ? $staropt$star$18 : -1;
  var rgbaS3tcDxt1 = $staropt$star$19 !== undefined ? $staropt$star$19 : -1;
  var rgbaS3tcDxt3 = $staropt$star$20 !== undefined ? $staropt$star$20 : -1;
  var rgbaS3tcDxt5 = $staropt$star$21 !== undefined ? $staropt$star$21 : -1;
  var unsignedByte = $staropt$star$22 !== undefined ? $staropt$star$22 : -1;
  var unsignedShort565 = $staropt$star$23 !== undefined ? $staropt$star$23 : -1;
  var unsignedShort4444 = $staropt$star$24 !== undefined ? $staropt$star$24 : -1;
  var unsignedShort5551 = $staropt$star$25 !== undefined ? $staropt$star$25 : -1;
  var unpackFlipYWebgl = $staropt$star$26 !== undefined ? $staropt$star$26 : -1;
  var maxTextureImageUnits = $staropt$star$27 !== undefined ? $staropt$star$27 : -1;
  var texture2D = $staropt$star$28 !== undefined ? $staropt$star$28 : -1;
  var textureCubemap = $staropt$star$29 !== undefined ? $staropt$star$29 : -1;
  var textureCubemapPositiveX = $staropt$star$30 !== undefined ? $staropt$star$30 : 1;
  var textureCubemapNegativeX = $staropt$star$31 !== undefined ? $staropt$star$31 : 2;
  var textureCubemapPositiveY = $staropt$star$32 !== undefined ? $staropt$star$32 : 3;
  var textureCubemapNegativeY = $staropt$star$33 !== undefined ? $staropt$star$33 : 4;
  var textureCubemapPositiveZ = $staropt$star$34 !== undefined ? $staropt$star$34 : 5;
  var textureCubemapNegativeZ = $staropt$star$35 !== undefined ? $staropt$star$35 : 6;
  var textureUnit0 = $staropt$star$36 !== undefined ? $staropt$star$36 : -1;
  var compile_status = $staropt$star$37 !== undefined ? $staropt$star$37 : -1;
  var link_status = $staropt$star$38 !== undefined ? $staropt$star$38 : -1;
  var vertex_shader = $staropt$star$39 !== undefined ? $staropt$star$39 : -1;
  var fragment_shader = $staropt$star$40 !== undefined ? $staropt$star$40 : -1;
  var array_buffer = $staropt$star$41 !== undefined ? $staropt$star$41 : -1;
  var element_array_buffer = $staropt$star$42 !== undefined ? $staropt$star$42 : -1;
  var $$float = $staropt$star$43 !== undefined ? $staropt$star$43 : -1;
  var none = $staropt$star$44 !== undefined ? $staropt$star$44 : -1;
  var static_draw = $staropt$star$45 !== undefined ? $staropt$star$45 : -1;
  var dynamic_draw = $staropt$star$46 !== undefined ? $staropt$star$46 : -1;
  var points = $staropt$star$47 !== undefined ? $staropt$star$47 : -1;
  var lines = $staropt$star$48 !== undefined ? $staropt$star$48 : -1;
  var triangles = $staropt$star$49 !== undefined ? $staropt$star$49 : -1;
  var unsigned_short = $staropt$star$50 !== undefined ? $staropt$star$50 : -1;
  var unsigned_int = $staropt$star$51 !== undefined ? $staropt$star$51 : -1;
  var color_buffer_bit = $staropt$star$52 !== undefined ? $staropt$star$52 : -1;
  var depth_buffer_bit = $staropt$star$53 !== undefined ? $staropt$star$53 : -1;
  var stencil_buffer_bit = $staropt$star$54 !== undefined ? $staropt$star$54 : -1;
  var back = $staropt$star$55 !== undefined ? $staropt$star$55 : -1;
  var front = $staropt$star$56 !== undefined ? $staropt$star$56 : -2;
  var frontAndBack = $staropt$star$57 !== undefined ? $staropt$star$57 : -2;
  var always = $staropt$star$58 !== undefined ? $staropt$star$58 : -1;
  var never = $staropt$star$59 !== undefined ? $staropt$star$59 : -2;
  var less = $staropt$star$60 !== undefined ? $staropt$star$60 : -3;
  var equal = $staropt$star$61 !== undefined ? $staropt$star$61 : -4;
  var lEqual = $staropt$star$62 !== undefined ? $staropt$star$62 : -5;
  var greater = $staropt$star$63 !== undefined ? $staropt$star$63 : -6;
  var notEqual = $staropt$star$64 !== undefined ? $staropt$star$64 : -7;
  var gEqual = $staropt$star$65 !== undefined ? $staropt$star$65 : -8;
  var keep = $staropt$star$66 !== undefined ? $staropt$star$66 : -1;
  var zero = $staropt$star$67 !== undefined ? $staropt$star$67 : -2;
  var replace = $staropt$star$68 !== undefined ? $staropt$star$68 : -3;
  var incr = $staropt$star$69 !== undefined ? $staropt$star$69 : -4;
  var incrWrap = $staropt$star$70 !== undefined ? $staropt$star$70 : -5;
  var decr = $staropt$star$71 !== undefined ? $staropt$star$71 : -6;
  var decrWrap = $staropt$star$72 !== undefined ? $staropt$star$72 : -7;
  var invert = $staropt$star$73 !== undefined ? $staropt$star$73 : -8;
  var getCullFace = $staropt$star$74 !== undefined ? $staropt$star$74 : -3;
  var getDepthTest = $staropt$star$75 !== undefined ? $staropt$star$75 : -4;
  var getScissorTest = $staropt$star$76 !== undefined ? $staropt$star$76 : -5;
  var getStencilTest = $staropt$star$77 !== undefined ? $staropt$star$77 : -6;
  var unpackColorspaceConversionWebgl = $staropt$star$78 !== undefined ? $staropt$star$78 : -1;
  var pixelStorei = $staropt$star$79 !== undefined ? Caml_option.valFromOption($staropt$star$79) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var texImage2D = $staropt$star$80 !== undefined ? Caml_option.valFromOption($staropt$star$80) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var texParameteri = $staropt$star$81 !== undefined ? Caml_option.valFromOption($staropt$star$81) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var getParameter = $staropt$star$82 !== undefined ? Caml_option.valFromOption($staropt$star$82) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var createTexture = $staropt$star$83 !== undefined ? Caml_option.valFromOption($staropt$star$83) : Sinon.returns(99, Curry._1(Sinon.createEmptyStub, sandbox[0]));
  var activeTexture = $staropt$star$84 !== undefined ? Caml_option.valFromOption($staropt$star$84) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var bindTexture = $staropt$star$85 !== undefined ? Caml_option.valFromOption($staropt$star$85) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var generateMipmap = $staropt$star$86 !== undefined ? Caml_option.valFromOption($staropt$star$86) : Sinon.returns(100, Curry._1(Sinon.createEmptyStub, sandbox[0]));
  var shaderSource = $staropt$star$87 !== undefined ? Caml_option.valFromOption($staropt$star$87) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var enable = $staropt$star$88 !== undefined ? Caml_option.valFromOption($staropt$star$88) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var disable = $staropt$star$89 !== undefined ? Caml_option.valFromOption($staropt$star$89) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var cullFace = $staropt$star$90 !== undefined ? Caml_option.valFromOption($staropt$star$90) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var createProgram = $staropt$star$91 !== undefined ? Caml_option.valFromOption($staropt$star$91) : Sinon.returns(100, Curry._1(Sinon.createEmptyStub, sandbox[0]));
  var createShader = $staropt$star$92 !== undefined ? Caml_option.valFromOption($staropt$star$92) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var compileShader = $staropt$star$93 !== undefined ? Caml_option.valFromOption($staropt$star$93) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var getVertexAttribArrayEnabled = $staropt$star$94 !== undefined ? Caml_option.valFromOption($staropt$star$94) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var linkProgram = $staropt$star$95 !== undefined ? Caml_option.valFromOption($staropt$star$95) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var getShaderParameter = $staropt$star$96 !== undefined ? Caml_option.valFromOption($staropt$star$96) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var getProgramParameter = $staropt$star$97 !== undefined ? Caml_option.valFromOption($staropt$star$97) : Sinon.returns(true, Curry._1(Sinon.createEmptyStub, sandbox[0]));
  var getShaderInfoLog = $staropt$star$98 !== undefined ? Caml_option.valFromOption($staropt$star$98) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var getProgramInfoLog = $staropt$star$99 !== undefined ? Caml_option.valFromOption($staropt$star$99) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var getShaderPrecisionFormat = $staropt$star$100 !== undefined ? Caml_option.valFromOption($staropt$star$100) : Sinon.returns({
          precision: 1
        }, Curry._1(Sinon.createEmptyStub, sandbox[0]));
  var getExtension = $staropt$star$101 !== undefined ? Caml_option.valFromOption($staropt$star$101) : Sinon.returns(0, Curry._1(Sinon.createEmptyStub, sandbox[0]));
  var attachShader = $staropt$star$102 !== undefined ? Caml_option.valFromOption($staropt$star$102) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var bindAttribLocation = $staropt$star$103 !== undefined ? Caml_option.valFromOption($staropt$star$103) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var deleteTexture = $staropt$star$104 !== undefined ? Caml_option.valFromOption($staropt$star$104) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var deleteShader = $staropt$star$105 !== undefined ? Caml_option.valFromOption($staropt$star$105) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var deleteBuffer = $staropt$star$106 !== undefined ? Caml_option.valFromOption($staropt$star$106) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var getAttribLocation = $staropt$star$107 !== undefined ? Caml_option.valFromOption($staropt$star$107) : Sinon.returns(0, Curry._1(Sinon.createEmptyStub, sandbox[0]));
  var getUniformLocation = $staropt$star$108 !== undefined ? Caml_option.valFromOption($staropt$star$108) : Sinon.returns(0, Curry._1(Sinon.createEmptyStub, sandbox[0]));
  var bindBuffer = $staropt$star$109 !== undefined ? Caml_option.valFromOption($staropt$star$109) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var resetBuffer = $staropt$star$110 !== undefined ? Caml_option.valFromOption($staropt$star$110) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var createBuffer = $staropt$star$111 !== undefined ? Caml_option.valFromOption($staropt$star$111) : Sinon.returns(0, Curry._1(Sinon.createEmptyStub, sandbox[0]));
  var bufferData = $staropt$star$112 !== undefined ? Caml_option.valFromOption($staropt$star$112) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var bufferSubData = $staropt$star$113 !== undefined ? Caml_option.valFromOption($staropt$star$113) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var vertexAttribPointer = $staropt$star$114 !== undefined ? Caml_option.valFromOption($staropt$star$114) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var enableVertexAttribArray = $staropt$star$115 !== undefined ? Caml_option.valFromOption($staropt$star$115) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var uniformMatrix3fv = $staropt$star$116 !== undefined ? Caml_option.valFromOption($staropt$star$116) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var uniformMatrix4fv = $staropt$star$117 !== undefined ? Caml_option.valFromOption($staropt$star$117) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var uniform1i = $staropt$star$118 !== undefined ? Caml_option.valFromOption($staropt$star$118) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var uniform1f = $staropt$star$119 !== undefined ? Caml_option.valFromOption($staropt$star$119) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var uniform3f = $staropt$star$120 !== undefined ? Caml_option.valFromOption($staropt$star$120) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var drawElements = $staropt$star$121 !== undefined ? Caml_option.valFromOption($staropt$star$121) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var drawArray = $staropt$star$122 !== undefined ? Caml_option.valFromOption($staropt$star$122) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var viewport = $staropt$star$123 !== undefined ? Caml_option.valFromOption($staropt$star$123) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var scissor = $staropt$star$124 !== undefined ? Caml_option.valFromOption($staropt$star$124) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var clearColor = $staropt$star$125 !== undefined ? Caml_option.valFromOption($staropt$star$125) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var clear = $staropt$star$126 !== undefined ? Caml_option.valFromOption($staropt$star$126) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var colorMask = $staropt$star$127 !== undefined ? Caml_option.valFromOption($staropt$star$127) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var depthMask = $staropt$star$128 !== undefined ? Caml_option.valFromOption($staropt$star$128) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var depthFunc = $staropt$star$129 !== undefined ? Caml_option.valFromOption($staropt$star$129) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var stencilMask = $staropt$star$130 !== undefined ? Caml_option.valFromOption($staropt$star$130) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var stencilFunc = $staropt$star$131 !== undefined ? Caml_option.valFromOption($staropt$star$131) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var stencilOp = $staropt$star$132 !== undefined ? Caml_option.valFromOption($staropt$star$132) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var useProgram = $staropt$star$133 !== undefined ? Caml_option.valFromOption($staropt$star$133) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  var disableVertexAttribArray = $staropt$star$134 !== undefined ? Caml_option.valFromOption($staropt$star$134) : Curry._1(Sinon.createEmptyStub, sandbox[0]);
  return {
          TEXTURE_WRAP_S: textureWrapS,
          TEXTURE_WRAP_T: textureWrapT,
          TEXTURE_MAG_FILTER: textureMagFilter,
          TEXTURE_MIN_FILTER: textureMinFilter,
          REPEAT: repeat,
          MIRRORED_REPEAT: mirroredRepeat,
          CLAMP_TO_EDGE: clampToEdge,
          NEAREST: nearest,
          NEAREST_MIPMAP_NEAREST: nearestMipmapNearest,
          NEAREST_MIPMAP_LINEAR: nearestMipmapLinear,
          LINEAR: linear,
          LINEAR_MIPMAP_NEAREST: linearMipmapNearest,
          LINEAR_MIPMAP_LINEAR: linearMipmapLinear,
          RGB: rgb,
          RGBA: rgba,
          ALPHA: alpha,
          LUMINANCE: luminance,
          LUMINANCE_ALPHA: luminanceAlpha,
          RGB_S3TC_DXT1: rgbS3tcDxt1,
          RGBA_S3TC_DXT1: rgbaS3tcDxt1,
          RGBA_S3TC_DXT3: rgbaS3tcDxt3,
          RGBA_S3TC_DXT5: rgbaS3tcDxt5,
          UNSIGNED_BYTE: unsignedByte,
          UNSIGNED_SHORT_5_6_5: unsignedShort565,
          UNSIGNED_SHORT_4_4_4_4: unsignedShort4444,
          UNSIGNED_SHORT_5_5_5_1: unsignedShort5551,
          UNPACK_FLIP_Y_WEBGL: unpackFlipYWebgl,
          MAX_TEXTURE_IMAGE_UNITS: maxTextureImageUnits,
          TEXTURE_2D: texture2D,
          TEXTURE_CUBE_MAP: textureCubemap,
          TEXTURE_CUBE_MAP_POSITIVE_X: textureCubemapPositiveX,
          TEXTURE_CUBE_MAP_NEGATIVE_X: textureCubemapNegativeX,
          TEXTURE_CUBE_MAP_POSITIVE_Y: textureCubemapPositiveY,
          TEXTURE_CUBE_MAP_NEGATIVE_Y: textureCubemapNegativeY,
          TEXTURE_CUBE_MAP_POSITIVE_Z: textureCubemapPositiveZ,
          TEXTURE_CUBE_MAP_NEGATIVE_Z: textureCubemapNegativeZ,
          TEXTURE0: textureUnit0,
          COMPILE_STATUS: compile_status,
          LINK_STATUS: link_status,
          VERTEX_SHADER: vertex_shader,
          FRAGMENT_SHADER: fragment_shader,
          ARRAY_BUFFER: array_buffer,
          ELEMENT_ARRAY_BUFFER: element_array_buffer,
          FLOAT: $$float,
          STATIC_DRAW: static_draw,
          DYNAMIC_DRAW: dynamic_draw,
          POINTS: points,
          LINES: lines,
          TRIANGLES: triangles,
          UNSIGNED_INT: unsigned_int,
          UNSIGNED_SHORT: unsigned_short,
          COLOR_BUFFER_BIT: color_buffer_bit,
          DEPTH_BUFFER_BIT: depth_buffer_bit,
          STENCIL_BUFFER_BIT: stencil_buffer_bit,
          NONE: none,
          UNPACK_COLORSPACE_CONVERSION_WEBGL: unpackColorspaceConversionWebgl,
          pixelStorei: pixelStorei,
          texImage2D: texImage2D,
          texParameteri: texParameteri,
          getParameter: getParameter,
          createTexture: createTexture,
          activeTexture: activeTexture,
          bindTexture: bindTexture,
          generateMipmap: generateMipmap,
          VERTEX_ATTRIB_ARRAY_ENABLED: getVertexAttribArrayEnabled,
          BACK: back,
          FRONT: front,
          FRONT_AND_BACK: frontAndBack,
          ALWAYS: always,
          NEVER: never,
          LESS: less,
          EQUAL: equal,
          LEQUAL: lEqual,
          GREATER: greater,
          NOTEQUAL: notEqual,
          GEQUAL: gEqual,
          KEEP: keep,
          ZERO: zero,
          REPLACE: replace,
          INCR: incr,
          INCR_WRAP: incrWrap,
          DECR: decr,
          DECR_WRAP: decrWrap,
          INVERT: invert,
          DEPTH_TEST: getDepthTest,
          SCISSOR_TEST: getScissorTest,
          STENCIL_TEST: getStencilTest,
          CULL_FACE: getCullFace,
          cullFace: cullFace,
          enable: enable,
          disable: disable,
          linkProgram: linkProgram,
          getShaderParameter: getShaderParameter,
          getProgramParameter: getProgramParameter,
          getShaderInfoLog: getShaderInfoLog,
          getProgramInfoLog: getProgramInfoLog,
          getShaderPrecisionFormat: getShaderPrecisionFormat,
          getExtension: getExtension,
          attachShader: attachShader,
          bindAttribLocation: bindAttribLocation,
          deleteTexture: deleteTexture,
          deleteShader: deleteShader,
          deleteBuffer: deleteBuffer,
          getAttribLocation: getAttribLocation,
          getUniformLocation: getUniformLocation,
          bindBuffer: bindBuffer,
          resetBuffer: resetBuffer,
          createBuffer: createBuffer,
          bufferData: bufferData,
          bufferSubData: bufferSubData,
          vertexAttribPointer: vertexAttribPointer,
          enableVertexAttribArray: enableVertexAttribArray,
          uniformMatrix3fv: uniformMatrix3fv,
          uniformMatrix4fv: uniformMatrix4fv,
          uniform1i: uniform1i,
          uniform1f: uniform1f,
          uniform3f: uniform3f,
          drawElements: drawElements,
          drawArray: drawArray,
          viewport: viewport,
          scissor: scissor,
          clearColor: clearColor,
          clear: clear,
          colorMask: colorMask,
          depthMask: depthMask,
          depthFunc: depthFunc,
          stencilMask: stencilMask,
          stencilFunc: stencilFunc,
          stencilOp: stencilOp,
          useProgram: useProgram,
          disableVertexAttribArray: disableVertexAttribArray,
          shaderSource: shaderSource,
          createProgram: createProgram,
          createShader: createShader,
          compileShader: compileShader
        };
}

function setFakeGl(fakeGlObj, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = AllDeviceManagerService$Wonderjs.setGl(fakeGlObj, state[/* deviceManagerRecord */9]);
  return newrecord;
}

exports.buildFakeGl = buildFakeGl;
exports.setFakeGl = setFakeGl;
/* Sinon Not a pure module */
