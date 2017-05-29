export var empty = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
export var NULL = -1.0;
export var basic_materialColor_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "vec4 totalColor = vec4(u_color, 1.0);\n" };
export var end_basic_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_FragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);\n" };
export var common_define = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
export var common_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
export var common_function = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "mat2 transpose(mat2 m) {\n  return mat2(  m[0][0], m[1][0],   // new col 0\n                m[0][1], m[1][1]    // new col 1\n             );\n  }\nmat3 transpose(mat3 m) {\n  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n                m[0][1], m[1][1], m[2][1],  // new col 1\n                m[0][2], m[1][2], m[2][2]   // new col 1\n             );\n  }\n\n//bool isRenderListEmpty(int isRenderListEmpty){\n//  return isRenderListEmpty == 1;\n//}\n", body: "" };
export var common_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
export var highp_fragment = { top: "precision highp float;\nprecision highp int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
export var lowp_fragment = { top: "precision lowp float;\nprecision lowp int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
export var mediump_fragment = { top: "precision mediump float;\nprecision mediump int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
//# sourceMappingURL=ShaderChunk.js.map