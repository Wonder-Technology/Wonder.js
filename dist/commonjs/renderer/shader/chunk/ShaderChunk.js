"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
exports.NULL = -1.0;
exports.basic_materialColor_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "vec4 totalColor = vec4(u_color, 1.0);\n" };
exports.end_basic_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_FragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);\n" };
exports.common_define = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
exports.common_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
exports.common_function = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "mat2 transpose(mat2 m) {\n  return mat2(  m[0][0], m[1][0],   // new col 0\n                m[0][1], m[1][1]    // new col 1\n             );\n  }\nmat3 transpose(mat3 m) {\n  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n                m[0][1], m[1][1], m[2][1],  // new col 1\n                m[0][2], m[1][2], m[2][2]   // new col 1\n             );\n  }\n\n//bool isRenderListEmpty(int isRenderListEmpty){\n//  return isRenderListEmpty == 1;\n//}\n", body: "" };
exports.common_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
exports.highp_fragment = { top: "precision highp float;\nprecision highp int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
exports.lowp_fragment = { top: "precision lowp float;\nprecision lowp int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
exports.mediump_fragment = { top: "precision mediump float;\nprecision mediump int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
//# sourceMappingURL=ShaderChunk.js.map